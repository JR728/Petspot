const router = require('express').Router();



module.exports = router;


// // router.get('/', withAuth, async (req, res) => {
//     router.get('/', async (req, res) => { // Removed 'withAuth' to test 'login.handlebars'
//         try {
//         const userData = await User.findAll({
//             attributes: { exclude: ['password'] },
//             order: [['name', 'ASC']], // Not sure what this line does or if it is needed.
//         });

//         const users = userData.map((project) => project.get({ plain: true }));

//         res.render('homepage', {
//             users,
//             logged_in: req.session.logged_in,
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.get('/login', (req, res) => {
//     if (req.session.logged_in) {
//         res.redirect('/');
//         return;
//     }

//     res.render('login');
// });