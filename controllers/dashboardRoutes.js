const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Route shows all the user's own posts on their dashboard. The 'withAuth' function authenticates the user before the user can access this route:
router.get('/', withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.findAll({
        // Retrieves all posts that belong to the currently logged-in user, using 'req.session.userId' to filter posts:
        where: {
          user_id: req.session.userId
        },
        attributes: ['id', 'title', 'created_at', 'post_content'],
        include: [
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
  
      const posts = dbPostData.map(post => post.get({ plain: true }));
  
      res.render('dashboard', { posts, loggedIn: true });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Route lets the user create a new post:
router.get('/create', withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.findAll({
        where: {
          user_id: req.session.userId
        },
        attributes: ['id', 'title', 'created_at', 'post_content'],
        include: [
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
  
      const posts = dbPostData.map(post => post.get({ plain: true }));
  
      res.render('create-post', { posts, loggedIn: true });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;
