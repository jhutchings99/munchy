const IngredientSchema = new mongoose.Schema({
  name: String,
  quantity: String,
});

const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
    likes: {
      type: Array,
      default: [],
    },
    replies: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
  },
  { timestamps: true }
);

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
      default: {},
    },
    likes: {
      type: Array,
      default: [],
    },
    usersFavorited: {
      type: Array,
      default: [],
    },
    replies: [CommentSchema],
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;
