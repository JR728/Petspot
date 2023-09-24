async function loginFormHandler(event) {
    event.preventDefault();

    // Gather the data from the form elements on the page
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        // Send the username, password, and email to the server for login
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/'); // Redirect to 'homepage.handlebars' upon successful login.
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

// async function signupFormHandler(event) {
//     event.preventDefault();

//     const username = document.querySelector('#username-signup').value.trim();
//     const password = document.querySelector('#password-signup').value.trim();
//     const email = document.querySelector('#email-signup').value.trim();

//     if (username && password && email) {

//         const response = await fetch('/api/users/login', {
//             method: 'POST',
//             body: JSON.stringify({ username, password, email }),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (response.ok) {
//             document.location.replace('/'); // Redirect to 'homepage.handlebars' upon successful login.
//         } else {
//             alert(response.statusText);
//         }
//     }
// };

// document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);


// // Function to handle user registration
// const createUser = async (event) => {
//     event.preventDefault();

//     // Gather the data from the form elements on the page
//     const username = document.querySelector('#username').value.trim();
//     const email = document.querySelector('#email').value.trim();
//     const password = document.querySelector('#password').value.trim();

//     if (username && email && password) {
//         // Send the user data to the server for registration
//         const response = await fetch('/api/users/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, email, password }),
//         });

//         if (response.ok) {
//             document.location.replace('/'); // Redirect to main.handlebars upon successful registration
//         } else {
//             alert('Failed to create user');
//         }
//     } else {
//         alert('Please fill out all fields');
//     }
// };

// Attach event listeners to the login and create buttons
// document.querySelector('#login').addEventListener('click', loginFormHandler);
// document.querySelector('#create').addEventListener('click', createUser);
// });


// Wait for the DOM to fully load before executing JavaScript
// document.addEventListener('DOMContentLoaded', function () {
// Function to handle user login
// const loginFormHandler = async (event) => {