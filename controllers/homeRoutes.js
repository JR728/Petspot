const router = require('express').Router();
const sequelize = require('../config/connection'); // Is this line needed if 'sequelize' is never read?
const { Post, User } = require('../models');

// Route is meant to show all of the posts on the homepage:
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'created_at',
        'post_content'
      ],
      include: [
        {
          model: User,
          attributes: ['name']
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
    res.status(500).json(err)
  }
});

router.get('/login', (req, res) => {
  // If the user goes to the '/login' route but is already logged in, the user is redirected to the homepage:
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  // If the user is not logged in, the user is sent to the login page. Should it be '/login' (like the route) or 'login' (like 'login.handlebars')?
  res.render('/login');
});

// Will need to create 'signup.handlebars'?
router.get('/signup', (req, res) => { 
  // If the user goes to the '/signup' route but is already logged in, the user is redirected to the homepage:
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  // If the user is not logged in, the user is sent to the login page. Should it be '/login' (like the route) or 'login' (like 'login.handlebars')?
  res.render('/login');
});

module.exports = router;
