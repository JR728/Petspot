const User = require('../models/User');

const sequelize = require('../config/connection');

const userData = [
    {
        username: "Mickey",
        password: "9lives"
    }
]

const seedUsers = async () => {
    await sequelize.sync({ force: true });
        User.bulkCreate(userData);
            console.log('\n----- DATABASE SEEDED -----\n');
};

seedUsers();
