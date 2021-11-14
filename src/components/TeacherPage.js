import React from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import AllStudents from "./AllStudents";
import AddStudent from "./AddStudent";
import MyStudents from "./MyStudents";
import CreateHomework from "./CreateHomework";
import GivenHomeworks from "./GivenHomeworks";
import WhoSubmit from "./WhoSubmit";
import SubmitDetails from "./SubmitDetails";

const TeacherPage = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const { name, role, profilePic } = currentUser;

  const { url, path } = useRouteMatch();

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar userName={name} userRole={role} imgSrc={profilePic} />
      <div className="flex-grow flex overflow-hidden">
        <div className="h-full flex-shrink-0 sm:w-1/5 w-1/3 flex flex-col items-center py-12 space-y-12">
          <Link
            to={`${url}/addStudents`}
            className="bg-buttonColor text-center truncate sm:w-2/3 w-3/4 text-white font-bold p-4 rounded-full border-2 border-buttonBorder hover:scale-110 transform hover:shadow-xl transition duration-150"
          >
            Add Student
          </Link>
          <Link
            to={`${url}/myStudents`}
            className="bg-buttonColor text-center truncate sm:w-2/3 w-3/4 text-white font-bold p-4 rounded-full border-2 border-buttonBorder hover:scale-110 transform hover:shadow-xl transition duration-150"
          >
            My Students
          </Link>
          <Link
            to={`${url}/givenHomeworks`}
            className="bg-buttonColor text-center truncate sm:w-2/3 w-3/4 text-white font-bold p-4 rounded-full border-2 border-buttonBorder hover:scale-110 transform hover:shadow-xl transition duration-150"
          >
            Homeworks
          </Link>
          <Link
            to={`${url}/createHomework`}
            className="bg-buttonColor text-center truncate sm:w-2/3 w-3/4 text-white font-bold p-4 rounded-full border-2 border-buttonBorder hover:scale-110 transform hover:shadow-xl transition duration-150"
          >
            Create Homework
          </Link>
        </div>

        <div className="flex-grow h-full">
          <Route exact path={`${path}`}>
            <div className="h-full w-full flex flex-col items-center py-12">
              <h1 className="font-extrabold tracking-widest text-5xl text-niceRed ">
                Welcome Page
              </h1>
              <h1 className="font-extrabold tracking-widest text-5xl text-niceRed ">
                TODO: Announcements here
              </h1>
            </div>
          </Route>
          <Route exact path={`${path}/addStudents`}>
            <AllStudents />
          </Route>
          <Route exact path={`${path}/addStudents/:studentId`}>
            <AddStudent />
          </Route>
          <Route exact path={`${path}/myStudents`}>
            <MyStudents />
          </Route>
          <Route exact path={`${path}/myStudents/:studentId`}>
            <AddStudent remove={true} />
          </Route>
          <Route exact path={`${path}/givenHomeworks`}>
            <GivenHomeworks />
          </Route>
          <Route exact path={`${path}/givenHomeworks/:homeworkId`}>
            <WhoSubmit />
          </Route>
          <Route exact path={`${path}/givenHomeworks/:homeworkId/:studentId`}>
            <SubmitDetails />
          </Route>
          <Route exact path={`${path}/createHomework`}>
            <CreateHomework />
          </Route>
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;
