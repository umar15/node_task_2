var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const db = require("./config/database");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

db.authenticate()
	.then(() => {
		console.log("Database connected!");
		db.sync();
	})
	.catch((err) => console.log("Error: ", err));

require("./routes/email.routes")(app);
require("./routes/location.routes")(app);
require("./routes/sms.routes")(app);
require("./routes/user.routes")(app);

app.get("/", (req, res) => {
	res.redirect("/user");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

app.listen("3000", () => {
	console.log("Server listening on port 3000");
});
