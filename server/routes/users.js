import express from "express";
import {
  getUser,
  createReply,
  addRemoveFavorite,
  addRemoveLike,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", getUser);

/* POST */
router.post("/:id/recipes/:recipeId/reply", createReply);

/* UPDATE */
router.patch("/:id/recipes/:recipeId/favorite", addRemoveFavorite);
router.patch("/:id/recipes/:recipeId/like", addRemoveLike);

export default router;
