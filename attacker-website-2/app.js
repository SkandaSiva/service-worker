// app.js

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

    // Request the image and set it as the background
    this.requestAndSetBackground();
  },

  requestAndSetBackground() {
    // Replace 'http://websitelogin.com/path/to/your/image.jpg' with the actual URL of the image
    const imageUrl = 'https://rapidly-vast-pipefish.ngrok-free.app/image_processing20210107-6784-v6bh0c.png';

    // Fetch the image
    fetch(imageUrl)
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
        document.body.style.backgroundImage = `url('${dataUrl}')`;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  },
};

document.addEventListener('DOMContentLoaded', () => APP.init()); // Use arrow function here
