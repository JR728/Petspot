const router = require('express').Router();

//  router.get('/', withAuth, async (req, res) => {
//      try {
//          const userData = await User.findAll({
//              attributes: { exclude: ['password'] },
//              order: [['name', 'ASC']], // Not sure what this line does or if it is needed.
//          });

//          const users = userData.map((project) => project.get({ plain: true }));

//          res.render('homepage', {
//              users,
//              logged_in: req.session.logged_in,
//          });
//      } catch (err) {
//          res.status(500).json(err);
//     }
// });

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});
router.get('/',(req, res) => {
    res.render('main');
});

router.get('/create', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('create');
  });

module.exports = router;
