import React from "react";
import { BellIcon, LogoutIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router";
import store from "../store/index";

const Navbar = ({ imgSrc, userName, userRole }) => {
  const history = useHistory();

  const handleLogOutClick = () => {
    store.dispatch({
      type: "setCurrentUser",
      currentUser: {
        id: "",
        name: "",
        email: "",
        role: "",
      },
    });
    history.push("/");
  };

  return (
    <div className="w-full flex justify-between items-center py-4  px-8 sm:px-24 shadow-lg z-50">
      <div className="flex space-x-2">
        <div className="relative h-12 w-12 sm:h-20 sm:w-20 cursor-pointer flex space-x-2 ">
          <img
            src={imgSrc}
            alt="profile"
            className="rounded-full border-2 border-niceRed "
          />
        </div>

        <div className="flex flex-col justify-around">
          <div>
            <span className="font-bold">Username : </span> {userName}
          </div>
          <div>
            <span className="font-bold">Role : </span>
            {userRole}
          </div>
        </div>
      </div>

      <div className="flex justify-between space-x-3 sm:space-x-12 font-bold text-lg">
        <BellIcon className="h-8" />
        <LogoutIcon
          className="h-8 cursor-pointer"
          onClick={handleLogOutClick}
        />
      </div>
    </div>
  );
};

Navbar.defaultProps = {
  imgSrc:
    "https://www.catholiccharitiesdc.org/wp-content/uploads/2018/09/blank-profile-picture-973460_640.png",
  userName: "John Doe",
  userRole: "Principle",
};

export default Navbar;
