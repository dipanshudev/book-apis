const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

// Create a Sequelize instance
const sequelize = new Sequelize(config.database, config.username, config.password, config);

export default sequelize;
