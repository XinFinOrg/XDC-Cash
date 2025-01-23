const express = require('express');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const winston = require('winston');

dotenv.config();

// Configure logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());

// Add CORS headers
app.use((req, res, next) => {
    // Allow requests from Encryptus domains
    res.header('Access-Control-Allow-Origin', 'https://preprod.encryptus.co');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Encryptus API configuration
const ENCRYPTUS_API_URL = process.env.ENCRYPTUS_API_URL;
const PARTNER_EMAIL = process.env.PARTNER_EMAIL;
const PARTNER_PASSWORD = process.env.PARTNER_PASSWORD;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Get access token
app.get('/api/access-token', async (req, res) => {
    try {
        console.log("I am here");
        logger.info('Requesting Encryptus access token');
        console.log(ENCRYPTUS_API_URL,PARTNER_EMAIL,PARTNER_PASSWORD,CLIENT_ID,CLIENT_SECRET);
        const response = await axios.post(`${ENCRYPTUS_API_URL}/generate/token`, {
            partnerEmail: PARTNER_EMAIL,
            partnerPassword: PARTNER_PASSWORD,
            grant_services: [
                "FORENSICS"
            ],
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET
        });

        console.log("11111",response.data.access_token);
        if (!response.data.access_token) {
            throw new Error('Invalid access token response');
        }

        logger.info('Successfully obtained access token');
        res.json({ access_token: response.data.access_token });
    } catch (error) {
        logger.error('Error getting access token:', error);
        res.status(500).json({ error: 'Failed to get access token' });
    }
});

// Get payout link
app.get('/api/payout-link', async (req, res) => {
    try {
        logger.info('Requesting Encryptus payout link');
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            throw new Error('No access token provided');
        }

        const accessToken = authHeader.split(' ')[1];
        console.log("33333",accessToken);

        const response = await axios.get(`${ENCRYPTUS_API_URL}/generate/payoutlink`,
            {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        console.log("22222",response.data);
        if (!response.data?.data?.link) {
            throw new Error('Invalid payout link response');
        }

        logger.info('Successfully obtained payout link');
        res.json({ data: { link: response.data.data.link } });
    } catch (error) {
        logger.error('Error getting payout link:', error);
        const errorMessage = error.response?.data?.message || 'Failed to get payout link';
        const statusCode = error.response?.status || 500;
        res.status(statusCode).json({ 
            error: errorMessage,
            details: error.response?.data
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
}); 