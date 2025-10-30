// Cache utility for localStorage and memory caching
class CacheManager {
  constructor() {
    this.memoryCache = new Map();
    this.cachePrefix = 'discord-decoration-';
    this.defaultTTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  }

  // Generate cache key with prefix
  getCacheKey(key) {
    return `${this.cachePrefix}${key}`;
  }

  // Set item in localStorage with TTL
  setLocalStorage(key, data, ttl = this.defaultTTL) {
    try {
      const cacheKey = this.getCacheKey(key);
      const cacheData = {
        data,
        timestamp: Date.now(),
        ttl
      };
      
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      console.log(`Cache: Stored ${key} in localStorage`);
      return true;
    } catch (error) {
      console.error('Cache: Failed to store in localStorage:', error);
      return false;
    }
  }

  // Get item from localStorage with TTL check
  getLocalStorage(key) {
    try {
      const cacheKey = this.getCacheKey(key);
      const cached = localStorage.getItem(cacheKey);
      
      if (!cached) {
        return null;
      }

      const cacheData = JSON.parse(cached);
      const now = Date.now();
      
      // Check if cache has expired
      if (now - cacheData.timestamp > cacheData.ttl) {
        console.log(`Cache: ${key} expired, removing from localStorage`);
        localStorage.removeItem(cacheKey);
        return null;
      }

      console.log(`Cache: Retrieved ${key} from localStorage`);
      return cacheData.data;
    } catch (error) {
      console.error('Cache: Failed to retrieve from localStorage:', error);
      return null;
    }
  }

  // Set item in memory cache
  setMemoryCache(key, data, ttl = this.defaultTTL) {
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl
    };
    
    this.memoryCache.set(key, cacheData);
    console.log(`Cache: Stored ${key} in memory`);
    
    // Set timeout to auto-remove expired items
    setTimeout(() => {
      if (this.memoryCache.has(key)) {
        const cached = this.memoryCache.get(key);
        if (Date.now() - cached.timestamp > cached.ttl) {
          this.memoryCache.delete(key);
          console.log(`Cache: Auto-removed expired ${key} from memory`);
        }
      }
    }, ttl);
  }

  // Get item from memory cache with TTL check
  getMemoryCache(key) {
    if (!this.memoryCache.has(key)) {
      return null;
    }

    const cacheData = this.memoryCache.get(key);
    const now = Date.now();
    
    // Check if cache has expired
    if (now - cacheData.timestamp > cacheData.ttl) {
      console.log(`Cache: ${key} expired, removing from memory`);
      this.memoryCache.delete(key);
      return null;
    }

    console.log(`Cache: Retrieved ${key} from memory`);
    return cacheData.data;
  }

  // Get item from cache (memory first, then localStorage)
  get(key) {
    // Try memory cache first (fastest)
    let data = this.getMemoryCache(key);
    if (data !== null) {
      return data;
    }

    // Try localStorage
    data = this.getLocalStorage(key);
    if (data !== null) {
      // Store in memory cache for faster access
      this.setMemoryCache(key, data);
      return data;
    }

    return null;
  }

  // Set item in both memory and localStorage
  set(key, data, ttl = this.defaultTTL) {
    this.setMemoryCache(key, data, ttl);
    this.setLocalStorage(key, data, ttl);
  }

  // Remove item from all caches
  remove(key) {
    this.memoryCache.delete(key);
    
    try {
      const cacheKey = this.getCacheKey(key);
      localStorage.removeItem(cacheKey);
      console.log(`Cache: Removed ${key} from all caches`);
    } catch (error) {
      console.error('Cache: Failed to remove from localStorage:', error);
    }
  }

  // Clear all cache data
  clear() {
    this.memoryCache.clear();
    
    try {
      // Remove all items with our prefix
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.cachePrefix)) {
          localStorage.removeItem(key);
        }
      });
      console.log('Cache: Cleared all cache data');
    } catch (error) {
      console.error('Cache: Failed to clear localStorage:', error);
    }
  }

  // Get cache statistics
  getStats() {
    const memorySize = this.memoryCache.size;
    let localStorageSize = 0;
    
    try {
      const keys = Object.keys(localStorage);
      localStorageSize = keys.filter(key => key.startsWith(this.cachePrefix)).length;
    } catch (error) {
      console.error('Cache: Failed to get localStorage stats:', error);
    }

    return {
      memoryCache: memorySize,
      localStorage: localStorageSize,
      totalItems: memorySize + localStorageSize
    };
  }

  // Clean up expired items
  cleanup() {
    console.log('Cache: Starting cleanup...');
    
    // Clean memory cache
    const now = Date.now();
    for (const [key, cacheData] of this.memoryCache.entries()) {
      if (now - cacheData.timestamp > cacheData.ttl) {
        this.memoryCache.delete(key);
        console.log(`Cache: Cleaned up expired ${key} from memory`);
      }
    }

    // Clean localStorage
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.cachePrefix)) {
          try {
            const cached = localStorage.getItem(key);
            if (cached) {
              const cacheData = JSON.parse(cached);
              if (now - cacheData.timestamp > cacheData.ttl) {
                localStorage.removeItem(key);
                console.log(`Cache: Cleaned up expired ${key} from localStorage`);
              }
            }
          } catch (error) {
            // Remove corrupted cache entries
            localStorage.removeItem(key);
            console.log(`Cache: Removed corrupted cache entry ${key}`);
          }
        }
      });
    } catch (error) {
      console.error('Cache: Failed to cleanup localStorage:', error);
    }

    console.log('Cache: Cleanup completed');
  }
}

// Create singleton instance
const cacheManager = new CacheManager();

// Auto-cleanup every hour
setInterval(() => {
  cacheManager.cleanup();
}, 60 * 60 * 1000);

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    cacheManager.cleanup();
  });
}

export default cacheManager;