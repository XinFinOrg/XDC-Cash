// Token storage using API endpoints
const tokenStorage = {
    // Read token from server
    readToken: async function() {
        try {
            const response = await fetch('/token-cache.json');
            if (!response.ok) {
                return null;
            }
            const data = await response.json();
            if (data) {
                // Format expiration time for display
                data.expiresAt = new Date(data.expirationTime).toLocaleString();
                data.remainingTime = Math.max(0, Math.floor((data.expirationTime - Date.now()) / 1000));
            }
            return data;
        } catch (error) {
            console.error('Error reading token:', error);
            return null;
        }
    },
    
    // Write token to server
    writeToken: async function(tokenData) {
        try {
            // Set expiration to 1 hour from now
            tokenData.expirationTime = Date.now() + (60 * 60 * 1000);
            tokenData.expiresAt = new Date(tokenData.expirationTime).toLocaleString();
            
            const response = await fetch('/api/save-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tokenData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to save token');
            }
            
            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error('Error writing token:', error);
            return false;
        }
    },
    
    // Clear token on server
    clearToken: async function() {
        try {
            const response = await fetch('/api/clear-token', {
                method: 'POST'
            });
            
            if (!response.ok) {
                throw new Error('Failed to clear token');
            }
            
            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error('Error clearing token:', error);
            return false;
        }
    }
}; 