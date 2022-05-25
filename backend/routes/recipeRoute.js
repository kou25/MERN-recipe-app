const express = require("express");
const router = express.Router();
const {
  addRecipe,
  getRecipe,
  allRecipes,
  deleteRecipe
} = require("../controllers/recipeController");

//recipe routes
router.route("/recipes").get(allRecipes);
router.route("/recipe/new").post(addRecipe);
router.route("/recipe/:id").get(getRecipe).delete(deleteRecipe);

module.exports = router;
