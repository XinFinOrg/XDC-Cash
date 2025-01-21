const fs = require('fs').promises;
const path = require('path');

class LogService {
    static logPath = path.join(__dirname, '../../logs/token.log');

    static async logEvent(type, message, data = {}) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            type,
            message,
            data
        };

        const logMessage = `${JSON.stringify(logEntry)}\n`;

        try {
            // Ensure log directory exists
            await fs.mkdir(path.dirname(this.logPath), { recursive: true });
            await fs.appendFile(this.logPath, logMessage);
        } catch (error) {
            console.error('Error writing to log file:', error);
        }
    }
}

module.exports = LogService; 