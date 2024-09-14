
 
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Expenses_db', 'root', 'muskan!!!@00$', {
    host: 'localhost',
    dialect: 'mysql',
});

const Expenses = sequelize.define('Expenses', {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: { // Should be "date" not "data"
        type: DataTypes.DATE,
        allowNull: false,
    },
    amount: { // Corrected from "amoumt"
        type: DataTypes.FLOAT, // Use FLOAT for numerical values
        allowNull: false,
    },
});

sequelize.sync()
    .then(() => {
        console.log('Database & table created');
    })
    .catch((error) => {
        console.log(error);
    });

module.exports = {
    sequelize,
    Expenses,
};
