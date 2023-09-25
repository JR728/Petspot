const router = require('express').Router();
const { Post, User } = require('../models');
// const withAuth = require('../utils/auth'); // Is this needed as part of router.get to homepage ('/')?

// Could this be turned into try-catch syntax?
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'created_at',
      'post_content'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
   .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {
  // If the user goes to the '/login' route but is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  res.render('login');
});


module.exports = router;
