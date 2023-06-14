import express from "express";
import {
  getRecipe,
  getRecipes,
  createRecipe,
} from "../controllers/stations.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getRecipe);
router.get("/:recipeId", getRecipes);

/* POST */
router.post("/", createRecipe);

/* UPDATE */
// router.patch("/:stationId/reviews/:userId", createReview);
// router.patch("/:stationId/prices/:userId", createPrice);
export default router;
