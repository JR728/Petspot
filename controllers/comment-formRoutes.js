//comment-form route

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(require('./commentRoutes'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// POST route to handle form submission
router.post('./commentRoutes', (req, res) => {

    const { comment } = req.body;
  
    res.status(200).json({ message: 'Comment submitted successfully' });
  });
  
  module.exports = router;