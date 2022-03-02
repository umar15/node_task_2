const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Locations = sequelize.define("locations", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
	},
	name: Sequelize.STRING,
	status: Sequelize.INTEGER,
});
module.exports = Locations;
