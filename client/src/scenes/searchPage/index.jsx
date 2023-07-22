import Logo from "../../assets/munchy-logo.png";
import { BsSearch } from "react-icons/bs";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import RecipeWidget from "../widgets/RecipeWidget";
import { useEffect, useState } from "react";
import FeaturedRecipeWidget from "../widgets/FeaturedRecipeWidget";

const SearchPage = () => {
  const recipes = useSelector((state) => state.recipes);
  const [query, setQuery] = useState("");

  const filteredItems = [...recipes].filter((recipe) => {
    return recipe.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div>
      <div className="ml-[30vw] w-[40vw]">
        <div className=" border-b-[1px] border-b-primary">
          <div className="flex items-center justify-center gap-2">
            <img
              src={Logo}
              alt="Munchy Logo"
              className="h-10 w-10 items-center"
            />
            <p className="font-medium text-large">Munchy</p>
          </div>
          <div className="px-6">
            <div className="relative my-4 flex w-full justify-center">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-black"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full border-[1px] border-black p-4 pl-10 text-sm rounded-lg"
                placeholder="Search recipes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        {filteredItems.map(
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
      <FeaturedRecipeWidget />
      <Navbar />
    </div>
  );
};

export default SearchPage;
