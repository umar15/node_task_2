module.exports = (app) => {
	const model = require("../models/sms.model");
	const router = require("express").Router();

	router.get("/", (req, res) => {
		model
			.findAll()
			.then((data) => {
				console.log("Data:", data);
				res.render("sms");
			})
			.catch((err) => {
				res.send(err);
			});
	});
	router.post("/createsms", (req, res) => {
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
	router.put("/updatesms", (req, res) => {
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
						message: "Cannot update sms",
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: "Error updating sms",
				});
			});
	});
	router.delete("/deletesms", (req, res) => {
		const id = req.params.id;
		model
			.destroy({
				where: { id: id },
			})
			.then((num) => {
				if (num == 1) {
					res.send({
						message: "sms was deleted successfully!",
					});
				} else {
					res.send({
						message: "Cannot delete sms",
					});
				}
			})
			.catch((err) => {
				res.status(500).send({
					message: "Could not delete sms",
				});
			});
	});
	app.use("/sms", router);
};
