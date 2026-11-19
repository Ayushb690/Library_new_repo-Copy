import React, { useState, useEffect } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, resetAuthSlice } from "../store/slices/authSlice";
import { toggleAddNewAdminPopup } from "../store/slices/popUpSlice";
import { Link, Navigate } from "react-router-dom";
import AddNewAdmin from "../popups/AddNewAdmin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const { addNewAdminPopup } = useSelector((state) => state.popup);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    dispatch(login({ email, password }));
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
  }, [message, error, dispatch]);

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row min-h-screen">
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative">
          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-8">
              <img src={logo} alt="logo" className="h-24 w-auto object-contain" />
            </div>

            <h1 className="text-3xl font-semibold text-center mb-2 text-gray-800">
              Welcome back
            </h1>

            <p className="text-gray-500 text-center mb-8 text-sm">
              Please enter your credentials to log in
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:border-slate-600 focus:ring-1 focus:ring-slate-600 outline-none transition"
                  placeholder="Email address"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:border-slate-600 focus:ring-1 focus:ring-slate-600 outline-none transition"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="flex justify-between items-center text-sm pt-1">
                <Link
                  to="/password/forgot"
                  className="font-medium text-slate-600 hover:text-black transition"
                >
                  Forgot Password?
                </Link>
                <button
                  type="button"
                  onClick={() => dispatch(toggleAddNewAdminPopup())}
                  className="font-medium text-slate-600 hover:text-black transition hover:underline"
                >
                  Admin Setup
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full font-semibold bg-slate-700 text-white py-3 rounded-lg hover:bg-slate-800 transition disabled:opacity-60 shadow-sm"
              >
                {loading ? "Signing In..." : "SIGN IN"}
              </button>
            </form>

            <div className="block md:hidden mt-8 text-center text-sm text-gray-600">
              New to Platform?{" "}
              <Link to="/register" className="font-semibold text-slate-700 underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden w-full md:w-1/2 bg-slate-600 text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
          <div className="text-center max-w-sm">
            <div className="flex justify-center mb-8">
              <img src={logo_with_title} alt="logo" className="h-28 w-auto object-contain" />
            </div>
            <h2 className="text-2xl font-bold mb-3">OUTR Library System</h2>
            <p className="text-gray-200 mb-8 text-sm">
              New to the platform? Create an account to borrow books and access catalog resources.
            </p>
            <Link
              to="/register"
              className="inline-block border-2 border-white px-8 py-2.5 font-semibold bg-white text-slate-700 rounded-lg hover:bg-transparent hover:text-white transition"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>

      {addNewAdminPopup && <AddNewAdmin />}
    </>
  );
};

export default Login;
