// const axios = require('axios');
// const config = require('../config/config');

// class EncryptusService {
//     static async generateAccessToken() {
//         try {
//             console.log("Generating access token...");
            
//             // Validate config
//             if (!config.PARTNER_EMAIL || !config.PARTNER_PASSWORD || !config.CLIENT_ID || !config.CLIENT_SECRET) {
//                 throw new Error('Missing required configuration');
//             }

//             const payload = {
//                 partnerEmail: config.PARTNER_EMAIL,
//                 partnerPassword: config.PARTNER_PASSWORD,
//                 grant_services: ["FORENSICS"],
//                 clientID: config.CLIENT_ID,
//                 clientSecret: config.CLIENT_SECRET
//             };

//             const response = await axios.post(
//                 'https://sandbox.encryptus.co/v1/partners/generate/token',
//                 payload,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json'
//                     },
//                     timeout: 10000, // 10 second timeout
//                     validateStatus: function (status) {
//                         return status >= 200 && status < 500; // Don't reject if status is >= 400
//                     }
//                 }
//             );

//             if (!response.data || !response.data.access_token) {
//                 console.error('Invalid API Response:', response.data);
//                 throw new Error('Invalid API response format');
//             }

//             console.log("Access token generated successfully");
//             return response.data;
//         } catch (error) {
//             console.error('Error generating access token:', {
//                 message: error.message,
//                 status: error.response?.status,
//                 data: error.response?.data,
//                 code: error.code
//             });

//             // Check for specific error types
//             if (error.code === 'ECONNREFUSED') {
//                 throw new Error('Could not connect to the API server');
//             }
//             if (error.code === 'ETIMEDOUT') {
//                 throw new Error('Request timed out');
//             }
//             throw error;
//         }
//     }

//     static async generatePayoutLink(token) {
//         try {
//             console.log("Generating payout link with token:", token);
//             const response = await axios.get(
//                 'https://sandbox.encryptus.co/v1/partners/generate/payoutlink',
//                 {
//                     headers: {
//                         'accept': '*/*',
//                         'Authorization': `Bearer ${token}`
//                     }
//                 }
//             );
//             console.log("Payout link API response:", response.data);
//             return response.data;
//         } catch (error) {
//             console.error('Error generating payout link:', error);
//             console.error('Error details:', error.response?.data);
//             throw error;
//         }
//     }
// }

// module.exports = EncryptusService; 