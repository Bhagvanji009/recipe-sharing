import { useForm } from "react-hook-form";
import {
  // RecaptchaVerifier,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../services/firebase";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "firebase/firestore";


function SignUp() {
  const [user, isLoading] = useAuthState(auth);
  const { register, handleSubmit } = useForm({ defaultValues: user });

  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      if (!user) {
        if (data.password !== data.confirmPassword) {
          toast.error("password does not match ! please try again");
        }
        await createUserWithEmailAndPassword(auth, data.email, data.password);

        await updateProfile(auth.currentUser, {
          displayName: data.displayName,
        });

        toast.success("Successfully Register....");
        navigate("/login");
      } else {
        await updateProfile(auth.currentUser, {
          displayName: data.displayName,
        });
        toast.success("Profile Updated successfully....");
        navigate("/");
      }
    } catch (error) {
      const index = error.message.indexOf("/");
      toast.error(error.message.slice(index + 1).replaceAll(")", ""));
    }
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div id="recaptcha-container"></div>
      <div>
        <div className="w-[30rem] flex flex-col gap-4 rounded-lg p-4">
          <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
            {!user && !isLoading ? "Register" : "Update Profile"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
          
       
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label htmlFor="displayName" className="sm:basis-40">
                Name :
              </label>
              <input
                {...register("displayName", {
                  required: "please enter your full name",
                })}
                placeholder="full name"
                className="input grow"
                type="text"
                name="displayName"
                id="displayName"
                required
              />
            </div>
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="phone" className="sm:basis-40">
            Phone
          </label>
          <input
            {...register("phone", { required: "please enter phone number" })}
            className="input grow"
            type="tel"
            name="phone"
            id="phone"
            required
          />
        </div>

            {!user && !isLoading && (
              <>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label htmlFor="email" className="sm:basis-40">
                    Email
                  </label>
                  <input
                    {...register("email", { required: "please enter Email" })}
                    className="input grow"
                    type="email"
                    name="email"
                    id="email"
                    required
                  />
                </div>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label htmlFor="password" className="sm:basis-40">
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: "please Enter password",
                    })}
                    defaultValue="123456"
                    className="input grow"
                    type="password"
                    name="password"
                    id="password"
                    required
                  />
                </div>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label htmlFor="confirmPassword" className="sm:basis-40">
                    Confirm Password
                  </label>
                  <input
                    {...register("confirmPassword", {
                      required: true,
                    })}
                    defaultValue="123456"
                    className="input grow"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                  />
                </div>
                <button className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded">
                  <span>  {!user && !isLoading ? "Register" : "Update Profile"}</span>
                </button>
              </>
            )}
          </form>
        
          <Link
            to="/"
            className="bg-red-500 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
          >
            <span>Cancel </span>
          </Link>
        </div>
      </div>
    </section>
   
  );
}

export default SignUp;
