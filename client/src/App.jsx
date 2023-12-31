import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import RecipePage from "./scenes/recipePage";
import { useSelector } from "react-redux";
import UserProfilePage from "./scenes/userProfilePage";
import FollowingPage from "./scenes/followingPage";
import BookmarksPage from "./scenes/bookmarksPage";
import SearchPage from "./scenes/searchPage";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/recipes/:recipeId"
            element={isAuth ? <RecipePage /> : <Navigate to="/" />}
          />
          <Route
            path="/users/:userId"
            element={isAuth ? <UserProfilePage /> : <Navigate to="/" />}
          />
          <Route
            path="/users"
            element={isAuth ? <FollowingPage /> : <Navigate to="/" />}
          />
          <Route
            path="/bookmarks"
            element={isAuth ? <BookmarksPage /> : <Navigate to="/" />}
          />
          <Route
            path="/search"
            element={isAuth ? <SearchPage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
