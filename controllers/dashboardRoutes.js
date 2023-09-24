const router = require('express').Router();
const sequelize = require('../config/connection'); // Is this line needed if 'sequelize' is never read?
const { User, Post } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => { // Removed 'withAuth' from before 'async.'
//     try {
//         const dbPostData = await Post.getAll({
//             where: {
//                 user_id: req.session.user_id
//             },
//             attributes: [
//                 'id', 
//                 'title', 
//                 'created_at', 
//                 'post_content'
//             ],
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username']
//                 }
//             ]
//         });

//         const posts = dbPostData.map(post => post.get({ plain: true }));
//         // Does this mean the user will go to their dashboard if they are logged in?
//         res.render('dashboard', { posts, loggedIn: true }); 
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

module.exports = router;
