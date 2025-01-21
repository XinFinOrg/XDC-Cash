// import axios from 'axios';
// import dotenv from 'dotenv';
// import logger from '../utils/logger';

// dotenv.config();

// const ENCRYPTUS_API_URL = process.env.ENCRYPTUS_API_URL || 'https://api.sandbox.encryptus.co/v1';
// const PARTNER_EMAIL = process.env.PARTNER_EMAIL;
// const PARTNER_PASSWORD = process.env.PARTNER_PASSWORD;
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;

// export async function getAccessToken(): Promise<string> {
//     try {
//         logger.info('Requesting Encryptus access token');
//         const response = await axios.post(`${ENCRYPTUS_API_URL}/auth/login`, {
//             email: PARTNER_EMAIL,
//             password: PARTNER_PASSWORD,
//             client_id: CLIENT_ID,
//             client_secret: CLIENT_SECRET
//         });

//         if (!response.data?.data?.access_token) {
//             throw new Error('Invalid access token response');
//         }

//         logger.info('Successfully obtained access token');
//         return response.data.data.access_token;
//     } catch (error: any) {
//         logger.error('Error getting access token:', {
//             error: error.message,
//             status: error.response?.status,
//             data: error.response?.data
//         });
//         throw error;
//     }
// }

// export async function getPayoutLink(accessToken: string): Promise<string> {
//     try {
//         logger.info('Requesting Encryptus payout link');
//         const response = await axios.post(
//             `${ENCRYPTUS_API_URL}/payout/link`,
//             {},
//             {
//                 headers: {
//                     'Authorization': `Bearer ${accessToken}`
//                 }
//             }
//         );

//         if (!response.data?.data?.link) {
//             throw new Error('Invalid payout link response');
//         }

//         logger.info('Successfully obtained payout link');
//         return response.data.data.link;
//     } catch (error: any) {
//         logger.error('Error getting payout link:', {
//             error: error.message,
//             status: error.response?.status,
//             data: error.response?.data
//         });
//         throw error;
//     }
// } 