import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OTP from "./pages/OTP";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

import { getUser } from "./store/slices/authSlice";
import { fetchAllUsers } from "./store/slices/userSlice";
import { fetchAllBooks } from "./store/slices/bookSlice";
import {
  fetchAllBorrowedBooks,
  fetchUserBorrowedBooks,
} from "./store/slices/borrowSlice";

const App = () => {
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllBooks());

      if (user?.role === "User") {
        dispatch(fetchUserBorrowedBooks());
      }

      if (user?.role === "Admin") {
        dispatch(fetchAllUsers());
        dispatch(fetchAllBorrowedBooks());
      }
    }
  }, [dispatch, isAuthenticated, user?.role]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/password/forgot"
            element={<ForgotPassword />}
          />
          <Route
            path="/otp-verification/:email"
            element={<OTP />}
          />
          <Route
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
    </>
  );
};

export default App;