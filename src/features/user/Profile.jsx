import {
  useDispatch,
  // useSelector
} from "react-redux";
import Logout from "../../layouts/Logout";
import { toggelProfile } from "./userSlice";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Profile() {
  const [user, isLoading] = useAuthState(auth);

  const { displayName: name, email } = auth.currentUser;
  const dispatch = useDispatch();
  return (
    <div
      className=" z-10 w-96 flex items-center flex-col h-96
     absolute -right-5  -top-5  bg-slate-300"
    >
      <div className="absolute w-full h-32 flex items-start bg-slate-500">
        <span onClick={() => dispatch(toggelProfile(false))}> &larr; Back</span>
      </div>
      <img
        className=" rounded-full w-28 sm:w-40 z-10 mt-20"
        cursor="pointer"
        src={isLoading && !user.photoURL ? "./profile.png" : user.photoURL}
      />

      <div className="flex flex-col items-center justify-center">
        <h2 className=" capitalize">{name}</h2>
        <h3>{email}</h3>

        <Logout />
        <Link onClick={() => dispatch(toggelProfile(false))} to={`/profile`}>
          View Profile
        </Link>
      </div>
    </div>
  );
}

export default Profile;
