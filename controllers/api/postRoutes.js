const router = require('express').Router();
const { Post, User } = require('../../models');

// Could this be turned into try-catch syntax?
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
            model: User,
            attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
