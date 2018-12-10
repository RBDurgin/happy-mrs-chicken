const CACHE_NAME = "HAPPY_CHICKEN";
// Listen for install event, set callback
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        "/happy-mrs-chicken",
        "/happy-mrs-chicken/",
        "./images/icons-192.png",
        "./images/icons-256.png",
        "./styles.css",
        "./mrs-chicken.js",
        "./index.html",
        "./404.html"
      ]);
    })
  );
  console.log("Happy Mrs. Chicken Registered!");
});

self.addEventListener("activate", function(event) {
  console.log("Happy Mrs. Chicken Service Worker Activated!");
});

self.addEventListener("fetch", function(event) {
  console.log("fetch()", event);
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        if (response) {
          console.log("Found ", event.request.url, " in cache");
          return response;
        }
        console.log("Network request for ", event.request.url);
        return fetch(event.request).then(response => {
          if (response.status === 404) {
            return caches.match("pages/404.html");
          }
          return caches.open(staticCacheName).then(cache => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch(error => {
        console.log("Error, ", error);
        return caches.match("offline.html");
      })
  );
});
