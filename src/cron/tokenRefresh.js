const cron = require('node-cron');
const TokenService = require('../services/tokenService');
const LogService = require('../services/logService');

// Schedule token refresh every minute
cron.schedule('* * * * *', async () => {
    try {
        LogService.logEvent('CRON_START', 'Starting scheduled token refresh');
        await TokenService.getValidToken();
        LogService.logEvent('CRON_SUCCESS', 'Token refreshed successfully');
    } catch (error) {
        LogService.logEvent('CRON_ERROR', 'Failed to refresh token', {
            error: error.message,
            stack: error.stack
        });
    }
}); 