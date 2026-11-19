import React, { useEffect } from "react";
import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import catalogIcon from "../assets/catalog.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toggleAddNewAdminPopup, toggleSettingPopup } from "../store/slices/popUpSlice";
// Added missing imports based on your function calls
import { logout, resetAuthSlice } from "../store/slices/authSlice";
import AddNewAdmin from "../popups/AddNewAdmin";
import SettingPopup from "../popups/SettingPopup";

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, selectedComponent, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const { addNewAdminPopup, settingPopup } = useSelector((state) => state.popup);
  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNavClick = (component) => {
    setSelectedComponent(component);
    if (setIsSideBarOpen) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, message]);

  return (
    <>
      {/* Mobile backdrop */}
      {isSideBarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSideBarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40 transition-transform duration-300 flex w-64 bg-slate-600 text-white flex-col h-screen overflow-y-auto shadow-xl md:shadow-none`}
      >
        <div className="px-6 py-6 my-4">
          <img src={logo_with_title} alt="Logo" className="w-auto h-16 object-contain" />
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <button
            className={`w-full py-2.5 px-3 font-medium rounded-lg hover:cursor-pointer flex items-center space-x-3 transition-colors ${
              selectedComponent === "Dashboard" ? "bg-slate-700 text-white shadow-sm" : "bg-transparent text-gray-200 hover:bg-slate-500"
            }`}
            onClick={() => handleNavClick("Dashboard")}
          >
            <img src={dashboardIcon} alt="icon" className="w-5 h-5 object-contain" />
            <span>Dashboard</span>
          </button>
          <button
            className={`w-full py-2.5 px-3 font-medium rounded-lg hover:cursor-pointer flex items-center space-x-3 transition-colors ${
              selectedComponent === "Books" ? "bg-slate-700 text-white shadow-sm" : "bg-transparent text-gray-200 hover:bg-slate-500"
            }`}
            onClick={() => handleNavClick("Books")}
          >
            <img src={bookIcon} alt="icon" className="w-5 h-5 object-contain" />
            <span>Books</span>
          </button>
          {isAuthenticated && user?.role === "Admin" && (
            <>
              <button
                className={`w-full py-2.5 px-3 font-medium rounded-lg hover:cursor-pointer flex items-center space-x-3 transition-colors ${
                  selectedComponent === "Catalog" ? "bg-slate-700 text-white shadow-sm" : "bg-transparent text-gray-200 hover:bg-slate-500"
                }`}
                onClick={() => handleNavClick("Catalog")}
              >
                <img src={catalogIcon} alt="icon" className="w-5 h-5 object-contain" />
                <span>Catalog</span>
              </button>
              <button
                className={`w-full py-2.5 px-3 font-medium rounded-lg hover:cursor-pointer flex items-center space-x-3 transition-colors ${
                  selectedComponent === "Users" ? "bg-slate-700 text-white shadow-sm" : "bg-transparent text-gray-200 hover:bg-slate-500"
                }`}
                onClick={() => handleNavClick("Users")}
              >
                <img src={usersIcon} alt="icon" className="w-5 h-5 object-contain" />
                <span>Users</span>
              </button>
              <button
                className="w-full py-2.5 px-3 font-medium bg-transparent text-gray-200 hover:bg-slate-500 rounded-lg hover:cursor-pointer flex items-center space-x-3 transition-colors"
                onClick={() => {
                  dispatch(toggleAddNewAdminPopup());
                  if (setIsSideBarOpen) setIsSideBarOpen(false);
                }}
              >
                <RiAdminFill className="text-xl" />
                <span className="whitespace-nowrap">Add new Admin</span>
              </button>
            </>
          )}
          {isAuthenticated && user?.role === "User" && (
            <button
              className={`w-full py-2.5 px-3 font-medium rounded-lg hover:cursor-pointer flex items-center space-x-3 transition-colors ${
                selectedComponent === "My Borrowed Books" ? "bg-slate-700 text-white shadow-sm" : "bg-transparent text-gray-200 hover:bg-slate-500"
              }`}
              onClick={() => handleNavClick("My Borrowed Books")}
            >
              <img src={catalogIcon} alt="icon" className="w-5 h-5 object-contain" />
              <span>My Borrowed Books</span>
            </button>
          )}
          <button
            className="w-full py-2.5 px-3 font-medium bg-transparent text-gray-200 hover:bg-slate-500 rounded-lg hover:cursor-pointer flex items-center space-x-3 transition-colors"
            onClick={() => {
              dispatch(toggleSettingPopup());
              if (setIsSideBarOpen) setIsSideBarOpen(false);
            }}
          >
            <img src={settingIcon} alt="icon" className="w-5 h-5 object-contain" />
            <span>Update Credentials</span>
          </button>
        </nav>
        <div className="px-6 py-6 border-t border-slate-500">
          <button
            className="py-2 px-4 font-medium text-center bg-transparent
           rounded-md hover:cursor-pointer hover:bg-slate-700 flex items-center
            justify-center space-x-3 mx-auto w-full transition"
            onClick={handleLogout}
          >
            <img src={logoutIcon} alt="Icon" className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
        <img
          src={closeIcon}
          alt="close"
          onClick={() => setIsSideBarOpen(false)}
          className="h-6 w-6 absolute top-5 right-4 block md:hidden cursor-pointer"
        />
      </aside>
      {addNewAdminPopup && <AddNewAdmin />
      }
      {settingPopup && <SettingPopup />}
    </>
  );
};

export default SideBar;