import express from "express";
import {
  getUser,
  createRecipeReply,
  addRemoveRecipeLike,
  addRemoveFavorite,
  addRemoveReplyLike,
  createReplyReply,
  followUnfollowUser,
  getUserBookmarks,
  editProfile,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:userId", getUser);
router.get("/:userId/bookmarks", getUserBookmarks);

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
router.patch("/:userId/follow/:otherUserId", followUnfollowUser);
router.patch("/:userId/profile", editProfile);

export default router;
