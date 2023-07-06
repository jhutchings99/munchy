import User from "../models/User.js";
import Recipe from "../models/Recipe.js";
import Reply from "../models/Reply.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserBookmarks = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    const userBookmarks = [];

    for (const recipeId of user.favoriteRecipes) {
      const recipe = await Recipe.findById(recipeId);
      userBookmarks.push(recipe);
    }

    res.status(200).json(userBookmarks);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* POST */
export const createRecipeReply = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;
    const { content } = req.body;

    const user = await User.findById(userId);
    const recipe = await Recipe.findById(recipeId);

    const newReply = new Reply({
      postedBy: {
        _id: user._id,
        username: user.username,
        profileImage: user.profileImage,
      },
      content,
    });

    await newReply.save();

    recipe.replies.push(newReply._id);

    await recipe.save();

    res.status(200).json(recipe);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createReplyReply = async (req, res) => {
  try {
    const { userId, recipeId, replyId } = req.params;
    const { content } = req.body;

    const user = await User.findById(userId);
    const parentReply = await Reply.findById(replyId);

    const newReply = new Reply({
      postedBy: {
        _id: user._id,
        username: user.username,
        profileImage: user.profileImage,
      },
      content,
    });

    await newReply.save();

    parentReply.replies.push(newReply._id);

    await parentReply.save();

    res.status(200).json(parentReply);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFavorite = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;
    const user = await User.findById(userId);
    const recipe = await Recipe.findById(recipeId);

    if (user.favoriteRecipes.includes(recipeId)) {
      user.favoriteRecipes = user.favoriteRecipes.filter(
        (id) => id !== recipeId
      );
      recipe.usersFavorited = recipe.usersFavorited.filter(
        (id) => id !== userId
      );
      recipe.totalFavorites -= 1;
    } else {
      user.favoriteRecipes.push(recipeId);
      recipe.usersFavorited.push(userId);
      recipe.totalFavorites += 1;
    }

    await user.save();
    await recipe.save();

    res.status(200).json(user.favoriteRecipes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveRecipeLike = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;
    const user = await User.findById(userId);
    const recipe = await Recipe.findById(recipeId);

    if (user.likedRecipes.includes(recipeId)) {
      user.likedRecipes = user.likedRecipes.filter((id) => id !== recipeId);
      recipe.likes = recipe.likes.filter((id) => id !== userId);

      recipe.totalLikes -= 1;
    } else {
      user.likedRecipes.push(recipeId);
      recipe.likes.push(userId);

      recipe.totalLikes += 1;
    }

    await user.save();
    await recipe.save();

    res.status(200).json(user.likedRecipes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveReplyLike = async (req, res) => {
  try {
    const { userId, recipeId, replyId } = req.params;
    const reply = await Reply.findById(replyId);

    if (reply.likes.includes(userId)) {
      reply.likes = reply.likes.filter((id) => id !== userId);
      reply.totalLikes -= 1;
    } else {
      reply.likes.push(userId);
      reply.totalLikes += 1;
    }

    await reply.save();

    res.status(200).json(reply.likes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;
    const user = await User.findById(userId);
    const userToFollow = await User.findById(otherUserId);

    if (user.following.includes(otherUserId)) {
      user.following = user.following.filter((id) => id !== otherUserId);
      userToFollow.followers = userToFollow.followers.filter(
        (id) => id !== userId
      );
    } else {
      user.following.push(otherUserId);
      userToFollow.followers.push(userId);
    }

    await user.save();
    await userToFollow.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
