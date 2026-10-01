const CACHE_NAME = "ne-superhub-v1";
const ASSETS_TO_CACHE = [
  "/Northeast-India/",
  "/Northeast-India/index.html",
  "/Northeast-India/style.css",
  "/Northeast-India/portal-data.js",
  "/Northeast-India/about.html",
  "/Northeast-India/contact.html",
  "/Northeast-India/manifest.json"
];

// Install Event: Cache Core Static Assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event: Clean up outdated caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Cache First, Fallback to Network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
