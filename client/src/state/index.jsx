import { createSlice } from "@reduxjs/toolkit";

/* GLOBAL STATE */
const initialState = {
  user: null,
  token: null,
  recipes: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setRecipes: (state, action) => {
      state.recipes = action.payload.recipes;
    },
    setRecipe: (state, action) => {
      const updatedRecipes = state.recipes.map((recipe) => {
        if (recipe._id === action.payload.recipe._id) {
          return action.payload.recipe;
        }
        return recipe;
      });
      state.recipes = updatedRecipes;
    },
  },
});

export const { setLogin, setLogout, setRecipes, setRecipe } = authSlice.actions;
export default authSlice.reducer;
