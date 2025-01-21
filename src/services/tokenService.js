const EncryptusService = require('./encryptusService');
const TokenManager = require('./tokenManager');
const LogService = require('./logService');

class TokenService {
    static async getValidToken() {
        const tokenManager = TokenManager.getInstance();
        const existingToken = tokenManager.getToken();

        if (existingToken) {
            const timeLeft = tokenManager.expiresAt.getTime() - Date.now();
            const secondsLeft = Math.floor(timeLeft / 1000);
            LogService.logEvent('TOKEN_REUSE', 'Using existing valid token', {
                expiresIn: `${secondsLeft} seconds`
            });
            return existingToken;
        }

        LogService.logEvent('TOKEN_GENERATE', 'Generating new token', {
            reason: existingToken ? 'Token expired' : 'No token exists'
        });
        // If no token or expired, get new token
        const response = await EncryptusService.generateAccessToken();
        tokenManager.setToken(response.access_token);

        LogService.logEvent('TOKEN_GENERATED', 'New token generated and stored');
        return response.access_token;
    }
}

module.exports = TokenService;