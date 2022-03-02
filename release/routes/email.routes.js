module.exports = (app) => {
	const model = require("../models/email.model");
	const router = require("express").Router();

	router.get("/", (req, res) => {
		model
			.findAll()
			.then((data) => {
				console.log("Data:", data);
				res.render("email");
			})
			.catch((err) => {
				res.send(err);
			});
	});
	router.post("/createemail", (req, res) => {
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
	router.put("/updateemail", (req, res) => {
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
						message: "Cannot update email",
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: "Error updating email",
				});
			});
	});
	router.delete("/deleteemail", (req, res) => {
		const id = req.params.id;
		model
			.destroy({
				where: { id: id },
			})
			.then((num) => {
				if (num == 1) {
					res.send({
						message: "email was deleted successfully!",
					});
				} else {
					res.send({
						message: "Cannot delete email",
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: "Could not delete email",
				});
			});
	});
	app.use("/email", router);
};
