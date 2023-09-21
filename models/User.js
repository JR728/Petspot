const  { Model, DataTypes } = require('sequelize');
// const bcrypt = require ('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    // checkoutPassword(loginPw) {
    //     return bcrypt.compareSync(loginPw, this.password);
    // }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
        },
        username: { // Changed this from 'name' to 'username' to match login page.
            type: DataTypes.STRING,
            allowNull: false, 
        },
        // email: { // Removed 'email' since login page just has 'uername' and 'password.'
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     unique: true,
        //     validate: {
        //         isEmail: true,
        //     },
        // },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        // hooks: {
        //     beforeCreate: async (newUserData) => {
        //         newUserData.password = await bcrypt.hash(newUserData.password, 10)
        //         return newUserData;
        //     },
        // },
        sequelize,
        // timestamps: false,
        // freeezeTableName: true,
        // underscored: true,
        modelName: 'user',
    }
);

module.exports = User; 