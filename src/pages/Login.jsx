import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";

import toast from "react-hot-toast";

import { auth } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/user/userSlice";
import { useEffect } from "react";
import { BsEnvelopeAtFill } from "react-icons/bs";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user);
  useEffect(() => {
    if (userData.uid) {
      navigate("/");
    }
  }, [userData.uid, navigate]);
  async function onSubmit(data) {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      dispatch(
        userLogin({
          uid: user.user.uid,
        })
      );
      toast.success("Successfully login....");
      navigate("/");
    } catch (error) {
      const index = error.message.indexOf("/");
      toast.error(error.message.slice(index + 1).replaceAll(")", ""));
    }
  }
  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
              <BsEnvelopeAtFill size={30} />
            </div>
            <div className="font-bold text-xl text-white text-center mb-5">
              Login with Email
            </div>
            <div className=" mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label htmlFor="email" className="sm:basis-40">
                <div className=" flex justify-between text-left capitalize">
                  Email <span>:</span>
                </div>
              </label>
              <input
                className="input"
                {...register("email", {
                  required: "pleace enter Your fullname.!",
                })}
                id="email"
                name="email"
              />
            </div>
            <div className=" mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              <label htmlFor="password" className="sm:basis-40">
                <div className=" flex justify-between text-left capitalize">
                  password: <span>:</span>
                </div>
              </label>
              <input
                className="input"
                {...register("password", {
                  required: "pleace enter Phone number.!",
                })}
                id="password"
                name="password"
              />
            </div>

            <button className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded">
              <span>Login</span>
            </button>
            <div id="recaptcha-container"></div>
          </form>
          <Link
            to="/phonesignup"
            className="bg-emerald-900 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
          >
            <span>Login with Phone</span>
          </Link>
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

export default Login;
