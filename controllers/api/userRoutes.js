const router = require('express').Router();
const { User } = require('../../models');

// Route to handle user login:
router.post('/login', async (req, res) => {
  try {

    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'Login successful.' });
    });

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Route to handle user signup. Posts new username, password, and email to database:
router.post('/signup', async (req, res) => {
  try {
    // Validate new user input. Checks that user entered all 3 required fields:
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'Please provide username, password, and email' });
    }
    // Checks that email doesn't already exist in databse:
    const existingUser = await User.findOne({ where: { email:req.body.email }});
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const userData = await User.create({ username, password, email });

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'New user successfully added.' });
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;


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
