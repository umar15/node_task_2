const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Users = sequelize.define("users", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
	},
	name: Sequelize.STRING,
	email: Sequelize.STRING,
	status: Sequelize.INTEGER,
});
module.exports = Users;
