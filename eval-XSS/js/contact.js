document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
  
      // Display the user input without sanitization
      displayMessage(`Name: ${name}`);
      displayMessage(`Email: ${email}`);
      displayMessage(`Message: ${message}`);
  
      // Send the form data to the server
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);
  
      fetch('/submit-form', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (response.ok) {
            displayMessage('Form submitted successfully!');
          } else {
            throw new Error('Form submission failed.');
          }
        })
        .catch(error => {
          console.error(error);
          displayMessage('An error occurred while submitting the form.');
        });
    });
  
    function displayMessage(message) {
      const output = document.querySelector('main output');
      output.innerHTML += `<p>${message}</p>`;
    }
  });
  