import Navbar from "../navbar";
import RecipesWidget from "../widgets/RecipesWidget";

const HomePage = () => {
  return (
    <div className="flex">
      <Navbar />
      <RecipesWidget />
    </div>
  );
};

export default HomePage;
