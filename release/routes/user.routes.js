module.exports = (app) => {
	const model = require("../models/user.model");
	const router = require("express").Router();

	router.get("/", (req, res) => {
		model
			.findAll()
			.then((data) => {
				console.log("Data:", data);
				res.render("user");
			})
			.catch((err) => {
				res.send(err);
			});
	});
	router.post("/createuser", (req, res) => {
		model
			.create(req.body)
			.then((data) => {
				console.log("Data: ", data);
				res.send(data);
			})
			.catch((err) => {
				console.log("Error: ", err);
			});
	});
	router.put("/updateuser", (req, res) => {
		const id = req.params.id;
		model
			.update(req.body, {
				where: { id: id },
			})
			.then((num) => {
				if (num == 1) {
					res.send({
						message: "undefined was updated successfully.",
					});
				} else {
					res.send({
						message: "Cannot update user",
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: "Error updating user",
				});
			});
	});
	router.delete("/deleteuser", (req, res) => {
		const id = req.params.id;
		model
			.destroy({
				where: { id: id },
			})
			.then((num) => {
				if (num == 1) {
					res.send({
						message: "user was deleted successfully!",
					});
				} else {
					res.send({
						message: "Cannot delete user",
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: "Could not delete user",
				});
			});
	});
	app.use("/user", router);
};
