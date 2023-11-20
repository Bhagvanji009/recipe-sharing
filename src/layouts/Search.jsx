import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { closeRecipeList, setQueryData } from "../features/home/recipesSlice";
// import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function Search() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const dispatch = useDispatch();
  async function onSubmit(data) {
    if (!user) {
      navigate("/login");
    }
    await dispatch(closeRecipeList());
    dispatch(setQueryData(data.query));
  }

  function onError(error) {
    toast.error(error.query.message);
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex justify-center items-center gap-2"
    >
      <label htmlFor="query"></label>
      <input
        className=" py-1 px-2"
        {...register("query", {
          required: "please enter recipe name you want...",
        })}
        type="search"
        name="query"
        id="query"
      />
      <button>Search</button>
    </form>
  );
}

export default Search;
