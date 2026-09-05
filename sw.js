/* Sonic 1 Forever Web Port — Service Worker
   Caches the game files for offline/PWA use.
   Place this at the same level as index.html, index.js, index.wasm, Data.rsdk.xmf
*/

const CACHE_NAME = 'sonic1-forever-v1';

// Files to pre-cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/favicon.ico',
];

// Large files (wasm + data) are fetched and cached on first use
const LAZY_CACHE_URLS = [
  '/index.js',
  '/index.wasm',
  '/Data.rsdk.xmf',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Cache valid responses for game files
        if (response && response.status === 200) {
          const pathname = url.pathname.replace(/^\//, '') || 'index.html';
          const shouldCache = [
            ...PRECACHE_URLS,
            ...LAZY_CACHE_URLS,
          ].some(u => event.request.url.endsWith(u.replace(/^\//, '')));

          if (shouldCache) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
        }
        return response;
      }).catch(() => {
        // Offline fallback
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
