const CACHE_NAME = 'HAPPY_CHICKEN';
// Listen for install event, set callback
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
          "/images/icons-192.png",
          "/images/icons-256.png",
          "/styles.css", 
          "/mrs-chicken.js", 
          "/index.html"]);
    })
  );
  console.log("Happy Mrs. Chicken Registered!");
});

self.addEventListener("activate", function(event) {
  console.log("Happy Mrs. Chicken Service Worker Activated!");
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
