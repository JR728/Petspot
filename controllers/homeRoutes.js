const router = require('express').Router();
const { Post, User } = require('../models');
// const withAuth = require('../utils/auth'); // Is this needed as part of router.get to homepage ('/')?

router.get('/', async (req, res) => {
    console.log(req.session);
  try {
    // Get all Post data and JOIN with User 'username': 
    const dbPostData = await Post.findAll({
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

router.get('/login', (req, res) => {
  // If the user goes to the '/login' route but is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  res.render('login');
});

// router.get('/signup', (req, res) => { 
//   // If the user goes to the '/signup' route but is already logged in, redirect to the homepage
//   if (req.session.loggedIn) {
//     return res.redirect('/');
//   }
//   res.render('signup'); // You can create a signup.handlebars for this route
// });

module.exports = router;

// router.get('/', async (req, res) => {
//   console.log(req.session);
// try {
//   const dbPostData = await Post.findAll({
//     attributes: [
//       'id',
//       'title',
//       'created_at',
//       'post_content'
//     ],
//     include: [
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   });
  
//   const posts = dbPostData.map(post => post.get({ plain: true }));

//   // Check if the user is not logged in, and if so, redirect to the login page:
//   if (!req.session.loggedIn) {
//     return res.redirect('/login');
//   }

//   res.render('homepage', {
//     posts,
//     loggedIn: req.session.loggedIn
//   });
  
// } catch (err) {
//   console.log(err);
//   res.status(500).json(err);
// }
// });
