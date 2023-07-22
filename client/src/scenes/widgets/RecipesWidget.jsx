import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../../state";
import RecipeWidget from "./RecipeWidget";
import Logo from "../../assets/munchy-logo.png";

const URL = import.meta.env.VITE_BACKEND_URL;

const getUser = async (URL, userId) => {
  const response = await fetch(`${URL}/users/${userId}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

const RecipesWidget = ({ recipeId, isRecipe = false }) => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const token = useSelector((state) => state.token);
  const currentUser = useSelector((state) => state.user);

  const [isFollowingFeed, setIsFollowingFeed] = useState(false);
  const [user, setUser] = useState(null);

  const getRecipes = async () => {
    const response = await fetch(`${URL}/recipes`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setRecipes({ recipes: data.reverse() }));
  };

  const getRecipe = async () => {
    const response = await fetch(`${URL}/recipes/${recipeId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setRecipes({ recipes: data }));
  };

  useEffect(() => {
    if (isRecipe) {
      getRecipe();
    } else {
      getRecipes();
    }

    const fetchData = async () => {
      const userData = await getUser(URL, currentUser._id);
      setUser(userData);
    };

    fetchData();
  }, []);

  if (user === null) {
    return (
      <div
        role="status"
        className=" w-full h-screen flex items-center justify-center"
      >
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

  let followingFeed = [];
  for (const recipe of recipes) {
    for (const userId of user.following) {
      if (!followingFeed.includes(recipe._id)) {
        if (recipe.postedBy._id === userId) {
          followingFeed.push(recipe);
        }
      }
    }
  }

  return (
    <div className="flex flex-col w-full h-full mb-24 md:ml-[30vw] lg:w-[40vw] lg:ml-[30vw]">
      <div className="flex items-center justify-center gap-2">
        <img src={Logo} alt="Munchy Logo" className="h-10 w-10 items-center" />
        <p className="font-medium text-large">Munchy</p>
      </div>
      {!isFollowingFeed && (
        <div className="flex gap-24 items-center justify-center border-b-[1px] border-b-primary p-4">
          <p className="border-b-2 border-b-primary hover:cursor-pointer">
            For You
          </p>
          <p
            onClick={(e) => {
              e.stopPropagation();
              setIsFollowingFeed(true);
            }}
            className="hover:cursor-pointer"
          >
            Following
          </p>
        </div>
      )}
      {isFollowingFeed && (
        <div className="flex gap-24 items-center justify-center border-b-[1px] border-b-primary p-4">
          <p
            onClick={(e) => {
              e.stopPropagation();
              setIsFollowingFeed(false);
            }}
            className="hover:cursor-pointer"
          >
            For You
          </p>
          <p className="border-b-2 border-b-primary hover:cursor-pointer">
            Following
          </p>
        </div>
      )}
      <div>
        {!isFollowingFeed &&
          recipes.map(
            ({ _id, title, description, pictureUrl, postedBy, createdAt }) => (
              <RecipeWidget
                key={_id}
                recipeId={_id}
                title={title}
                pictureUrl={pictureUrl}
                postedBy={postedBy}
                createdAt={createdAt}
                description={description}
              />
            )
          )}
        {isFollowingFeed &&
          followingFeed.map(
            ({ _id, title, description, pictureUrl, postedBy, createdAt }) => (
              <RecipeWidget
                key={_id}
                recipeId={_id}
                title={title}
                pictureUrl={pictureUrl}
                postedBy={postedBy}
                createdAt={createdAt}
                description={description}
              />
            )
          )}
      </div>
    </div>
  );
};

export default RecipesWidget;
