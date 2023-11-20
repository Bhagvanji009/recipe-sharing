import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useDispatch } from "react-redux";
import { toggelProfile, userLogout } from "../features/user/userSlice";
import { closeRecipeList } from "../features/home/recipesSlice";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleClick() {
    await signOut(auth);
    dispatch(userLogout());
    dispatch(closeRecipeList());
    dispatch(toggelProfile());
    navigate("/");
  }

  return (
    <div>
      <button onClick={() => handleClick()}>Logout</button>
    </div>
  );
}

export default Logout;
