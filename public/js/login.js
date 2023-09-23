// Wait for the DOM to fully load before executing JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Function to handle user login
    const loginFormHandler = async (event) => {
        event.preventDefault();

        // Gather the data from the form elements on the page
        const username = document.querySelector('#username').value.trim();
        const password = document.querySelector('#password').value.trim();
        // Does there need to be a 3rd variable for 'email'?
        const email = document.querySelector('#email').value.trim();

        if (username && password && email) {
            // Send the username and password to the server for login
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password, email }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/main'); // Redirect to main.handlebars upon successful login
            } else {
                alert('Failed to log in');
            }
        }
    };

    // Function to handle user registration
    const createUser = async (event) => {
        event.preventDefault();

        // Gather the data from the form elements on the page
        const username = document.querySelector('#username').value.trim();
        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#password').value.trim();

        if (username && email && password) {
            // Send the user data to the server for registration
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                document.location.replace('/main'); // Redirect to main.handlebars upon successful registration
            } else {
                alert('Failed to create user');
            }
        } else {
            alert('Please fill out all fields');
        }
    };

    // Attach event listeners to the login and create buttons
    document.querySelector('#login').addEventListener('click', loginFormHandler);
    document.querySelector('#create').addEventListener('click', createUser);
});
