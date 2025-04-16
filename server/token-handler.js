const fs = require('fs');
const path = require('path');

const TOKEN_FILE = path.join(__dirname, '../data/token-cache.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(TOKEN_FILE))) {
    console.log('Creating data directory:', path.dirname(TOKEN_FILE));
    fs.mkdirSync(path.dirname(TOKEN_FILE), { recursive: true });
}

// Read token from file
function readToken() {
    console.log('readToken called');
    try {
        if (fs.existsSync(TOKEN_FILE)) {
            console.log('Token file exists, reading...');
            const data = fs.readFileSync(TOKEN_FILE, 'utf8');
            console.log('Token data read:', data);
            return JSON.parse(data);
        }
        console.log('Token file does not exist');
        return null;
    } catch (error) {
        console.error('Error reading token file:', error);
        return null;
    }
}

// Write token to file
function writeToken(tokenData) {
    console.log('writeToken called with data:', tokenData);
    try {
        // Validate token data
        if (!tokenData || !tokenData.token || !tokenData.expirationTime) {
            console.log('Invalid token data:', tokenData);
            throw new Error('Invalid token data');
        }

        // Ensure expiration time is a number
        tokenData.expirationTime = Number(tokenData.expirationTime);
        if (isNaN(tokenData.expirationTime)) {
            console.log('Invalid expiration time:', tokenData.expirationTime);
            throw new Error('Invalid expiration time');
        }

        console.log('Writing token to file:', tokenData);
        console.log('File path:', TOKEN_FILE);
        
        fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokenData, null, 2));
        console.log('Token written successfully');
        return true;
    } catch (error) {
        console.error('Error writing token file:', error);
        return false;
    }
}

// Clear token file
function clearToken() {
    console.log('clearToken called');
    try {
        if (fs.existsSync(TOKEN_FILE)) {
            console.log('Deleting token file');
            fs.unlinkSync(TOKEN_FILE);
        }
        console.log('Token cleared successfully');
        return true;
    } catch (error) {
        console.error('Error clearing token file:', error);
        return false;
    }
}

// API endpoints
module.exports = function(app) {
    console.log('Setting up token handler routes');
    
    // Serve token file
    app.get('/token-cache.json', (req, res) => {
        console.log('GET /token-cache.json called');
        const tokenData = readToken();
        if (tokenData) {
            console.log('Sending token data:', tokenData);
            res.json(tokenData);
        } else {
            console.log('No token data found');
            res.status(404).json({ error: 'No token found' });
        }
    });

    // Save token
    app.post('/api/save-token', (req, res) => {
        console.log('POST /api/save-token called with body:', req.body);
        if (!req.body || !req.body.token || !req.body.expirationTime) {
            console.log('Invalid request body:', req.body);
            return res.status(400).json({ error: 'Invalid token data' });
        }

        if (writeToken(req.body)) {
            console.log('Token saved successfully');
            res.json({ success: true });
        } else {
            console.log('Failed to save token');
            res.status(500).json({ error: 'Failed to save token' });
        }
    });

    // Clear token
    app.post('/api/clear-token', (req, res) => {
        console.log('POST /api/clear-token called');
        if (clearToken()) {
            console.log('Token cleared successfully');
            res.json({ success: true });
        } else {
            console.log('Failed to clear token');
            res.status(500).json({ error: 'Failed to clear token' });
        }
    });
}; 