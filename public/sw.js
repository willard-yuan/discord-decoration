// Service Worker for Discord Decoration Caching
// @ts-nocheck

const CACHE_NAME = 'discord-decoration-v1.1.3';
const STATIC_CACHE = 'static-v1.1.3';
const DYNAMIC_CACHE = 'dynamic-v1.1.3';
const IMAGE_CACHE = 'images-v1.1.3';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/banner.svg'
];

// Cache strategies for different resource types
const CACHE_STRATEGIES = {
  // Static assets - Cache first, network fallback
  static: [
    /\.js$/,
    /\.css$/,
    /\.woff2?$/,
    /\.ttf$/,
    /\.ico$/
  ],
  // Images - Cache first with long expiration
  images: [
    /\.png$/,
    /\.jpg$/,
    /\.jpeg$/,
    /\.webp$/,
    /\.gif$/,
    /\.svg$/
  ],
  // HTML pages - Network first, cache fallback
  pages: [
    /\.html$/,
    /\/$/
  ]
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (except for fonts and CDN assets)
  if (url.origin !== location.origin && !isAllowedExternalResource(url)) {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

// Determine if external resource should be cached
function isAllowedExternalResource(url) {
  const allowedDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'cdnjs.cloudflare.com'
  ];
  
  return allowedDomains.some(domain => url.hostname.includes(domain));
}

// Main request handler
async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Determine cache strategy based on resource type
  if (isStaticAsset(pathname)) {
    return handleStaticAsset(request);
  } else if (isImage(pathname)) {
    return handleImage(request);
  } else if (isPage(pathname)) {
    return handlePage(request);
  } else {
    return handleDynamic(request);
  }
}

// Check if resource is a static asset
function isStaticAsset(pathname) {
  return CACHE_STRATEGIES.static.some(pattern => pattern.test(pathname));
}

// Check if resource is an image
function isImage(pathname) {
  return CACHE_STRATEGIES.images.some(pattern => pattern.test(pathname));
}

// Check if resource is a page
function isPage(pathname) {
  return CACHE_STRATEGIES.pages.some(pattern => pattern.test(pathname)) ||
         pathname === '/' || pathname.endsWith('/');
}

// Handle static assets - Cache first strategy
async function handleStaticAsset(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('Service Worker: Serving static asset from cache:', request.url);
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      console.log('Service Worker: Caching static asset:', request.url);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Service Worker: Static asset fetch failed:', error);
    return new Response('Asset not available', { status: 503 });
  }
}

// Handle images - Cache first with long expiration
async function handleImage(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('Service Worker: Serving image from cache:', request.url);
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      console.log('Service Worker: Caching image:', request.url);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Service Worker: Image fetch failed:', error);
    // Return a placeholder or fallback image
    return new Response('Image not available', { status: 503 });
  }
}

// Handle pages - Network first, cache fallback
async function handlePage(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      console.log('Service Worker: Caching page:', request.url);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache:', request.url);
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('Service Worker: Serving page from cache:', request.url);
      return cachedResponse;
    }
    
    // Return offline page or error
    return new Response('Page not available offline', { 
      status: 503,
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Handle dynamic content - Network first, short cache
async function handleDynamic(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      console.log('Service Worker: Caching dynamic content:', request.url);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Dynamic content network failed, trying cache:', request.url);
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('Service Worker: Serving dynamic content from cache:', request.url);
      return cachedResponse;
    }
    
    return new Response('Content not available', { status: 503 });
  }
}

// Clean up old cache entries periodically
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    cleanupCache();
  }
});

async function cleanupCache() {
  const cacheNames = [DYNAMIC_CACHE, IMAGE_CACHE];
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    // Remove entries older than 7 days
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    for (const request of requests) {
      const response = await cache.match(request);
      const dateHeader = response.headers.get('date');
      
      if (dateHeader) {
        const responseDate = new Date(dateHeader).getTime();
        if (responseDate < oneWeekAgo) {
          console.log('Service Worker: Removing old cache entry:', request.url);
          await cache.delete(request);
        }
      }
    }
  }
}