self.addEventListener('fetch', function(event) {
  // Dummy fetch handler to satisfy PWA install requirements.
  // It simply passes the request through the network.
  event.respondWith(fetch(event.request).catch(() => new Response('Offline')));
});
