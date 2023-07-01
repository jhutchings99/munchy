import { BsDot } from "react-icons/bs";
import InteractionBar from "./InteractionBar";
import { useNavigate } from "react-router-dom";

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

const ReplyWidget = ({
  _id,
  replyId,
  postedBy,
  content,
  createdAt,
  recipeId,
}) => {
  const navigate = useNavigate();
  const currentURL = location.href;

  console.log(recipeId);
  return (
    <div className="border-b-[1px] border-b-primary">
      <div className="flex gap-1 m-2">
        <img
          src={postedBy.profileImage}
          alt={`${postedBy.username}'s profile image`}
          className="h-12 w-12 rounded-full hover:cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/users/${postedBy._id}`, {
              state: {
                userId: postedBy._id,
                previousURL: currentURL,
                recipeId: recipeId,
              },
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
                  state: {
                    userId: postedBy._id,
                    previousURL: currentURL,
                    recipeId: recipeId,
                  },
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
                  state: {
                    userId: postedBy._id,
                    previousURL: currentURL,
                    recipeId: recipeId,
                  },
                });
              }}
            >
              @{postedBy.username}
            </p>
            <BsDot />
            <p>{formatDate(createdAt)}</p>
          </div>
          <p className="mb-4">{content}</p>
        </div>
      </div>
      <InteractionBar replyId={replyId} />
    </div>
  );
};

export default ReplyWidget;
