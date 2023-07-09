import Recipe from "../models/Recipe.js";
import Reply from "../models/Reply.js";
import User from "../models/User.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

/* READ */
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();

    res.status(200).json(recipes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);

    res.status(200).json(recipe);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getReplies = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    const recipesReplies = [];

    for (const replyId of recipe.replies) {
      const reply = await Reply.findById(replyId);
      recipesReplies.push(reply);
    }

    res.status(200).json(recipesReplies);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUsersRecipes = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    let userRecipes = [];

    for (const recipeId of user.recipes) {
      const recipe = await Recipe.findById(recipeId);
      userRecipes.push(recipe);
    }

    res.status(200).json(userRecipes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getReply = async (req, res) => {
  try {
    const { recipeId, replyId } = req.params;
    const reply = await Reply.findById(replyId);

    res.status(200).json(reply);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* CREATE */
export const createRecipe = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    console.log(req.body.title);
    console.log(req.body.pictureUrl);

    const {
      title,
      description,
      difficultyLevel,
      servings,
      preparationTime,
      cookingTime,
      ingredients,
      preparationInstructions,
      calories,
      protein,
      fat,
      carbohydrates,
      pictureUrl,
    } = req.body;

    const newRecipe = new Recipe({
      title,
      description,
      difficultyLevel,
      servingSize: servings,
      preparationTime,
      cookingTime,
      ingredients,
      preparationInstructions,
      nutritionalInformation: {
        calories,
        protein,
        fat,
        carbohydrates,
      },
      pictureUrl,
      postedBy: {
        _id: user._id,
        username: user.username,
        profileImage: user.profileImage,
      },
    });
    await newRecipe.save();

    user.recipes.push(newRecipe._id);
    await user.save();

    const recipes = await Recipe.find();

    res.status(201).json(recipes);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* UPDATE */
