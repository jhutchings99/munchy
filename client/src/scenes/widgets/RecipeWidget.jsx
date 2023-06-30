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
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  return (
    <div className="border-b-[1px] border-primary w-full p-2">
      <div className="flex gap-1">
        <img
          src={postedBy.profileImage}
          alt={`${postedBy.username}'s profile image`}
          className="h-12 w-12 rounded-full"
        />
        <div>
          <div className="flex gap-1 items-center">
            <p>{postedBy.username}</p>
            <p
              className="hover:underline hover:cursor-pointer"
              onClick={() => {
                navigate(`/users/${postedBy._id}`, {
                  state: { userId: postedBy._id },
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
            className="aspect-w-16 aspect-h-9"
          />
        </div>
      </div>
      <InteractionBar />
    </div>
  );
};

export default RecipeWidget;
