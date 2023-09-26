const router = require('express').Router();
const { Post, User } = require('../models');

// Homepage route that shows all posts in the homepage feed:
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ['id', 'title', 'created_at', 'post_content'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = dbPostData.map(post => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route:
router.get('/login', (req, res) => {
  // If the user goes to the '/login' route but is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  res.render('login');
});


module.exports = router;
