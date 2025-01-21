// import express from 'express';
// import { getAccessToken, getPayoutLink } from './services/encryptusService';
// import path from 'path';
// import dotenv from 'dotenv';
// import logger from './utils/logger';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3001;

// app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.json());

// // Update API endpoint to use api.sandbox.encryptus.co
// const ENCRYPTUS_API_URL = process.env.ENCRYPTUS_API_URL || 'https://api.sandbox.encryptus.co/v1';

// app.get('/api/access-token', async (req, res) => {
//     try {
//         logger.info('Processing /api/access-token request');
//         const accessToken = await getAccessToken();
//         res.json({ access_token: accessToken });
//         logger.info('Successfully processed /api/access-token request');
//     } catch (error: any) {
//         logger.error('Error processing /api/access-token request:', {
//             error: error.message,
//             status: error.response?.status,
//             data: error.response?.data
//         });
//         res.status(error.response?.status || 500).json({ 
//             error: 'Failed to get access token',
//             details: error.response?.data || error.message
//         });
//     }
// });

// app.get('/api/payout-link', async (req, res) => {
//     try {
//         logger.info('Processing /api/payout-link request');
//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             throw new Error('No access token provided');
//         }

//         const accessToken = authHeader.split(' ')[1];
//         const payoutLink = await getPayoutLink(accessToken);
        
//         res.json({ 
//             data: {
//                 link: payoutLink
//             }
//         });
//         logger.info('Successfully processed /api/payout-link request');
//     } catch (error: any) {
//         logger.error('Error processing /api/payout-link request:', {
//             error: error.message,
//             status: error.response?.status,
//             data: error.response?.data
//         });
//         res.status(error.response?.status || 500).json({ 
//             error: 'Failed to get payout link',
//             details: error.response?.data || error.message
//         });
//     }
// });

// app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
//     logger.error('Unhandled error:', err);
//     res.status(500).json({ error: 'Internal server error' });
// });

// app.listen(port, () => {
//     logger.info(`Server running on port ${port}`);
// }); 