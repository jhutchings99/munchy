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
  const [userInState, setUserInState] = useState(null);
  const currentURL = location.href;

  const { state } = useLocation();
  const { previousURL, followers } = state;

  const [isFollowersFeed, setIsFollowersFeed] = useState(followers);
  const [numFollowers, setNumFollowers] = useState(0);
  const [numFollowing, setNumFollowing] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const userInState = await getUser(URL, user._id);
      setUserInState(userInState);
      setNumFollowing(userInState.following.length);
      setNumFollowers(userInState.followers.length);
    };

    fetchData();
  }, []);

  const handleNewFollow = async () => {
    const userInState = await getUser(URL, user._id);
    setUserInState(userInState);
    setNumFollowing(userInState.following.length);
    setNumFollowers(userInState.followers.length);
  };

  if (userInState === null) {
    return (
      <div role="status" className=" w-full flex items-center justify-center">
        <svg
          aria-hidden="true"
          className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="">Loading...</span>
      </div>
    );
  }

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
        userInState.followers.map((userId, index) => {
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
        userInState.following.map((userId, index) => {
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
