const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// The 'withAuth' function checks if the user is authenticated before letting the user access the route:
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        // Retrieves all the posts that belong to the currently logged-in user, using 'req.session.user_id' to filter posts:
        where: {
            user_id: req.session.userId
        },
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
        res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
