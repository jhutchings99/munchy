import express from "express";
import {
  getRecipe,
  getRecipes,
  createRecipe,
  getReplies,
  getReply,
} from "../controllers/recipes.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:recipeId", getRecipe);
router.get("/", getRecipes);
router.get("/:recipeId/replies", getReplies);
router.get("/:recipeId/replies/:replyId", getReply);

/* POST */
router.post("/create/:userId", createRecipe);

export default router;
