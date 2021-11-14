import React from "react";
import { useHistory, useRouteMatch } from "react-router";

const ProfileCard = ({ imgSrc, userName, userRole, userEmail, id, open }) => {
  const history = useHistory();

  const { url } = useRouteMatch();

  const handleClick = () => {
    if (open) {
      history.push(`${url}/${id}`);
    }
  };

  return (
    <div
      className="relative bg-lightYellow w-48 h-56 flex flex-col justify-around items-center rounded-lg px-2 shadow-lg sm:ml-4 mt-4 hover:z-10 hover:scale-110 hover:rotate-6 transform transition duration-150"
      onClick={handleClick}
    >
      <div className="">
        <img
          src={imgSrc}
          alt="profile"
          className="border-2 border-niceRed w-24 h-24 rounded-full shadow-2xl"
        />
      </div>

      <div className="bg-darkYellow w-full rounded-2xl text-center shadow-lg ">
        <h1>{userName}</h1>
      </div>

      <div className="bg-darkYellow w-full rounded-2xl text-center shadow-lg">
        <h2>{userRole}</h2>
      </div>
    </div>
  );
};

ProfileCard.defaultProps = {
  imgSrc:
    "https://www.catholiccharitiesdc.org/wp-content/uploads/2018/09/blank-profile-picture-973460_640.png",
  userName: "John Doe",
  userRole: "Principle",
  userEmail: "email@gmail.com",
  open: true,
};

export default ProfileCard;
