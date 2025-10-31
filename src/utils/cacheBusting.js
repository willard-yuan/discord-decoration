// Cache busting utility for version-based cache invalidation
import cacheManager from './cache.js';

class CacheBustingManager {
  constructor() {
    this.currentVersion = '1.1.3'; // Update this when deploying new versions
    this.versionKey = 'app-version';
    this.lastCheckKey = 'last-version-check';
    this.checkInterval = 60 * 60 * 1000; // Check every hour
  }

  // Initialize cache busting on app start
  init() {
    console.log('CacheBusting: Initializing...');
    
    const storedVersion = this.getStoredVersion();
    const lastCheck = this.getLastCheck();
    const now = Date.now();

    // Check if version has changed
    if (storedVersion !== this.currentVersion) {
      console.log(`CacheBusting: Version changed from ${storedVersion} to ${this.currentVersion}`);
      this.invalidateCache();
      this.setStoredVersion(this.currentVersion);
    }

    // Check if we need to perform periodic check
    if (!lastCheck || (now - lastCheck) > this.checkInterval) {
      this.performVersionCheck();
      this.setLastCheck(now);
    }

    console.log('CacheBusting: Initialized successfully');
  }

  // Get stored version from localStorage
  getStoredVersion() {
    try {
      return localStorage.getItem(this.versionKey) || '0.0.0';
    } catch (error) {
      console.error('CacheBusting: Failed to get stored version:', error);
      return '0.0.0';
    }
  }

  // Set stored version in localStorage
  setStoredVersion(version) {
    try {
      localStorage.setItem(this.versionKey, version);
      console.log(`CacheBusting: Set version to ${version}`);
    } catch (error) {
      console.error('CacheBusting: Failed to set version:', error);
    }
  }

  // Get last check timestamp
  getLastCheck() {
    try {
      const timestamp = localStorage.getItem(this.lastCheckKey);
      return timestamp ? parseInt(timestamp, 10) : null;
    } catch (error) {
      console.error('CacheBusting: Failed to get last check:', error);
      return null;
    }
  }

  // Set last check timestamp
  setLastCheck(timestamp) {
    try {
      localStorage.setItem(this.lastCheckKey, timestamp.toString());
    } catch (error) {
      console.error('CacheBusting: Failed to set last check:', error);
    }
  }

  // Invalidate all caches
  invalidateCache() {
    console.log('CacheBusting: Invalidating all caches...');
    
    // Clear localStorage cache
    cacheManager.clear();
    
    // Clear service worker caches
    if ('serviceWorker' in navigator && 'caches' in window) {
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log(`CacheBusting: Deleting cache ${cacheName}`);
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        console.log('CacheBusting: All service worker caches cleared');
      }).catch(error => {
        console.error('CacheBusting: Failed to clear service worker caches:', error);
      });
    }

    // Clear browser cache for critical resources
    this.clearBrowserCache();
    
    console.log('CacheBusting: Cache invalidation completed');
  }

  // Clear browser cache for critical resources
  clearBrowserCache() {
    // In development mode, we don't need to force reload resources
    // as Vite handles hot module replacement automatically
    if (import.meta.env.DEV) {
      console.log('CacheBusting: Skipping browser cache clear in development mode');
      return;
    }

    // Force reload of critical CSS files only in production
    const criticalResources = [
      '/assets/index.css', // Production CSS bundle
    ];

    criticalResources.forEach(resource => {
      const link = document.querySelector(`link[href*="${resource}"]`);
      if (link && link instanceof HTMLLinkElement) {
        const newLink = link.cloneNode();
        if (newLink instanceof HTMLLinkElement) {
          const versionParam = this.currentVersion.replace(/\./g, '_'); // Replace dots with underscores
          newLink.href = `${resource}?v=${versionParam}&t=${Date.now()}`;
          link.parentNode?.replaceChild(newLink, link);
          console.log(`CacheBusting: Reloaded ${resource}`);
        }
      }
    });
  }

  // Perform version check (can be extended to check server version)
  async performVersionCheck() {
    console.log('CacheBusting: Performing version check...');
    
    try {
      // In a real implementation, you might check a version endpoint
      // For now, we'll just check if the stored version matches current
      const storedVersion = this.getStoredVersion();
      
      if (storedVersion !== this.currentVersion) {
        console.log('CacheBusting: Version mismatch detected during check');
        this.invalidateCache();
        this.setStoredVersion(this.currentVersion);
        
        // Optionally notify user of update
        this.notifyUpdate();
      }
    } catch (error) {
      console.error('CacheBusting: Version check failed:', error);
    }
  }

  // Notify user of update (optional)
  notifyUpdate() {
    // You can customize this notification
    console.log('CacheBusting: New version available');
    
    // Optional: Show a subtle notification
    if (window.confirm('A new version is available. Reload to get the latest features?')) {
      window.location.reload();
    }
  }

  // Force cache invalidation (for manual use)
  forceCacheInvalidation() {
    console.log('CacheBusting: Force invalidating cache...');
    this.invalidateCache();
    this.setStoredVersion(this.currentVersion);
    this.setLastCheck(Date.now());
  }

  // Get cache busting URL for resources
  getCacheBustedUrl(url) {
    const separator = url.includes('?') ? '&' : '?';
    const versionParam = this.currentVersion.replace(/\./g, '_'); // Replace dots with underscores
    return `${url}${separator}v=${versionParam}&t=${Date.now()}`;
  }

  // Preload critical resources with cache busting
  async preloadCriticalResources() {
    const criticalResources = [
      '/avatars/blue.png',
      '/avatars/red.png',
      '/avatars/green.png',
      '/decorations/treat_pumpkin.png',
      '/decorations/hearts.png',
      '/decorations/snowflake.png'
    ];

    console.log('CacheBusting: Preloading critical resources...');
    
    const preloadPromises = criticalResources.map(resource => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          console.log(`CacheBusting: Preloaded ${resource}`);
          resolve();
        };
        img.onerror = () => {
          console.warn(`CacheBusting: Failed to preload ${resource}`);
          resolve(); // Don't reject to avoid breaking the chain
        };
        img.src = this.getCacheBustedUrl(resource);
      });
    });

    try {
      await Promise.all(preloadPromises);
      console.log('CacheBusting: Critical resources preloaded');
    } catch (error) {
      console.error('CacheBusting: Failed to preload some resources:', error);
    }
  }

  // Get current version
  getCurrentVersion() {
    return this.currentVersion;
  }

  // Set new version (for updates)
  setCurrentVersion(version) {
    const oldVersion = this.currentVersion;
    this.currentVersion = version;
    
    if (oldVersion !== version) {
      console.log(`CacheBusting: Version updated from ${oldVersion} to ${version}`);
      this.invalidateCache();
      this.setStoredVersion(version);
    }
  }
}

// Create singleton instance
const cacheBustingManager = new CacheBustingManager();

// Auto-initialize when module loads
if (typeof window !== 'undefined') {
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      cacheBustingManager.init();
    });
  } else {
    cacheBustingManager.init();
  }
}

export default cacheBustingManager;