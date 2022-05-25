const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [40, "Name must be at under 40 characters"]
  },
  instruction: {
    type: String,
    required: [true, "Please provide instuction"]
  },
  ingredients: {
    type: String,
    required: [true, "Please provide ingredients"]
  },
  photo: {
    id: {
      type: String,
      required: true
    },
    secure_url: {
      type: String,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);
