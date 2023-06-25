// ensure HTML elements are loaded before being targeted
document.addEventListener('DOMContentLoaded', function() {
    // Handle sign-in form submission
    document.getElementById('signin-form').addEventListener('submit', function(e) {
      e.preventDefault();
  
    // Get form data
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;
  
    // Make AJAX request to sign-in endpoint
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/signin');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        // Handle successful sign-in
        if (response.success) {
          // Update UI with success message
          showMessage(response.message, 'success');
          // Redirect to home page or perform other necessary actions
          window.location.href = '/home';
        } else {
          // Update UI with error message
          showMessage(response.message, 'error');
        }
      } else {
        // Handle AJAX error
        console.error(xhr.statusText);
        // Update UI with error message
        showMessage('An error occurred during sign-in. Please try again.', 'error');
      }
    };
    xhr.onerror = function() {
      // Handle AJAX error
      console.error(xhr.statusText);
      // Update UI with error message
      showMessage('An error occurred during sign-in. Please try again.', 'error');
    };
    const data = JSON.stringify({ username, password });
    xhr.send(data);
  });
  
    // Function to display messages on the sign-in page
    function showMessage(message, type) {
        const errorContainer = document.querySelector('.error-message');
        const successContainer = document.querySelector('.success-message');
    
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
});
    