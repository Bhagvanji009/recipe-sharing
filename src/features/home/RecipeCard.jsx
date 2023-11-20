import Digest from "./Digest";

/* eslint-disable react/prop-types */
function RecipeCard({ recipe }) {
  const recipeItem = recipe.recipe;

  return (
    <div className=" max-w-[40vw] p-3 border-[1px] items-center  flex flex-col justify-center">
      <div className="  flex gap-3">
        <div>
          <img src={recipeItem.images.REGULAR.url} />
        </div>

        <div className="flex flex-col gap-3">
          <div className=" font-extrabold">{recipeItem.label}</div>
          <div className=" text-sm text-stone-500">
            {recipeItem.healthLabels.join(" • ")}
          </div>
        </div>
      </div>
      <div className=" bg-stone-200 p-2 flex gap-3">
        <div className="flex flex-col items-center  ">
          <div className="">{recipeItem.yield} servings</div>
          <div className="mt-5 text-center">
            <span className=" font-bold text-[2rem]">
              {Math.trunc(recipeItem.calories)}
            </span>{" "}
            kcal
          </div>
        </div>
        <div className="">
          <ul className="grid grid-cols-2 gap-x-5 text-sm">
            {recipeItem.digest.slice(0, 10).map((item, i) => (
              <Digest key={i} digest={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
