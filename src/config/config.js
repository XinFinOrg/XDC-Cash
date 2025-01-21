require('dotenv').config();

// Log loaded environment variables (without sensitive values)
console.log('Environment variables loaded:', {
    PARTNER_EMAIL: process.env.PARTNER_EMAIL ? '✓' : '✗',
    PARTNER_PASSWORD: process.env.PARTNER_PASSWORD ? '✓' : '✗',
    CLIENT_ID: process.env.CLIENT_ID ? '✓' : '✗',
    CLIENT_SECRET: process.env.CLIENT_SECRET ? '✓' : '✗'
});

module.exports = {
    PARTNER_EMAIL: process.env.PARTNER_EMAIL,
    PARTNER_PASSWORD: process.env.PARTNER_PASSWORD,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
}; 