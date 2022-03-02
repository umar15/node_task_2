const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Sms = sequelize.define("sms", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
	},
	phone: Sequelize.STRING,
	status: Sequelize.INTEGER,
});
module.exports = Sms;
