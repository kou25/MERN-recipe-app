const Recipe = require("../models/recipe");
const CustomError = require("../utils/CustomError");
const cloudinary = require("cloudinary");
const promiseMiddleware = require("../middleware/promise");

//function to add a recipe ----------------------------------------------------------------
exports.addRecipe = promiseMiddleware(async (req, res, next) => {
  //check image is available in the body
  if (!req.files) {
    return next(CustomError("photo is required", 400, res));
  }

  //destructure
  const { name, instruction, ingredients } = req.body;

  //check the value id available in the body
  if (!instruction || !name || !ingredients) {
    //throw error
    return next(
      CustomError(
        "Name , instruction and ingredients must be provided",
        400,
        res
      )
    );
  }

  let file = req.files.photo;

  //use cloudinary to store the image and get the url
  const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: "recipes",
    width: "540",
    height: "360",
    crop: "scale"
  });

  //store the image url in the body
  req.body.photo = {
    id: result.public_id,
    secure_url: result.secure_url
  };

  //create and store in DB
  const recipe = await Recipe.create(req.body);

  //return the response
  res.status(200).json({
    success: true,
    data: recipe,
    Message: "Recipe has been added successfully"
  });
});

//get all the recipes ----------------------------------------------------------------
exports.allRecipes = promiseMiddleware(async (req, res) => {
  const recipes = await Recipe.find().sort({ _id: -1 });

  //if no recipes are found
  if (!recipes) return CustomError("No recipes found", 400, res);

  //return the response
  res.status(200).json({
    success: true,
    data: recipes,
    Message: ""
  });
});

//get all the recipes ----------------------------------------------------------------
exports.getRecipe = promiseMiddleware(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  //if no recipe are found
  if (!recipe) return next(CustomError("No user found", 400, res));

  //return the response
  res.status(200).json({
    success: true,
    data: recipe,
    Message: ""
  });
});

// delete recipe  ----------------------------------------------------------------
exports.deleteRecipe = promiseMiddleware(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return CustomError("No recipe found with this id", 401, res);
  }

  //destroy the existing image
  await cloudinary.v2.uploader.destroy(recipe.photo.id);

  await recipe.remove();

  res.status(200).json({
    success: true,
    message: "recipe was deleted !"
  });
});
