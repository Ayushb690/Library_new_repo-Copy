import React, { useEffect, useState } from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slices/popUpSlice";
const Header = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes}:${ampm}`);

      const options = { month: "short", day: "numeric", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);

  }, []);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 bg-white w-full py-3.5 px-6 shadow-sm flex justify-between items-center z-10">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar?.url || userIcon}
            alt="userAvatar"
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold sm:text-base lg:text-lg text-gray-800 leading-tight">
              {user && user.name}
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              {user && user.role}
            </span>
          </div>
        </div>
        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex flex-col text-xs lg:text-sm items-end font-semibold text-gray-700">
            <span>{currentTime}</span>
            <span className="text-gray-500 font-normal">{currentDate}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-gray-300 h-10 w-[1px]"></span>
            <img
              src={settingIcon}
              alt="settingIcon"
              className="w-7 h-7 cursor-pointer hover:rotate-45 transition-transform duration-300"
              onClick={() => dispatch(toggleSettingPopup())}
              title="Settings"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
