// Ensure HTML elements are loaded before being targeted
document.addEventListener('DOMContentLoaded', function() {
    // Handle sign-up form submission
    document.getElementById('signup-form').addEventListener('submit', function(e) {
      e.preventDefault();
  
      // Get form data
      const username = document.getElementById('signup-username').value;
      const password = document.getElementById('signup-password').value;
  
      // Make AJAX request to sign-up endpoint
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/signup');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        if (xhr.status === 201) {
          const response = JSON.parse(xhr.responseText);
          // Handle sign-up response
          showMessage(response.message, 'success');
          // Optionally, perform additional actions upon successful sign-up
        } else if (xhr.status === 409) {
          const response = JSON.parse(xhr.responseText);
          showMessage(response.message, 'error');
        } else if (xhr.status === 400) {
          const response = JSON.parse(xhr.responseText);
          showMessage(response.message, 'error');
        } else {
          // Handle other error statuses
          console.error(xhr.statusText);
          showMessage('An error occurred during sign-up. Please try again.', 'error');
        }
      };
      xhr.onerror = function() {
        // Handle AJAX error
        console.error(xhr.statusText);
        showMessage('An error occurred during sign-up. Please try again.', 'error');
      };
      const data = JSON.stringify({ username, password });
      xhr.send(data);
    });
  
    // Function to display messages on the sign-up page
    function showMessage(message, type) {
      const errorContainer = document.querySelector('.error-message');
      const successContainer = document.querySelector('.success-message');
  
      if (errorContainer && successContainer) {
        if (type === 'error') {
          errorContainer.textContent = message;
          errorContainer.style.display = 'block';
          successContainer.style.display = 'none';
        } else if (type === 'success') {
          successContainer.textContent = message;
          successContainer.style.display = 'block';
          errorContainer.style.display = 'none';
        }
      }
    }
  });
  