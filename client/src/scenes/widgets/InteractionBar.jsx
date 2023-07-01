import {
  BsChat,
  BsHeart,
  BsHeartFill,
  BsBookmark,
  BsBookmarkFill,
  BsShare,
  BsXLg,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BACKEND_URL;

const copyUrlToClip = () => {
  const url = location.href;
  navigator.clipboard.writeText(url);
};

const InteractionBar = ({ recipeId = null, replyId = null }) => {
  const currentUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const currentURL = location.href;

  const [recipe, setRecipe] = useState(null);
  const [reply, setReply] = useState(null);

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const [isLikedReply, setIsLikedReply] = useState(false);
  const [replyLikesCount, setReplyLikesCount] = useState(0);

  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  const [isReplying, setIsReplying] = useState(false);

  const [replyText, setReplyText] = useState("");

  const handleMessageChange = (event) => {
    setReplyText(event.target.value);
  };

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

  const likeUnlikeReply = async () => {
    const response = await fetch(
      `${URL}/users/${currentUser._id}/recipes/${recipeId}/replies/${replyId}/like`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      setIsLikedReply(!isLikedReply);
      setReplyLikesCount(
        isLikedReply ? replyLikesCount - 1 : replyLikesCount + 1
      );
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

  const replyToRecipe = async (content) => {
    const response = await fetch(
      `${URL}/users/${currentUser._id}/recipes/${recipeId}/reply`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: content }),
      }
    );

    if (response.ok) {
      console.log("good");
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

  const getReply = async () => {
    const response = await fetch(
      `${URL}/recipes/${recipeId}/replies/${replyId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    return data;
  };

  const isPostLiked = async () => {
    const recipe = await getRecipe();
    return recipe.likes.includes(currentUser._id);
  };

  const isReplyLiked = async () => {
    const reply = await getReply();
    return reply.likes.includes(currentUser._id);
  };

  const isPostFavorited = async () => {
    const recipe = await getRecipe();
    return recipe.usersFavorited.includes(currentUser._id);
  };

  //   console.log(`recipeId: ${recipeId}`);
  //   console.log(`replyId: ${replyId}`);

  useEffect(() => {
    const fetchRecipeData = async () => {
      const postLiked = await isPostLiked();
      setIsLiked(postLiked);

      const postFavorited = await isPostFavorited();
      setIsFavorited(postFavorited);

      const recipe = await getRecipe();
      setLikesCount(recipe.likes.length);
      setFavoritesCount(recipe.usersFavorited.length);

      setRecipe(recipe);
    };

    const fetchReplyData = async () => {
      const replyLiked = await isReplyLiked();
      setIsLikedReply(replyLiked);

      const reply = await getReply();
      setReplyLikesCount(reply.likes.length);

      setReply(reply);
    };

    if (recipeId) {
      fetchRecipeData();
    }

    if (replyId) {
      fetchReplyData();
    }
  }, []);

  return (
    <div className="flex items-center justify-around mt-6 mb-2">
      {isReplying && (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* BLUR BACKGROUND */}
          <div
            className="h-full w-full bg-gray-100 fixed top-0 left-0 opacity-40"
            onClick={(e) => {
              e.stopPropagation();
              setIsReplying(false);
            }}
          ></div>
          {/* REPLY INPUT */}
          <div className="fixed top-[30vh] min-h-[30vh] w-[80vw] bg-background z-1 shadow-lg rounded-md p-2">
            <div className="flex justify-between m-2">
              <BsXLg
                className="text-2xl bg-background hover:bg-gray-100 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsReplying(false);
                }}
              />
              <button
                className="text-sm bg-primary text-white px-4 rounded-md"
                onClick={(e) => {
                  e.stopPropagation();
                  replyToRecipe(replyText);
                  setIsReplying(false);
                }}
              >
                Reply
              </button>
            </div>
            <div className="flex gap-2">
              <img
                src={currentUser.profileImage}
                alt={`${currentUser.username}'s profile image`}
                className="h-12 w-12 rounded-full m-2"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/users/${currentUser._id}`, {
                    state: {
                      userId: currentUser._id,
                      previousURL: currentURL,
                      recipeId: recipe._id,
                    },
                  });
                }}
              />
              <div className="w-full h-full">
                <p className="text-sm">
                  Replying to{" "}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/users/${recipe.postedBy._id}`, {
                        state: {
                          userId: recipe.postedBy._id,
                          previousURL: currentURL,
                          recipeId: recipe._id,
                        },
                      });
                    }}
                    className="hover:cursor-pointer text-blue-500"
                  >
                    @{recipe.postedBy.username}
                  </span>
                </p>
                <textarea
                  name="replyText"
                  id="replyText"
                  placeholder="Type your reply..."
                  className="w-full h-[20vh] p-1 text-sm mt-2"
                  value={replyText}
                  onChange={handleMessageChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="flex items-center gap-1 hover:cursor-pointer select-none"
        data-te-toggle="tooltip"
        title="Reply"
        onClick={(e) => {
          e.stopPropagation();
          setIsReplying(true);
          setReplyText("");
        }}
      >
        <BsChat />
        <p>20</p>
      </div>
      {recipeId && (
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
      )}
      {replyId && (
        <div
          className="flex items-center gap-1 hover:cursor-pointer select-none"
          data-te-toggle="tooltip"
          title="Like"
          onClick={(e) => {
            e.stopPropagation();
            likeUnlikeReply();
          }}
        >
          {isLikedReply ? <BsHeartFill fill="#951d4d" /> : <BsHeart />}
          <p>{replyLikesCount}</p>
        </div>
      )}
      {recipeId && (
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
        </div>
      )}
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
