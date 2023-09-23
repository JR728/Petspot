const router = require('express').Router();
const { User } = require('../../models');

// Route to handle user registration
router.post('/register', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // You can handle user sessions or other logic here if needed

    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to handle user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }

    // Set up user session or authentication token here

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to handle user logout (if needed)
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
