self.addEventListener('activate', event => {
  console.log('Service worker activating...');
});

self.addEventListener('install', event => {
  console.log('Service worker installing...');
  event.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        '/index.html',
        '/manifest.json',
        '/script.js',
        '/style.css',
        '/images/192.png'
      ]);
    })
  )
});