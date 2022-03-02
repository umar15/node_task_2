const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Emails = sequelize.define("emails", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
	},
	email: Sequelize.STRING,
	status: Sequelize.INTEGER,
});
module.exports = Emails;
