import {
  BsChat,
  BsHeart,
  BsHeartFill,
  BsBookmark,
  BsBookmarkFill,
  BsShare,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const URL = import.meta.env.VITE_BACKEND_URL;

const copyUrlToClip = () => {
  const url = location.href;
  navigator.clipboard.writeText(url);
};

const InteractionBar = ({ recipeId }) => {
  const currentUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  const likeUnlikeRecipe = async () => {
    const response = await fetch(
      `${URL}/users/${currentUser._id}/recipes/${recipeId}/like`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    }
  };

  const favoriteUnfavoriteRecipe = async () => {
    const response = await fetch(
      `${URL}/users/${currentUser._id}/recipes/${recipeId}/favorite`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      setIsFavorited(!isFavorited);
      setFavoritesCount(isFavorited ? favoritesCount - 1 : favoritesCount + 1);
    }
  };

  const getRecipe = async () => {
    const response = await fetch(`${URL}/recipes/${recipeId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    return data;
  };

  const isPostLiked = async () => {
    const recipe = await getRecipe();
    return recipe.likes.includes(currentUser._id);
  };

  const isPostFavorited = async () => {
    const recipe = await getRecipe();
    return recipe.usersFavorited.includes(currentUser._id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const postLiked = await isPostLiked();
      setIsLiked(postLiked);

      const postFavorited = await isPostFavorited();
      setIsFavorited(postFavorited);

      const recipe = await getRecipe();
      setLikesCount(recipe.likes.length);
      setFavoritesCount(recipe.usersFavorited.length);
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-around mt-6 mb-2">
      <div
        className="flex items-center gap-1 hover:cursor-pointer select-none"
        data-te-toggle="tooltip"
        title="Reply"
      >
        <BsChat />
        <p>20</p>
      </div>
      <div
        className="flex items-center gap-1 hover:cursor-pointer select-none"
        data-te-toggle="tooltip"
        title="Like"
        onClick={(e) => {
          e.stopPropagation();
          likeUnlikeRecipe();
        }}
      >
        {isLiked ? <BsHeartFill fill="#951d4d" /> : <BsHeart />}
        <p>{likesCount}</p>
      </div>
      <div
        className="flex items-center gap-1 hover:cursor-pointer select-none"
        data-te-toggle="tooltip"
        title="Bookmark"
        onClick={(e) => {
          e.stopPropagation();
          favoriteUnfavoriteRecipe();
        }}
      >
        {isFavorited ? <BsBookmarkFill fill="#951d4d" /> : <BsBookmark />}
        <p>{favoritesCount}</p>
        {/* <BsBookmark />
        <p>20</p> */}
      </div>
      <div
        className="flex items-center gap-1 hover:cursor-pointer select-none"
        data-te-toggle="tooltip"
        title="Copy URL"
        onClick={(e) => {
          e.stopPropagation();
          copyUrlToClip();
        }}
      >
        <BsShare />
      </div>
    </div>
  );
};

export default InteractionBar;
