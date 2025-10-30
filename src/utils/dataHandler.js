import cacheManager from './cache.js';

const tempStorage = {};

// Enhanced data storage with caching
export const storeData = (key, data, persistent = false, ttl = 24 * 60 * 60 * 1000) => {
  // Always store in memory for immediate access
  tempStorage[key] = data;
  
  // Optionally store in persistent cache
  if (persistent) {
    cacheManager.set(`data-${key}`, data, ttl);
    console.log(`DataHandler: Stored ${key} persistently`);
  }
};

// Enhanced data retrieval with cache fallback
export const getData = (key, checkPersistent = false) => {
  // Try memory first
  if (tempStorage[key] !== undefined) {
    return tempStorage[key];
  }
  
  // Try persistent cache if requested
  if (checkPersistent) {
    const cached = cacheManager.get(`data-${key}`);
    if (cached !== null) {
      // Restore to memory for faster access
      tempStorage[key] = cached;
      console.log(`DataHandler: Restored ${key} from persistent cache`);
      return cached;
    }
  }
  
  return undefined;
};

// Enhanced data clearing
export const clearData = (key, clearPersistent = false) => {
  delete tempStorage[key];
  
  if (clearPersistent) {
    cacheManager.remove(`data-${key}`);
    console.log(`DataHandler: Cleared ${key} from persistent cache`);
  }
};

// New function to store frequently accessed data with caching
export const storeFrequentData = (key, data) => {
  storeData(key, data, true, 7 * 24 * 60 * 60 * 1000); // 7 days TTL
};

// New function to get frequently accessed data with cache fallback
export const getFrequentData = (key) => {
  return getData(key, true);
};

// Clear all cached data
export const clearAllCache = () => {
  Object.keys(tempStorage).forEach(key => delete tempStorage[key]);
  cacheManager.clear();
  console.log('DataHandler: Cleared all cache data');
};
