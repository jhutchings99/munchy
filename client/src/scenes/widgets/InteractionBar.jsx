import {
  BsChat,
  BsHeart,
  BsHeartFill,
  BsBookmark,
  BsBookmarkFill,
  BsShare,
} from "react-icons/bs";

const copyUrlToClip = () => {
  const url = location.href;
  navigator.clipboard.writeText(url);
};

const InteractionBar = () => {
  return (
    <div className="flex items-center justify-around mt-6 mb-2">
      <div
        className="flex items-center gap-1 hover:cursor-pointer"
        data-te-toggle="tooltip"
        title="Reply"
      >
        <BsChat />
        <p>20</p>
      </div>
      <div
        className="flex items-center gap-1 hover:cursor-pointer"
        data-te-toggle="tooltip"
        title="Like"
      >
        <BsHeart />
        <p>200</p>
      </div>
      <div
        className="flex items-center gap-1 hover:cursor-pointer"
        data-te-toggle="tooltip"
        title="Bookmark"
      >
        <BsBookmark />
        <p>20</p>
      </div>
      <div
        className="flex items-center gap-1 hover:cursor-pointer"
        data-te-toggle="tooltip"
        title="Copy URL"
        onClick={() => {
          copyUrlToClip();
        }}
      >
        <BsShare />
      </div>
    </div>
  );
};

export default InteractionBar;
