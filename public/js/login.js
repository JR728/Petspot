async function loginFormHandler(event) {
    event.preventDefault();

    // Gather the data from the form elements on the page:
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        // Send the username and password to the server for login:
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

async function signupFormHandler(event) {
    event.preventDefault();

    // Gather the data from the form elements on the page:
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();

    if (username && password && email) {

        const response = await fetch('/api/users/signup', {
            method: 'POST',
            // body: JSON.stringify({ username, password, email }),
            body: JSON.stringify({
                username,
                password,
                email
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/'); // Redirect to 'homepage.handlebars' upon successful login.
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);