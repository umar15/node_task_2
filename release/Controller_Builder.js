const fs = require("fs");

const build = () => {
	let config = fs.readFileSync("../configuration.json");
	let data = JSON.parse(config);

	data.model.map((item) => {
		fs.appendFile(
			`routes/${item.name}.routes.js`,
			`
         module.exports = (app) => {
			const model = require("../models/${item.name}.model");
	      const router = require("express").Router();

	      router.get("/", (req, res)=>{
				model.findAll()
		         .then((data) => {
						console.log('Data:', data)
			      res.render("${item.name}");
		      })
		      .catch((err) => {
			      res.send(err);
		      });
			});
	      router.post("/create${item.name}", (req, res)=>{
				model.create(req.body)
		      .then((data) => {
			      console.log("Data: ", data);
			      res.send(data);
		      })
		      .catch((err) => {
			      console.log("Error: ", err);
		      });
			});
	      router.put("/update${item.name}", (req, res)=>{
				const id = req.params.id;
	         model.update(req.body, {
		         where: { id: id },
	         })
				.then((num) => {
					if (num == 1) {
						res.send({
							message: "${item.user} was updated successfully.",
						});
					} else {
						res.send({
							message: "Cannot update ${item.name}",
						});
					}
				})
				.catch((err) => {
					res.status(500).send({
						message: "Error updating ${item.name}",
					});
				});
			});
	      router.delete("/delete${item.name}", (req, res)=>{
				const id = req.params.id;
				model.destroy({
					where: { id: id },
				})
					.then((num) => {
						if (num == 1) {
							res.send({
								message: "${item.name} was deleted successfully!",
							});
						} else {
							res.send({
								message: "Cannot delete ${item.name}",
							});
						}
					})
					.catch((err) => {
						res.status(500).send({
							message: "Could not delete ${item.name}",
						});
					});
			});
	      app.use("/${item.name}", router);
         };
         `,
			(err) => {
				if (err) console.log("Error: ", err);
				console.log("Saved");
			}
		);
	});
};

build();
