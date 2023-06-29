import express from "express";
import {
  getUser,
  createRecipeReply,
  addRemoveRecipeLike,
  addRemoveFavorite,
  addRemoveReplyLike,
  createReplyReply,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userId", getUser);

/* POST */
router.post("/:userId/recipes/:recipeId/reply", createRecipeReply);
router.post(
  "/:userId/recipes/:recipeId/replies/:replyId/reply",
  createReplyReply
);

/* UPDATE */
router.patch("/:userId/recipes/:recipeId/favorite", addRemoveFavorite);
router.patch("/:userId/recipes/:recipeId/like", addRemoveRecipeLike);
router.patch(
  "/:userId/recipes/:recipeId/replies/:replyId/like",
  addRemoveReplyLike
);

export default router;
