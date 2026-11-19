import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, Link } from "react-router-dom";

import { register, resetAuthSlice } from "../store/slices/authSlice";

import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  
  const { loading, error, message, user, isAuthenticated } =
  useSelector((state) => state.auth);
  
  const navigateTo = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password.length < 8 || password.length > 16) {
      toast.error("Password must be between 8 and 16 characters long.");
      return;
    }

    dispatch(register({ name, email, password }));
  };

  useEffect(() => {
    if (message) {
      navigateTo(`/otp-verification/${email}`);
    }

    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading, message, email, navigateTo]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* LEFT SIDE */}
        <div className="hidden w-full md:w-1/2 bg-slate-500 text-white md:flex items-center justify-center flex-col
        p-8 rounded-tr-[80px] rounded-br-[80px]">
          <div className=" text-center h-[376px]">
            <div className="flex justify-center mb-12">
              <img src={logo_with_title} alt="logo" className="mb-12 h-28 w-auto" />
            </div>

            <p className="text-gray-100 mb-12">Already have Account? Sign in now.</p>

            <Link to={"/login"} className="border-2 rounded-lg font-semibold border-white py-2 px-8
            hover:bg-white hover:text-slate-500 transition"> SIGN IN</Link>
          </div>
        </div>
        {/* right side */}
        <div className="w-full md:w-1/2 flex items-center
      justify-center bg-white p-8">
          <div className="w-full  max-w-sm">
            <div className="flex justify-center mb-12">
              <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-5">
                <h3 className="font-medium text-4xl overflow-hidden">Sign up</h3>
                <img src={logo} alt="logo" className="h-auto w-24 object-cover" />
              </div>
            </div>
            <p className="text-gray-700 text-center">
              Please provide your information to sign up.
            </p>
            <br />
            <form onSubmit={handleRegister}
            >
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-slate-600 focus:ring-1 focus:ring-slate-600 outline-none transition"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-slate-600 focus:ring-1 focus:ring-slate-600 outline-none transition"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (8-16 chars)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-slate-600 focus:ring-1 focus:ring-slate-600 outline-none transition"
                  required
                  minLength={8}
                  maxLength={16}
                />
              </div>
              <div className="block md:hidden text-center text-sm text-gray-600 mt-4">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="font-semibold text-slate-700 underline">
                    Sign In
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full font-semibold bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-800 transition disabled:opacity-60 shadow-sm"
              >
                {loading ? "Creating Account..." : "SIGN UP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
