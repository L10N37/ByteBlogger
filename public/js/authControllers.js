// Function to validate the password field, set to at least one capital letter and at least one special character (including exclamation mark)
function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
}

// Function to check if the username already exists
async function checkUsername(username) {
  try {
    const response = await fetch('/check-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();

    return data.exists;
  } catch (error) {
    console.error('Error checking username:', error);
    return false;
  }
}

// Function to display an error message
function displayErrorMessage(message) {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.textContent = message;
  errorMessage.style.color = 'red';
}

// Function to display a success message
function displaySuccessMessage(message) {
  const successMessage = document.querySelector('.success-message');
  successMessage.textContent = message;
  successMessage.style.color = 'green';
}

// Function to clear error and success messages
function clearMessages() {
  const errorMessage = document.querySelector('.error-message');
  const successMessage = document.querySelector('.success-message');
  errorMessage.textContent = '';
  successMessage.textContent = '';
}

// Function to reset input fields
function resetInputFields() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.value = '';
  });
}

// Event listener for form submission
document.querySelector('form[action="/signup"]').addEventListener('submit', async event => {
  event.preventDefault();

  // Clear error and success messages
  clearMessages();

  // Get the form values
  const username = document.querySelector('#signup-username').value;
  const password = document.querySelector('#signup-password').value;

  // Validate the password
  if (!validatePassword(password)) {
    displayErrorMessage('Password must contain at least one uppercase character and one special character.');
    return;
  }

  // Check if username already exists
  const usernameExists = await checkUsername(username);
  if (usernameExists) {
    displayErrorMessage('Username already exists. Please choose a different username.');
    return;
  }

  // Perform sign-up logic
  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      displaySuccessMessage(data.message);
      resetInputFields();
    } else {
      displayErrorMessage(data.message);
    }
  } catch (error) {
    console.error('Error signing up:', error);
    displayErrorMessage('Error signing up. Please try again.');
  }
});

// Event listener for sign-in form submission
document.querySelector('form[action="/signin"]').addEventListener('submit', async event => {
  event.preventDefault();

  // Clear error and success messages
  clearMessages();

  // Get the form values
  const username = document.querySelector('#signin-username').value;
  const password = document.querySelector('#signin-password').value;

  // Perform sign-in logic
  try {
    const response = await fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      displaySuccessMessage(data.message);
      resetInputFields();
      window.location.href = '/home'; // Redirect to the homepage
    } else {
      displayErrorMessage(data.message);
    }
  } catch (error) {
    console.error('Error signing in:', error);
    displayErrorMessage('Error signing in. Please try again.');
  }
});