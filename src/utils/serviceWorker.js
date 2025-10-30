// Service Worker registration and management
import cacheManager from './cache.js';

class ServiceWorkerManager {
  constructor() {
    this.isSupported = 'serviceWorker' in navigator;
    this.registration = null;
    this.isRegistered = false;
  }

  // Register service worker
  async register() {
    if (!this.isSupported) {
      console.log('Service Worker: Not supported in this browser');
      return false;
    }

    try {
      console.log('Service Worker: Registering...');
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker: Registered successfully', this.registration);
      this.isRegistered = true;

      // Listen for updates
      this.registration.addEventListener('updatefound', () => {
        console.log('Service Worker: Update found');
        this.handleUpdate();
      });

      // Check for existing service worker
      if (this.registration.active) {
        console.log('Service Worker: Already active');
      }

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        this.handleMessage(event);
      });

      return true;
    } catch (error) {
      console.error('Service Worker: Registration failed', error);
      return false;
    }
  }

  // Handle service worker updates
  handleUpdate() {
    const newWorker = this.registration.installing;
    
    if (newWorker) {
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('Service Worker: New version available');
          this.showUpdateNotification();
        }
      });
    }
  }

  // Show update notification to user
  showUpdateNotification() {
    // You can customize this notification
    if (confirm('A new version is available. Reload to update?')) {
      window.location.reload();
    }
  }

  // Handle messages from service worker
  handleMessage(event) {
    const { data } = event;
    
    if (data && data.type) {
      switch (data.type) {
        case 'CACHE_UPDATED':
          console.log('Service Worker: Cache updated for', data.url);
          break;
        case 'OFFLINE':
          console.log('Service Worker: App is offline');
          this.handleOffline();
          break;
        case 'ONLINE':
          console.log('Service Worker: App is online');
          this.handleOnline();
          break;
        default:
          console.log('Service Worker: Unknown message', data);
      }
    }
  }

  // Handle offline state
  handleOffline() {
    // Add offline indicator or functionality
    document.body.classList.add('offline');
  }

  // Handle online state
  handleOnline() {
    // Remove offline indicator
    document.body.classList.remove('offline');
    
    // Trigger cache cleanup
    this.sendMessage({ type: 'CLEAN_CACHE' });
  }

  // Send message to service worker
  sendMessage(message) {
    if (this.registration && this.registration.active) {
      this.registration.active.postMessage(message);
    }
  }

  // Unregister service worker
  async unregister() {
    if (this.registration) {
      try {
        await this.registration.unregister();
        console.log('Service Worker: Unregistered successfully');
        this.isRegistered = false;
        return true;
      } catch (error) {
        console.error('Service Worker: Unregistration failed', error);
        return false;
      }
    }
    return false;
  }

  // Get registration status
  getStatus() {
    return {
      supported: this.isSupported,
      registered: this.isRegistered,
      active: this.registration && this.registration.active,
      scope: this.registration ? this.registration.scope : null
    };
  }
}

// Cache-aware fetch wrapper
export class CachedFetch {
  constructor(cacheKey, ttl = 24 * 60 * 60 * 1000) {
    this.cacheKey = cacheKey;
    this.ttl = ttl;
  }

  // Fetch with cache fallback
  async fetch(url, options = {}) {
    // Try cache first for GET requests
    if (!options.method || options.method === 'GET') {
      const cached = cacheManager.get(this.cacheKey);
      if (cached) {
        console.log(`CachedFetch: Serving ${url} from cache`);
        return cached;
      }
    }

    try {
      console.log(`CachedFetch: Fetching ${url} from network`);
      const response = await fetch(url, options);
      
      if (response.ok) {
        const data = await response.json();
        
        // Cache successful GET responses
        if (!options.method || options.method === 'GET') {
          cacheManager.set(this.cacheKey, data, this.ttl);
        }
        
        return data;
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`CachedFetch: Network error for ${url}:`, error);
      
      // Try cache as fallback
      const cached = cacheManager.get(this.cacheKey);
      if (cached) {
        console.log(`CachedFetch: Serving ${url} from cache as fallback`);
        return cached;
      }
      
      throw error;
    }
  }

  // Clear cache for this key
  clearCache() {
    cacheManager.remove(this.cacheKey);
  }
}

// Image preloader with caching
export class ImageCache {
  constructor() {
    this.loadedImages = new Set();
    this.loadingPromises = new Map();
  }

  // Preload image with caching
  async preloadImage(src) {
    if (this.loadedImages.has(src)) {
      return Promise.resolve();
    }

    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src);
    }

    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.loadedImages.add(src);
        this.loadingPromises.delete(src);
        console.log(`ImageCache: Preloaded ${src}`);
        resolve();
      };
      
      img.onerror = () => {
        this.loadingPromises.delete(src);
        console.error(`ImageCache: Failed to preload ${src}`);
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });

    this.loadingPromises.set(src, promise);
    return promise;
  }

  // Preload multiple images
  async preloadImages(sources) {
    const promises = sources.map(src => this.preloadImage(src));
    return Promise.allSettled(promises);
  }

  // Check if image is cached
  isImageCached(src) {
    return this.loadedImages.has(src);
  }

  // Clear image cache
  clear() {
    this.loadedImages.clear();
    this.loadingPromises.clear();
  }
}

// Create singleton instances
const serviceWorkerManager = new ServiceWorkerManager();
const imageCache = new ImageCache();

// Auto-register service worker when module loads
if (typeof window !== 'undefined') {
  // Register on page load
  window.addEventListener('load', () => {
    serviceWorkerManager.register();
  });

  // Handle online/offline events
  window.addEventListener('online', () => {
    serviceWorkerManager.handleOnline();
  });

  window.addEventListener('offline', () => {
    serviceWorkerManager.handleOffline();
  });
}

export { serviceWorkerManager, imageCache };
export default serviceWorkerManager;