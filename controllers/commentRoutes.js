// Commented out because no time to finish it:

// const router = require('express').Router();
// const { Post, User } = require('../../models');


// // Route to create a new comment 
// router.post('/posts/comments', async (req, res) => {
//   try {
//     const postId = req.params.postId;

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: 'Post not found' });
//     }

//     const comment = new Comment({
//       text: req.body.text,
//       postId: postId
//     });

//     await comment.save();

//     post.comments.push(comment);
//     await post.save();
//     res.status(201).json({ message: 'Comment created successfully' });
//   } catch (error) {

//     console.error(error);
//     res.status(500).json({ error: 'error' });
//   }
// });

// module.exports = router;

// //delete comment (need to add a comment model for this to actually work)
// app.delete('/post/comments', (req, res) => {
//     const commentId = req.params.id;
//     Comment.findByIdAndDelete(commentId)
//       .then(() => {
//         res.send('Comment deleted successfully');
//       })
//       .catch(error => {
//         console.error('Error deleting comment:', error);
//         res.status(500).send('Error deleting comment');
//       });
// });
