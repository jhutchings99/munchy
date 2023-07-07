import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import InteractionBar from "./InteractionBar";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const timeDiff = Math.abs(now - date);

  const minutesElapsed = Math.floor(timeDiff / (1000 * 60));
  const hoursElapsed = Math.floor(minutesElapsed / 60);

  let formattedDate;
  if (minutesElapsed < 60) {
    formattedDate = `${minutesElapsed}m ago`;
  } else if (hoursElapsed < 24) {
    formattedDate = `${hoursElapsed}h ago`;
  } else {
    formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  }

  return formattedDate;
};

const RecipeWidget = ({
  recipeId,
  title,
  description,
  pictureUrl,
  postedBy,
  createdAt,
  onBookmarkChange = null,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const currentURL = location.href;

  return (
    <div
      className="border-b-[1px] border-primary w-full p-2 bg-white hover:cursor-pointer hover:bg-gray-100"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/recipes/${recipeId}`, {
          state: { recipeId: recipeId, previousURL: currentURL },
        });
      }}
    >
      <div className="flex gap-1">
        <img
          src={postedBy.profileImage}
          alt={`${postedBy.username}'s profile image`}
          className="h-12 w-12 rounded-full hover:cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/users/${postedBy._id}`, {
              state: { userId: postedBy._id, previousURL: currentURL },
            });
          }}
        />
        <div>
          <div className="flex gap-1 items-center">
            <p
              className="hover:cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/users/${postedBy._id}`, {
                  state: { userId: postedBy._id, previousURL: currentURL },
                });
              }}
            >
              {postedBy.username}
            </p>
            <p
              className="hover:underline hover:cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/users/${postedBy._id}`, {
                  state: { userId: postedBy._id, previousURL: currentURL },
                });
              }}
            >
              @{postedBy.username}
            </p>
            <BsDot />
            <p>{formatDate(createdAt)}</p>
          </div>
          <p className="font-medium mb-2">{title}</p>
          <p className="mb-4">{description}</p>
          <img
            src={pictureUrl}
            alt={`Picture of ${title}`}
            className="aspect-w-16 aspect-h-9 max-w-[60vw] sm:max-w-[50vw] md:max-w-[40vw] lg:max-w-[30vw]"
          />
        </div>
      </div>
      <InteractionBar recipeId={recipeId} onBookmarkChange={onBookmarkChange} />
    </div>
  );
};

export default RecipeWidget;
