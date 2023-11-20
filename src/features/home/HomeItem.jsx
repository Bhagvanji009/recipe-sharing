/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { setQueryData } from "./recipesSlice";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";

function HomeItem({ value }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = auth.currentUser;

  function handleClick(e) {
    if (!user) {
      navigate("/login");
    }
    dispatch(setQueryData(e.target.value));
  }
  return (
    <li className=" border-[1px] flex items-center justify-center p-4">
      <button value={value} onClick={handleClick}>
        {value}
      </button>
    </li>
  );
}

export default HomeItem;
