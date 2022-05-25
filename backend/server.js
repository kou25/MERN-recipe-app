const app = require("./app");
const Port = process.env.PORT;
const connectWithDb = require("./config/db");
const cloudinary = require("cloudinary");
require("dotenv").config();

//Connect with Database
connectWithDb();

//cloudinary config goes here
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(Port, () => console.log(`Server is listening on port ${Port}!`));
