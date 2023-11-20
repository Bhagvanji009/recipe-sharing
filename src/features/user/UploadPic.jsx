import "../../services/firebase";
import { useForm } from "react-hook-form";

import { auth, storage } from "../../services/firebase";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UploadPic() {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();


  async function onPhotoUpload(data) {
    try {
      const path = `images/${user.displayName}-profile`;
      const pathRef = ref(storage, path);
      uploadBytes(pathRef, data.photoURL[0]).then((data) => {
        console.log("Uploaded a file!", data);
      });

      const url = await getDownloadURL(pathRef);
      await updateProfile(auth.currentUser, {
        photoURL: url,
      });

      toast.success("Profile pic updated Successfully....");

      navigate("/profile");
    } catch (error) {
     
      const index = error.message.indexOf("/");
      toast.error(error.message.slice(index + 1).replaceAll(")", ""));
    } finally {
      reset();
    }
  }
  return (
    <div className={`flex items-center ${isSubmitting ? "opacity-60" : ""} `}>
      <form
        className="flex items-center "
        onSubmit={handleSubmit(onPhotoUpload)}
      >
        <div>
          <input
            // hidden
            {...register("photoURL", { required: "please select pic" })}
            type="file"
            name="photoURL"
            id="photoURL"
          />
          <p className=" text-red-500">
            {errors ? errors?.photoURL?.message : ""}
          </p>
        </div>
        <button className=" border-[1px] p-1 bg-stone-400" disabled={isSubmitting}>Upload Pic</button>
      </form>
    </div>
  );
}

export default UploadPic;
