import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  name: String,
  quantity: String,
});

const RecipeSchema = new mongoose.Schema(
  {
    title: String,
    ingredients: [IngredientSchema],
    preparationInstructions: [String],
    cookingTime: Number,
    difficultyLevel: String,
    servingSize: Number,
    description: String,
    preparationTime: Number,
    nutritionInformation: {
      calories: Number,
      protein: Number,
      fat: Number,
      carbohydrates: Number,
    },
    pictureUrl: String,
    totalFavorites: {
      type: Number,
      default: 0,
    },
    tags: [String],
    postedBy: {
      type: Object,
      default: {
        _id: "",
        username: "",
        profileImage: "",
      },
    },
    likes: {
      type: Array,
      default: [],
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
    usersFavorited: {
      type: Array,
      default: [],
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;
