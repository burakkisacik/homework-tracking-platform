import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useRouteMatch, Route } from "react-router-dom";

import Navbar from "./Navbar";
import SideBar from "./SideBar";
import Teachers from "./Teachers";
import Teacher from "./Teacher";
import Student from "./Student";
import AllHomeworks from "./AllHomeworks";
import ProfileCard from "./ProfileCard";
import Homework from "./Homework";

const PrinciplePage = () => {
  const { url, path } = useRouteMatch();

  const currentUser = useSelector((state) => state.currentUser);

  const [allTeachers, setAllTeachers] = useState([]);

  const usersRef = collection(db, "users");

  const getAllTeachers = async () => {
    const teacherList = [];

    const q = query(usersRef, where("role", "==", "teacher"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      teacherList.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    console.log("teachers : ", teacherList);

    setAllTeachers(teacherList);
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  const { name, role, profilePic } = currentUser;

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar userName={name} userRole={role} imgSrc={profilePic} />
      <div className="flex-grow flex overflow-hidden">
        <div className="h-full flex-shrink-0 sm:w-1/5 w-1/3 flex flex-col items-center py-12 space-y-12">
          <Link
            to={`${url}/allTeachers`}
            className="bg-buttonColor text-center truncate sm:w-2/3 w-3/4 text-white font-bold p-4 rounded-full border-2 border-buttonBorder hover:scale-110 transform hover:shadow-xl transition duration-150"
          >
            All Teachers
          </Link>
          <Link
            to={`${url}/allHomeworks`}
            className="bg-buttonColor text-center truncate sm:w-2/3 w-3/4 text-white font-bold p-4 rounded-full border-2 border-buttonBorder hover:scale-110 transform hover:shadow-xl transition duration-150"
          >
            All HomeWorks
          </Link>
        </div>
        <div className="flex-grow h-full">
          <Route exact path={`${path}`}>
            <Teachers teachersList={allTeachers} />
          </Route>
          <Route exact path={`${path}/allTeachers`}>
            <Teachers teachersList={allTeachers} />
          </Route>
          <Route exact path={`${path}/allTeachers/:teacherId`}>
            <Teacher />
          </Route>
          <Route exact path={`${path}/allTeachers/:teacherId/:studentId`}>
            <Student />
          </Route>
          <Route exact path={`${path}/allHomeworks`}>
            <AllHomeworks />
          </Route>
          <Route exact path={`${path}/allHomeworks/:homeworkId`}>
            <Homework />
          </Route>
        </div>
      </div>
    </div>
  );
};

export default PrinciplePage;
