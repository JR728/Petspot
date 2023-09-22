const { User } = require('../models');

const userData = [
    {
        name: 'Mickey',
        email: '9lives@hotmail.com',
        password: 'kittyfood'
    },
    {
        name: 'Toucan Sam',
        email: 'longbeak@gmail.com',
        password: 'cereal'
    },
    {
        name: 'Tony the Tiger',
        email: 'theyaregreat@yahoo.com',
        password: 'frostedflakes'
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;