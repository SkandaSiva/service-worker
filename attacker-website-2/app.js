const APP = {
  SW: null,
  init() {
    // called after DOMContentLoaded
    if ('serviceWorker' in navigator) {
      // Register service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          APP.SW =
            registration.installing ||
            registration.waiting ||
            registration.active;
          console.log('Service worker registered');
        });

      // Check if a service worker is currently controlling the page
      if (navigator.serviceWorker.controller) {
        console.log('Service worker is controlling this page');
      }

      // Register a handler to detect when a new or updated service worker is installed & activate
      navigator.serviceWorker.oncontrollerchange = () => {
        console.log('New service worker activated');
      };

      // Listen for messages from the service worker
    } else {
      console.log('Service workers are not supported.');
    }

    // Use arrow function to preserve the context
    this.requestAndSetBackground();
  },

  requestAndSetBackground() {
    // Replace 'https://example.com/path/to/your/image.jpg' with the actual URL of the image
    const imageUrl = 'https://example.com/path/to/your/image.jpg';

    // Fetch the image using CORS headers
    fetch(imageUrl, {
      method: 'GET',
      mode: 'cors', // Use CORS mode
      headers: {
        'Content-Type': 'image/jpeg', // Adjust the content type based on your image format
      },
    })
      .then((response) => {
        if (response.ok) {
          // Convert the response to a blob
          return response.blob();
        } else {
          throw new Error('Failed to fetch image');
        }
      })
      .then((blob) => {
        // Create a data URL from the blob
        return URL.createObjectURL(blob);
      })
      .then((dataUrl) => {
        // Set the background using the data URL
        document.body.style.backgroundImage = url('${dataUrl}');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  },
};

document.addEventListener('DOMContentLoaded', () => APP.init());