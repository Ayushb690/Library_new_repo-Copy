import React, { useState, useEffect } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  otpVerification,
  resetAuthSlice,
} from "../store/slices/authSlice";

import { toast } from "react-toastify";

const OTP = () => {
  const { email } = useParams();

  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();

  const { loading, error, message, user, isAuthenticated } =
    useSelector((state) => state.auth);

  const handleOtpVerification = (e) => {
    e.preventDefault();

    dispatch(otpVerification(email, otp));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading, message]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row min-h-screen">
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative">
          <Link
            to="/register"
            className="absolute top-6 left-6 text-sm font-semibold text-slate-600 hover:text-black transition"
          >
            &larr; Back to Register
          </Link>

          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-8">
              <img src={logo} alt="logo" className="h-24 w-auto object-contain" />
            </div>

            <h1 className="text-3xl font-semibold text-center mb-2 text-gray-800">
              Check your Mailbox
            </h1>

            <p className="text-gray-500 text-center mb-8 text-sm">
              We sent a verification code to <span className="font-semibold text-gray-700">{email}</span>
            </p>

            <form onSubmit={handleOtpVerification} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.trim())}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center tracking-widest text-xl font-bold focus:border-slate-600 focus:ring-1 focus:ring-slate-600 outline-none transition"
                  placeholder="Enter OTP"
                  maxLength={6}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full font-semibold bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-800 transition disabled:opacity-60 shadow-sm"
              >
                {loading ? "Verifying..." : "VERIFY OTP"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden w-full md:w-1/2 bg-slate-600 text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
          <div className="text-center max-w-sm">
            <div className="flex justify-center mb-8">
              <img src={logo_with_title} alt="logo" className="h-28 w-auto object-contain" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Almost There!</h2>
            <p className="text-gray-200 mb-8 text-sm">
              Check your inbox (or spam folder) for the 5-digit verification code to activate your account.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTP;