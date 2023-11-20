import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../services/apiRecipes";
import RecipeCard from "../features/home/RecipeCard";

import { useDispatch, useSelector } from "react-redux";
import HomeItem from "../features/home/HomeItem";
import { closeRecipeList } from "../features/home/recipesSlice";


function Home() {
  const dispatch = useDispatch();
  const { openRecipes, query } = useSelector((state) => state.recipes);

  const {
    data = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getAllRecipes"],
    queryFn: () => {
      return getAllRecipes(query);
    },
    enabled: openRecipes,
  });

  const defaltRecipes = [
    "veg",
    "chicken",
    "Dal makhani",
    "Vada",
    " Stuffed paratha",
    "Dhokla",
    "Barfi",
    "Pani puri",
    "Idli",
    "dosa",
  ];

  const recipes = data.hits;

  if (isLoading || isFetching) {
    return (
      <div className=" font-extrabold text-2xl m-auto"> Loading......</div>
    );
  }

  return (
    <div className="w-full">
      <Header />
      <Outlet />
      {recipes?.length < 1 && (
        <div className="  my-8 text-center text-red-400 font-extrabold text-2xl m-auto">
          Not Resipe Found....pleqase try something else
        </div>
      )}
      <main className="  relative flex flex-wrap gap-4 items-center justify-center">
        {openRecipes ? (
          <>
            {recipes.length > 0 && (
              <button
                className=" absolute top-1 right-4"
                onClick={() => dispatch(closeRecipeList())}
              >
                X
              </button>
            )}
            {recipes?.map((recipe, i) => (
              <RecipeCard key={i} recipe={recipe} />
            ))}
          </>
        ) : (
          <ul className=" w-3/4 grid grid-cols-2 gap-4">
            {defaltRecipes.map((item, i) => (
              <HomeItem key={i} value={item} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default Home;
