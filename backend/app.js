const express = require("express");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const app = express();
const Cors = require("cors");

// initialize middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(Cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);

//import routes here
const recipe = require("./routes/recipeRoute");

//router middleware
app.use("/api/v1", recipe);

//welcome route
app.get("/", (req, res) => res.send("Server up and running"));

module.exports = app;
