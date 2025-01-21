const LogService = require('./logService');

class TokenManager {
    static instance = null;
    token = null;
    expiresAt = null;

    static getInstance() {
        if (!TokenManager.instance) {
            TokenManager.instance = new TokenManager();
            LogService.logEvent('INIT', 'TokenManager initialized');
        }
        return TokenManager.instance;
    }

    setToken(token) {
        this.token = token;
        // Set expiration to 1 minute from now
        this.expiresAt = new Date(Date.now() + 60 * 1000);
        LogService.logEvent('TOKEN_SET', 'New token stored', {
            expiresAt: this.expiresAt,
            validFor: '1 minute'
        });
    }

    getToken() {
        if (this.isTokenValid()) {
            const timeLeft = this.expiresAt.getTime() - Date.now();
            const minutesLeft = Math.floor(timeLeft / 1000 / 60);
            LogService.logEvent('TOKEN_GET', 'Retrieved valid token', {
                expiresIn: `${minutesLeft} minutes`
            });
            return this.token;
        }
        LogService.logEvent('TOKEN_GET', 'No valid token found', {
            currentToken: this.token ? 'exists but expired' : 'null',
            expiresAt: this.expiresAt
        });
        return null;
    }

    isTokenValid() {
        const isValid = this.token && this.expiresAt && new Date() < this.expiresAt;
        if (!isValid && this.token) {
            LogService.logEvent('TOKEN_EXPIRED', 'Token expired', {
                expiredAt: this.expiresAt
            });
        }
        return isValid;
    }

    clearToken() {
        this.token = null;
        this.expiresAt = null;
        LogService.logEvent('TOKEN_CLEAR', 'Token cleared');
    }
}

module.exports = TokenManager; 