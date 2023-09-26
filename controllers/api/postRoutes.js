const router = require('express').Router();
const { Post, User } = require('../../models');

// Route searches Post and User models to get posts for homepage feed:
router.get('/', async (req, res) => {
    try {
      const dbPostData = await Post.findAll({
        attributes: ['id', 'title', 'created_at', 'post_content'],
        order: [['created_at', 'DESC']],
        include: [
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
  
      res.json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Route creates a new post for the Post model:
router.post('/create', (req, res) => {
    
    Post.create({
      title: req.body.title,
      post_content: req.body.postContent,
      user_id: req.session.userId
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;
