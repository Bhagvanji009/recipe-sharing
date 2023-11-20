import { Link } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import Logout from "./Logout";
import Profile from "../features/user/Profile";
import { toggelProfile } from "../features/user/userSlice";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [user, isLoading] = useAuthState(auth);

  return (
    <header className="h-18 border-b-2 border-green-400 p-5 bg-green-300">
      <div className="flex relative justify-between items-center">
        <Link to={"/"}>Recipe Sharing</Link>
        <div>
          <Search />
        </div>
        <div>
          {data.uid ? (
            <>
              {data.isProfileOpen ? (
                <Profile />
              ) : (
                <div className="flex gap-3 items-center">
                  <Logout />
                  <span onClick={() => dispatch(toggelProfile(true))}>
                    <img
                      className=" rounded-full  sm:w-10 z-10"
                      cursor="pointer"
                      src={!user.photoURL ? "./profile.png" : user.photoURL}
                    />
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <Link to="/login">Login</Link>
              <Link to="/signup">SignUp-Email</Link>
              <Link to="/phonesignup">Phone-Login</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
