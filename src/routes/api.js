const express = require('express');
const router = express.Router();
const TokenService = require('../services/tokenService');
const EncryptusService = require('../services/encryptusService');

router.get('/access-token', async (req, res) => {
    try {
        const token = await TokenService.getValidToken();
        res.json({ access_token: token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate access token' });
    }
});

router.get('/payout-link', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('No token provided');
        }
        
        const token = authHeader.split(' ')[1];
        console.log("Using token for payout link:", token);
        const payoutLink = await EncryptusService.generatePayoutLink(token);
        console.log("Payout link response:", payoutLink);
        res.json(payoutLink);
    } catch (error) {
        console.error('Error generating payout link:', error);
        const errorResponse = {
            error: 'Failed to generate payout link',
            details: error.response?.data || error.message
        };
        res.status(error.response?.status || 500).json(errorResponse);
    }
});

module.exports = router; 