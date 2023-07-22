import Navbar from "../navbar";
import FeaturedRecipeWidget from "../widgets/FeaturedRecipeWidget";
import RecipesWidget from "../widgets/RecipesWidget";

const HomePage = () => {
  return (
    <div className="flex">
      <Navbar />
      <RecipesWidget />
      <FeaturedRecipeWidget />
    </div>
  );
};

export default HomePage;
