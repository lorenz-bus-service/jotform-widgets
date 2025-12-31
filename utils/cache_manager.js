import NodeCache from 'node-cache';
import cron from 'node-cron';

const myCache = new NodeCache();

/**
 * @param {string} key - The cache key (e.g., 'trainees')
 * @param {function} fetchFn - The service function to call to get fresh data
 */
export const registerCachedResource = (key, fetchFn) => {
    
    // 1. Define the refresher
    const refresh = async () => {
        try {
            const data = await fetchFn();
            myCache.set(key, data);
            console.log(`[Cache] ${key} updated at ${new Date().toLocaleTimeString()}`);
        } catch (err) {
            console.error(`[Cache] ${key} refresh failed:`, err.message);
        }
    };

    // 2. Schedule the Cron (Mon-Fri, 6-18, every 5 mins)
    cron.schedule('*/5 6-18 * * 1-5', refresh);

    // 3. Return the "Getter" and the "Manual Refresh"
    return {
        get: async () => {
            const data = myCache.get(key);
            if (data) return data;
            
            // If empty, fetch immediately
            await refresh();
            return myCache.get(key);
        },
        refresh
    };
    
};
