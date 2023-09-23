const sequelize = require('../config/connection');
const { User, Post } = require('../models');
const userData = require('./user.json');
const postData = require('./post.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    console.log('\n----- USERS SEEDED -----\n');

    await Post.bulkCreate(postData);
    console.log('\n----- POSTS SEEDED -----\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1); // Exit with an error code
  }
};

seedDatabase();
