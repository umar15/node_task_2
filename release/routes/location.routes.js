module.exports = (app) => {
	const model = require("../models/location.model");
	const router = require("express").Router();

	router.get("/", (req, res) => {
		model
			.findAll()
			.then((data) => {
				console.log("Data:", data);
				res.render("location");
			})
			.catch((err) => {
				res.send(err);
			});
	});
	router.post("/createlocation", (req, res) => {
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
	router.put("/updatelocation", (req, res) => {
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
						message: "Cannot update location",
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: "Error updating location",
				});
			});
	});
	router.delete("/deletelocation", (req, res) => {
		const id = req.params.id;
		model
			.destroy({
				where: { id: id },
			})
			.then((num) => {
				if (num == 1) {
					res.send({
						message: "location was deleted successfully!",
					});
				} else {
					res.send({
						message: "Cannot delete location",
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: "Could not delete location",
				});
			});
	});
	app.use("/location", router);
};
