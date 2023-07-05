import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsFillCalendarDateFill, BsArrowLeft } from "react-icons/bs";
import Navbar from "../navbar";
import UserWidget from "../widgets/UserWidget";

const getUser = async (URL, userId) => {
  const response = await fetch(`${URL}/users/${userId}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

const URL = import.meta.env.VITE_BACKEND_URL;

const extractPath = (url) => {
  const pathRegex = /^https?:\/\/[^/]+(\/[^?#]+)/;
  const matches = url.match(pathRegex);
  const path = matches ? matches[1] : null;
  return path;
};

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

const FollowingPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const currentURL = location.href;

  const { state } = useLocation();
  const { previousURL, followers } = state;

  const [isFollowersFeed, setIsFollowersFeed] = useState(followers);
  const [numFollowers, setNumFollowers] = useState(0);
  const [numFollowing, setNumFollowing] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const userInState = await getUser(URL, user._id);
      setNumFollowing(userInState.following.length);
      setNumFollowers(userInState.followers.length);
    };

    fetchData();
  });

  const handleNewFollow = async () => {
    const userInState = await getUser(URL, user._id);
    setNumFollowing(userInState.following.length);
    setNumFollowers(userInState.followers.length);
  };

  return (
    <div>
      <Navbar />
      <div className="m-2">
        <BsArrowLeft
          className="text-2xl bg-white rounded-full hover:cursor-pointer hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            navigate(extractPath(previousURL), {
              state: {
                userId: user._id,
                previousURL: currentURL,
              },
            });
          }}
        />
      </div>
      <div className="flex justify-between items-center m-2">
        <img
          src={user.profileImage}
          alt={`${user.username}'s profile image`}
          className="h-20 w-20"
        />
      </div>
      <div className="my-4 m-2">
        <p className="font-medium text-xl">{user.username}</p>
        <p className="font-thin">@{user.username}</p>
      </div>
      <p className="text-sm m-2">{user.bio}</p>
      <div className="flex items-center gap-2 my-5 m-2">
        <BsFillCalendarDateFill />
        <p className="text-sm font-thin">
          Joined on {formatDate(user.createdAt)}
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 mb-2">
        {!isFollowersFeed && (
          <div className="flex justify-center w-full gap-4 ">
            <div className="flex gap-1 hover:cursor-pointer border-b-2 border-b-primary">
              <p>{numFollowing}</p>
              <p className="font-thin">Following</p>
            </div>

            <div
              className="flex gap-1 hover:underline hover:cursor-pointer"
              onClick={() => {
                setIsFollowersFeed(true);
              }}
            >
              <p>{numFollowers}</p>
              <p className="font-thin">Followers</p>
            </div>
          </div>
        )}

        {isFollowersFeed && (
          <div className="flex justify-center w-full gap-4">
            <div
              className="flex gap-1 hover:cursor-pointer hover:underline"
              onClick={() => {
                setIsFollowersFeed(false);
              }}
            >
              <p>{numFollowing}</p>
              <p className="font-thin">Following</p>
            </div>

            <div className="flex gap-1 hover:cursor-pointer border-b-2 border-b-primary">
              <p>{numFollowers}</p>
              <p className="font-thin">Followers</p>
            </div>
          </div>
        )}
      </div>
      <div className="border-b-[1px] border-b-primary w-full"></div>
      {isFollowersFeed &&
        user.followers.map((userId, index) => {
          return (
            <UserWidget
              key={index}
              userId={userId}
              isFollowersFeed={isFollowersFeed}
              onFollow={handleNewFollow}
            />
          );
        })}

      {!isFollowersFeed &&
        user.following.map((userId, index) => {
          return (
            <UserWidget
              key={index}
              userId={userId}
              isFollowersFeed={isFollowersFeed}
              onFollow={handleNewFollow}
            />
          );
        })}
    </div>
  );
};

export default FollowingPage;
