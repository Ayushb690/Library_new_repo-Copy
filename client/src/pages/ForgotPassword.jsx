import React, { useState, useEffect } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetAuthSlice } from "../store/slices/authSlice";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, message, error]);
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="flex flex-col justify-center md:flex-row min-h-screen">
        {/* left section */}
        <div className="hidden w-full md:w-1/2 bg-[#A74C4A] text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
          <div className="text-center max-w-sm">
            <div className="flex justify-center mb-10">
              <img src={logo_with_title} alt="logo" className="h-28 w-auto object-contain" />
            </div>
            <h3 className="text-gray-100 mb-6 text-2xl font-medium leading-relaxed">
              "One Stop Library Solution."
            </h3>
            <p className="text-gray-300 text-sm">
              Enter your registered email and we'll send you a link to reset your password.
            </p>
          </div>
        </div>
        {/* right section */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          <Link
            to="/login"
            className="absolute top-6 left-6 text-sm font-semibold text-[#A74C4A] hover:underline"
          >
            &larr; Back to Login
          </Link>
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-8">
              <img src={logo} alt="logo" className="h-24 w-auto object-contain" />
            </div>
            <h1 className="text-3xl font-semibold text-center mb-2 text-gray-800">
              Forgot Password
            </h1>
            <p className="text-gray-500 text-center mb-8 text-sm">
              Please enter your registered email address
            </p>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:border-[#A74C4A] focus:ring-1 focus:ring-[#A74C4A] outline-none transition"
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full font-semibold bg-[#A74C4A] text-white py-3 rounded-lg hover:bg-[#8f3f3e] transition disabled:opacity-60 shadow-sm"
                disabled={loading}
              >
                {loading ? "Sending Recovery Link..." : "RESET PASSWORD"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;