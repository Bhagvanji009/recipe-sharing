import { Link, useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import { auth } from "../../services/firebase";
import UploadPic from "./UploadPic";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

function ViweProfile() {
  const navigate = useNavigate();

  const [user, isLoading] = useAuthState(auth);


  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/");
    }
  }, [navigate, user, isLoading]);
  
  if (isLoading)
    return (
      <div>
        <h2>Loading......</h2>
      </div>
    );
  return (
    <div>
      <Header />
      <div className=" flex flex-col items-center gap-5 mt-10 justify-center ">
        <div className="profile-pic">
          <img
            className="h-40 w-52"
            src={!user?.photoURL ? "./profile.png" : user.photoURL}
            alt="Profile"
          />
        </div>
        <div className="user-info text-center">
          <h2>{user?.displayName}</h2>
          <p className=" italic ">
            <span className=" font-medium text-xl text-slate-950">Email :</span>
            <span className=" text-stone-700"> {user?.email}</span>
          </p>
          <p className=" italic ">
            <span className=" font-medium text-xl text-slate-950">Phone :</span>
            <span className=" text-stone-700"> {user?.phoneNumber}</span>
          </p>
        </div>
        <div className=" flex flex-col items-center justify-center gap-3 w-[40rem]">
          <div className=" border-[1px] p-1 bg-green-400">
            <Link to={"edit"}>Edit Profile</Link>
          </div>
          <UploadPic />
        </div>
      </div>
    </div>
  );
}

export default ViweProfile;
