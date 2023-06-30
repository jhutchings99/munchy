import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../../state";
import RecipeWidget from "./RecipeWidget";
import Logo from "../../assets/munchy-logo.png";

const URL = import.meta.env.VITE_BACKEND_URL;

const RecipesWidget = ({ recipeId, isRecipe = false }) => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const token = useSelector((state) => state.token);

  const getRecipes = async () => {
    const response = await fetch(`${URL}/recipes`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setRecipes({ recipes: data }));
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-center gap-2">
        <img src={Logo} alt="Munchy Logo" className="h-10 w-10 items-center" />
        <p className="font-medium text-large">Munchy</p>
      </div>
      <div className="flex gap-24 items-center justify-center border-b-[1px] border-b-primary p-4">
        <p>For You</p>
        <p>Following</p>
      </div>
      <div>
        {recipes.map(
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
