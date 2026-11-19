import React, { useState, useEffect } from 'react';
import closeIcon from "../assets/close-square.png";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, resetAuthSlice } from "../store/slices/authSlice";
import settingIcon from "../assets/setting.png";
import { toggleSettingPopup } from '../store/slices/popUpSlice';
import { toast } from 'react-toastify';

const SettingPopup = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.auth);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("New Password and Confirm Password do not match.");
      return;
    }
    dispatch(updatePassword({ currentPassword, newPassword, confirmNewPassword }));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      dispatch(toggleSettingPopup());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, dispatch]);

  return (
    <div
      className="fixed inset-0 bg-black/60 p-5 flex items-center justify-center z-50 overflow-y-auto"
      onClick={() => dispatch(toggleSettingPopup())}
    >
      <div
        className="w-full bg-white rounded-xl shadow-2xl sm:w-auto lg:w-1/2 2xl:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <header className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-3 rounded-lg">
                <img src={settingIcon} alt="settingIcon" className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Change Password
              </h3>
            </div>
            <img
              src={closeIcon}
              alt="close-icon"
              className="w-6 h-6 cursor-pointer hover:opacity-75 transition"
              onClick={() => dispatch(toggleSettingPopup())}
            />
          </header>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password *
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password (8-16 chars) *
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition"
                required
                minLength={8}
                maxLength={16}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password *
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition"
                required
                minLength={8}
                maxLength={16}
              />
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => dispatch(toggleSettingPopup())}
                className="rounded-lg bg-gray-100 px-6 py-2.5 font-medium text-gray-700 transition hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-slate-800 px-6 py-2.5 font-medium text-white transition hover:bg-slate-900 disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingPopup;
