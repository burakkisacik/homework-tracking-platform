import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const SideBar = () => {
  const { url } = useRouteMatch();

  const handleTeachersClick = () => {
    console.log("teachers Clicked");
  };

  const handleAnnounceClick = () => {
    console.log("announce Clicked");
  };

  return (
    <div className="h-full sm:w-1/5 w-1/3 flex flex-col items-center py-12 space-y-12">
      <button
        onClick={handleTeachersClick}
        className="bg-buttonColor truncate sm:w-2/3 w-3/4 text-white font-bold p-4 rounded-full border-2 border-buttonBorder hover:scale-110 transform hover:shadow-xl transition duration-150"
      >
        Teachers
      </button>
      <button
        onClick={handleAnnounceClick}
        className="bg-buttonColor truncate sm:w-2/3 w-3/4 text-white font-bold p-4 rounded-full border-2 border-buttonBorder hover:scale-110 transform hover:shadow-xl transition duration-150"
      >
        Announcements
      </button>

      {/* <Link to={`${url}/teacher`}>a teacher</Link>
      <Link to={`${url}/teachers`}>all teachers</Link> */}
    </div>
  );
};

export default SideBar;
