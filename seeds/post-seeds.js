const { Post } = require('../models');

const postData = [
    {
        title: 'Kitty Litter Recommendations?',
        post_content: 'My owner thinks the litter doesn\'t work so well. Anyone know a good brand?',
        user_id: 1
    },
    {
        title: 'Tiger Looking for Part-time Job',
        post_content: 'I\'m a famous, cereal-selling tiger interested in earning a little more income. Any ideas?',
        user_id: 3
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;