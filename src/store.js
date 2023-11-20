import { configureStore } from "@reduxjs/toolkit";

import recipes from "./features/home/recipesSlice";
import user from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    recipes: recipes,
    user: user,
  },
});

export default store;
