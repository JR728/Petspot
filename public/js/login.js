// Import necessary dependencies
const express = require('express'); // Import Express.js
const exphbs = require('express-handlebars'); // Import Handlebars for templating
const bodyParser = require('body-parser'); // Middleware to parse request body
const session = require('express-session'); // Middleware for session management
const User = require('./models/User'); // Import your User model
const bcrypt = require('bcrypt'); // Password hashing library
const nodemailer = require('nodemailer'); // Email sending library

const app = express(); // Create an Express.js application

// Set up Handlebars view engine
app.engine('handlebars', exphbs()); // Configure Handlebars as the template engine
app.set('view engine', 'handlebars'); // Set the view engine to Handlebars

// Middleware for parsing JSON and URL-encoded form data
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Serve static files (CSS, JS, images, etc.)
app.use(express.static('public')); // Serve static files from the 'public' directory

// Configure and use session middleware for user authentication
app.use(session({
  secret: 'your-secret-key', // Replace with a secret key for session management
  resave: false,
  saveUninitialized: true,
}));

// Include the login.js script
app.use('/public/js', express.static(__dirname + '/public/js'));

// Define your Sequelize setup and User model (not shown in the provided code)

// Define routes
app.get('/', (req, res) => {
  // Check if the user is authenticated before allowing access to the homepage
  if (!req.session.logged_in) {
    return res.redirect('/login'); // Redirect unauthenticated users to the login page
  }

  // Render the homepage for authenticated users
  res.render('homepage', { users, logged_in: true });
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    // Send a registration confirmation email
    const transporter = nodemailer.createTransport({
      service: 'YourEmailService', // e.g., 'Gmail'
      auth: {
        user: 'YourEmailAddress',
        pass: 'YourEmailPassword',
      },
    });

    const mailOptions = {
      from: 'YourEmailAddress',
      to: email,
      subject: 'Registration Confirmation',
      text: 'You have successfully registered on our website.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send registration email' });
      } else {
        console.log('Email sent: ' + info.response);
        // Set user as logged in after registration
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
        res.status(201).json({ message: 'User registered successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Set user as logged in after successful login
    req.session.user_id = user.id;
    req.session.logged_in = true;

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
