var cacheName = 'hello-world-page';
var filesToCache = [
  '/',
  '/index.html',
  '/galerie.html',
  '/kontakt.html',
  '/css/bulma.min.css',
  '/css/bulma-carousel.css',
  '/js/bulma-carousel.min.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');

    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    };
  
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
