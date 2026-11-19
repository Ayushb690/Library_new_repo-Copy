import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useParams } from "react-router-dom";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthSlice, resetPassword } from "../store/slices/authSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams();

  const dispatch = useDispatch();
  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match.");
      return;
    }
    if (password.length < 8 || password.length > 16) {
      toast.error("Password must be between 8 and 16 characters long.");
      return;
    }
    dispatch(resetPassword({ password, confirmPassword }, token));
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
        <div className="hidden w-full md:w-1/2 bg-slate-600 text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
          <div className="text-center max-w-sm">
            <div className="flex justify-center mb-10">
              <img src={logo_with_title} alt="logo" className="h-28 w-auto object-contain" />
            </div>
            <h3 className="text-gray-100 mb-6 text-2xl font-medium leading-relaxed">
              "One Stop Library Solution."
            </h3>
            <p className="text-gray-300 text-sm">
              Create a new secure password for your account to regain access.
            </p>
          </div>
        </div>
        {/* right section */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          <Link
            to="/password/forgot"
            className="absolute top-6 left-6 text-sm font-semibold text-slate-600 hover:underline"
          >
            &larr; Back
          </Link>
          <div className="w-full max-w-sm">
            <div className="flex justify-center mb-8">
              <img src={logo} alt="logo" className="h-24 w-auto object-contain" />
            </div>
            <h1 className="text-3xl font-semibold text-center mb-2 text-gray-800">
              Reset Password
            </h1>
            <p className="text-gray-500 text-center mb-8 text-sm">
              Please enter your new password
            </p>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password (8-16 chars)"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-slate-600 focus:ring-1 focus:ring-slate-600 outline-none transition"
                  minLength={8}
                  maxLength={16}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-slate-600 focus:ring-1 focus:ring-slate-600 outline-none transition"
                  minLength={8}
                  maxLength={16}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                >
                  {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              <button
                type="submit"
                className="mt-6 w-full font-semibold bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-800 transition disabled:opacity-60 shadow-sm"
                disabled={loading}
              >
                {loading ? "Resetting Password..." : "SET NEW PASSWORD"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
