import {
  BsFillHouseFill,
  BsSearch,
  BsFillPlusCircleFill,
  BsFillPersonFill,
  BsFillBookmarkFill,
  BsXLg,
} from "react-icons/bs";
import Logo from "../../assets/munchy-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setRecipes } from "../../state";

const URL = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const [isMunching, setIsMunching] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipeDescription, setNewRecipeDescription] = useState("");
  const [newRecipeDifficultyLevel, setNewRecipeDifficultyLevel] = useState("");
  const [newRecipeServings, setNewRecipeServings] = useState("");
  const [newRecipePrepTime, setNewRecipePrepTime] = useState("");
  const [newRecipeCookTime, setNewRecipeCookTime] = useState("");
  const [newRecipeIngredients, setNewRecipeIngredients] = useState("");
  const [newRecipeSteps, setnewRecipeSteps] = useState("");
  const [newRecipeCalories, setnewRecipeCalories] = useState("");
  const [newRecipeProtein, setnewRecipeProtein] = useState("");
  const [newRecipeFat, setnewRecipeFat] = useState("");
  const [newRecipeCarbs, setnewRecipeCarbs] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const currentUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const currentURL = location.href;
  const splitURL = currentURL.split("/");
  const dispatch = useDispatch();

  const getRecipes = async () => {
    const response = await fetch(`${URL}/recipes`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setRecipes({ recipes: data.reverse() }));
  };

  let recipeId;
  if (splitURL[3] === "recipes") {
    recipeId = splitURL[4];
  }

  const uploadPicture = async () => {
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", import.meta.env.VITE_CLOUD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      setIsUploading(false);
      if (!isUploading) {
        await createRecipe(result.url);
        await getRecipes();
        setIsMunching(false);
      }
    } catch (error) {
      console.error("Error uploading picture:", error);
      setIsUploading(false);
    }
  };

  const createRecipe = async (recipePicture) => {
    const response = await fetch(`${URL}/recipes/create/${currentUser._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newRecipeTitle,
        description: newRecipeDescription,
        difficultyLevel: newRecipeDifficultyLevel,
        servingSize: newRecipeServings,
        preparationTime: newRecipePrepTime,
        cookingTime: newRecipeCookTime,
        ingredients: newRecipeIngredients,
        preparationInstructions: newRecipeSteps,
        calories: newRecipeCalories,
        protein: newRecipeProtein,
        fat: newRecipeFat,
        carbohydrates: newRecipeCarbs,
        pictureUrl: recipePicture,
      }),
    });
  };

  const validateForm = (e) => {
    e.preventDefault();

    // Check if all required fields are filled out
    if (
      newRecipeTitle === "" ||
      newRecipeDescription === "" ||
      newRecipeDifficultyLevel === "" ||
      newRecipeServings === "" ||
      newRecipePrepTime === "" ||
      newRecipeCookTime === "" ||
      newRecipeIngredients === "" ||
      newRecipeSteps === "" ||
      newRecipeCalories === "" ||
      newRecipeProtein === "" ||
      newRecipeFat === "" ||
      newRecipeCarbs === "" ||
      selectedFile === null
    ) {
      // Display an error message or highlight the required fields
      alert("Please fill out all the required fields");
      return;
    }

    // If all required fields are filled out, proceed with form submission
    uploadPicture();
  };

  return (
    <div className="fixed bottom-0 flex justify-around border-r-primary border-r-0 sm:border-r-0 sm:border-r-2 md:border-r-2 lg:border-r-2 md:justify-center md:gap-28 w-full p-2 bg-white items-center md:flex-col md:top-0 md:w-[30vw] md:items-start md:pl-12 lg:w-[30vw] lg:pl-[10vw]">
      <div className="flex items-center gap-2 text-lg hover:cursor-pointer select-none hidden md:flex">
        <img
          src={Logo}
          className="h-12 w-12 hover:cursor-pointer hidden md:block"
        />
        <p className="hidden md:block text-xl font-medium">Munchy</p>
      </div>
      <div
        className="flex items-center gap-2 text-lg hover:cursor-pointer select-none"
        data-te-toggle="tooltip"
        title="Home"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/home`, {
            state: {
              userId: currentUser._id,
              previousURL: currentURL,
              recipeId: recipeId,
            },
          });
        }}
      >
        <BsFillHouseFill className="h-6 w-6 hover:cursor-pointer" />
        <p className="hidden md:block">Home</p>
      </div>
      <div
        className="flex items-center gap-2 text-lg hover:cursor-pointer select-none"
        data-te-toggle="tooltip"
        title="Search"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/search`, {
            state: {
              userId: currentUser._id,
              previousURL: currentURL,
              recipeId: recipeId,
            },
          });
        }}
      >
        <BsSearch className="h-6 w-6 hover:cursor-pointer" />
        <p className="hidden md:block">Search</p>
      </div>
      <div
        className="flex items-center gap-2 text-lg md:order-1 hover:cursor-pointer select-none"
        data-te-toggle="tooltip"
        title="Munch"
        onClick={(e) => {
          setIsMunching(true);
        }}
      >
        <BsFillPlusCircleFill className="h-10 w-10 text-primary hover:cursor-pointer" />
        <p className="hidden md:block">Munch</p>
      </div>
      <div
        className="flex items-center gap-2 text-lg hover:cursor-pointer select-none"
        data-te-toggle="tooltip"
        title="Bookmarks"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/bookmarks`, {
            state: {
              userId: currentUser._id,
              previousURL: currentURL,
              recipeId: recipeId,
            },
          });
        }}
      >
        <BsFillBookmarkFill className="h-6 w-6 hover:cursor-pointer" />
        <p className="hidden md:block">Bookmarks</p>
      </div>
      <div
        className="flex items-center gap-2 text-lg hover:cursor-pointer select-none"
        data-te-toggle="tooltip"
        title="Profile"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/users/${currentUser._id}`, {
            state: {
              userId: currentUser._id,
              previousURL: currentURL,
              recipeId: recipeId,
            },
          });
        }}
      >
        <BsFillPersonFill className="h-6 w-6 hover:cursor-pointer" />
        <p className="hidden md:block">Profile</p>
      </div>
      {isMunching && (
        <div className="flex justify-center items-center">
          {/* BLUR BACKGROUND */}
          <div
            className="h-full w-full bg-gray-100 fixed top-0 left-0 opacity-40"
            onClick={(e) => {
              e.stopPropagation();
              setIsMunching(false);
            }}
          ></div>
          <div className="w-[90vw] h-[90vh] overflow-x-hidden overflow-y-auto overscroll-contain fixed top-[5vh] left-[5vw] bg-background z-1 shadow-lg rounded-md">
            <BsXLg
              className="text-2xl bg-background hover:bg-gray-100 rounded-full m-4 hover:cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsMunching(false);
              }}
            />
            <form onSubmit={validateForm}>
              <div className="ml-4 mr-4 my-2">
                <p className="text-sm font-medium">Title</p>
                <input
                  type="text"
                  className="rounded-md w-full p-1 text-sm"
                  placeholder="Title..."
                  onChange={(e) => {
                    setNewRecipeTitle(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="ml-4 mr-4 my-2">
                <p className="text-sm font-medium">Description</p>
                <textarea
                  type="text"
                  className="rounded-md w-full p-1 text-sm"
                  placeholder="Description..."
                  onChange={(e) => {
                    setNewRecipeDescription(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="ml-4 mr-4 my-2 flex items-center w-full">
                <div className="w-full">
                  <p className="text-sm font-medium">Difficulty Level</p>
                  <input
                    type="number"
                    max={10}
                    min={1}
                    className="rounded-md w-[7rem] p-1 text-sm"
                    placeholder="Difficuly Level..."
                    onChange={(e) => {
                      setNewRecipeDifficultyLevel(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="w-full">
                  <p className="text-sm font-medium">Servings</p>
                  <input
                    type="number"
                    min={1}
                    className="rounded-md w-[7rem] p-1 text-sm"
                    placeholder="Servings..."
                    onChange={(e) => {
                      setNewRecipeServings(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="ml-4 mr-4 my-2 flex items-center w-full">
                <div className="w-full">
                  <p className="text-sm font-medium">Preparation Time</p>
                  <input
                    type="number"
                    min={1}
                    className="rounded-md w-[7rem] p-1 text-sm"
                    placeholder="Preparation time..."
                    onChange={(e) => {
                      setNewRecipePrepTime(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="w-full">
                  <p className="text-sm font-medium">Cooking Time</p>
                  <input
                    type="number"
                    min={1}
                    className="rounded-md w-[7rem] p-1 text-sm"
                    placeholder="Cooking time..."
                    onChange={(e) => {
                      setNewRecipeCookTime(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="ml-4 mr-4 my-2">
                <p className="text-sm font-medium">Ingredients</p>
                <textarea
                  type="text"
                  className="rounded-md w-full p-1 text-sm"
                  placeholder="Quantity space ingredient, one per line... eg: 200g pasta"
                  onChange={(e) => {
                    setNewRecipeIngredients(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="ml-4 mr-4 my-2">
                <p className="text-sm font-medium">Preparation Instructions</p>
                <textarea
                  type="text"
                  className="rounded-md w-full p-1 text-sm"
                  placeholder="Steps, one per line..."
                  onChange={(e) => {
                    setnewRecipeSteps(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="ml-4 mr-4 my-2 flex items-center w-full">
                <div className="w-full">
                  <p className="text-sm font-medium">Calories</p>
                  <input
                    type="number"
                    className="rounded-md w-[7rem] p-1 text-sm"
                    placeholder="Calories..."
                    onChange={(e) => {
                      setnewRecipeCalories(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="w-full">
                  <p className="text-sm font-medium">Protein</p>
                  <input
                    type="number"
                    className="rounded-md w-[7rem] p-1 text-sm"
                    placeholder="Protein..."
                    onChange={(e) => {
                      setnewRecipeProtein(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="ml-4 mr-4 my-2 flex items-center w-full">
                <div className="w-full">
                  <p className="text-sm font-medium">Fat</p>
                  <input
                    type="number"
                    className="rounded-md w-[7rem] p-1 text-sm"
                    placeholder="Fat..."
                    onChange={(e) => {
                      setnewRecipeFat(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="w-full">
                  <p className="text-sm font-medium">Carbohydrates</p>
                  <input
                    type="number"
                    className="rounded-md w-[7rem] p-1 text-sm"
                    placeholder="Carbohydrates..."
                    onChange={(e) => {
                      setnewRecipeCarbs(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="ml-4 mr-4 my-2">
                <label className="text-sm font-medium" htmlFor="file_input">
                  Picture
                </label>
                <input
                  className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:border-none file:text-black file:bg-gray-200"
                  id="file_input"
                  type="file"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="ml-4 mr-4 my-4 flex justify-center items-center">
                <button
                  className=" bg-primary text-white w-full rounded-md"
                  type="submit"
                >
                  Munch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
