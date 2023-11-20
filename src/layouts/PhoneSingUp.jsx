import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";

import "react-phone-input-2/lib/style.css";

import {
  EmailAuthProvider,
  // EmailAuthProvider,
  RecaptchaVerifier,
  linkWithCredential,
  sendEmailVerification,
  // linkWithCredential,
  signInWithPhoneNumber,
  // updateEmail,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userLogin } from "../features/user/userSlice";

const PhoneSingUp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [enteredData, setEnteredData] = useState({});
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          // size: "invisible",
          // callback: (response) => {
          //   console.log(response);
          //   // onSignup();
          // },
          // "expired-callback": () => {},
        }
      );
    }
  }

  function onSignup(data) {
    const userData = {
      email: data.email,
      displayName: data.name,
    };

    setEnteredData(userData);
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+91" + data.phone;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setUser(res.user);
        setLoading(false);

        await updateProfile(auth.currentUser, {
          displayName: enteredData.displayName,
        });
        try {
          const user = auth.currentUser;

          const credential = EmailAuthProvider.credential(
            enteredData.email,
            "dummyPassword"
          );

          await sendEmailVerification(credential);
          await linkWithCredential(user, credential);

          console.log(
            "Email linked successfully. Verification email sent to:",
            user.email
          );
        } catch (error) {
          console.error("Error linking email:", error.message);
        }

        // try {

        //   const user = auth.currentUser;

        //   const credential = EmailAuthProvider.credential(
        //     enteredData.email,
        //     "dummyPassword"
        //   );

        //   await linkWithCredential(user, credential);

        //   console.log("Email linked successfully");
        // } catch (error) {
        //   console.error("Error linking email:", error.message);
        // }

        // await updateEmail(auth.currentUser, enteredData.email );
        dispatch(
          userLogin({
            uid: res.user.uid,
          })
        );
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit(onSignup)}>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsTelephoneFill size={30} />
                </div>
                <div className="font-bold text-xl text-white text-center mb-5">
                  Verify your phone number
                </div>
                <div className=" mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label htmlFor="phone" className="sm:basis-40">
                    <div className=" flex justify-between text-left capitalize">
                      Phone: <span>:</span>
                    </div>
                  </label>
                  <input
                    className="input"
                    {...register("phone", {
                      required: "pleace enter Phone number.!",
                    })}
                    id="phone"
                    name="phone"
                  />
                </div>
                <div className=" mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label htmlFor="name" className="sm:basis-40">
                    <div className=" flex justify-between text-left capitalize">
                      Fullname <span>:</span>
                    </div>
                  </label>
                  <input
                    className="input"
                    {...register("name", {
                      required: "pleace enter Your fullname.!",
                    })}
                    id="name"
                    name="name"
                  />
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
                {errors && (
                  <p className=" text-center text-red-500 mb-5">
                    {errors.phone?.message || errors.name?.message}
                  </p>
                )}

                <button className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded">
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </form>
            )}
            <Link
              to="/login"
              className="bg-emerald-900 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
            >
              <span>Login with Email </span>
            </Link>
            <Link
              to="/"
              className="bg-red-500 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
            >
              <span>Cancel </span>
            </Link>
          </div>
        )}
        <div id="recaptcha-container"></div>
      </div>
    </section>
  );
};

export default PhoneSingUp;
