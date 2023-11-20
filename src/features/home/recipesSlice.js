import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  query: "",
  openRecipes:false
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setQueryData(state, { payload }) {
      state.query = payload;
      state.openRecipes=true
    },
    closeRecipeList(state){
        state.query=''
        state.openRecipes=false
    }
  },
});


export const {setQueryData,closeRecipeList}=recipesSlice.actions
export default recipesSlice.reducer