import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";

const URL = import.meta.env.VITE_BACKEND_URL;

const getUser = async (URL, userId) => {
  const response = await fetch(`${URL}/users/${userId}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
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

const UserProfilePage = () => {
  const [user, setUser] = useState(null);

  const { state } = useLocation();
  const { userId } = state;

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser(URL, userId);
      setUser(userData);
    };

    fetchData();
  }, []);

  if (user === null) {
    return <div>Loading...</div>; // Render a loading message or spinner while user data is being fetched
  }

  return (
    <div className="m-2">
      <div className="flex justify-between items-center">
        <img
          src={user.profileImage}
          alt={`${user.username}'s profile image`}
          className="h-20 w-20"
        />
        <button className="bg-primary text-white rounded-md px-4 py-2 text-sm">
          Edit Profile
        </button>
      </div>
      <div className="my-4">
        <p className="font-medium text-xl">{user.username}</p>
        <p className="font-thin">@{user.username}</p>
      </div>
      <p className="text-sm">{user.bio}</p>
      <div className="flex items-center gap-2 my-5">
        <BsFillCalendarDateFill />
        <p className="text-sm font-thin">
          Joined on {formatDate(user.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default UserProfilePage;
