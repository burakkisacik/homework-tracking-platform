import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "./Navbar";
import { Link, useRouteMatch, Route } from "react-router-dom";
import MyHomeworks from "./MyHomeworks";
import MyIndividualHomework from "./MyIndividualHomework";
import MyTeachers from "./MyTeachers";
import MyIndividualTeacher from "./MyIndividualTeacher";

const StudentPage = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const { name, role, profilePic } = currentUser;
  const { url, path } = useRouteMatch();

  const [myTeachers, setMyTeachers] = useState([]);

  const getMyAllTeachers = async () => {
    const myTeacherList = [];
    const q = query(
      collection(db, "users"),
      where("students", "array-contains", currentUser.id)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      myTeacherList.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setMyTeachers(myTeacherList);
  };

  useEffect(() => {
    getMyAllTeachers();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar userName={name} userRole={role} imgSrc={profilePic} />
      <div className="flex-grow flex overflow-hidden">
        <div className="h-full flex-shrink-0 sm:w-1/5 w-1/3 flex flex-col items-center py-12 space-y-12">
          <Link
            to={`${url}/myHomeworks`}
            className="bg-buttonColor text-center truncate sm:w-2/3 w-3/4 text-white font-bold p-4 rounded-full border-2 border-buttonBorder hover:scale-110 transform hover:shadow-xl transition duration-150"
          >
            My Homeworks
          </Link>
          <Link
            to={`${url}/myTeachers`}
            className="bg-buttonColor text-center truncate sm:w-2/3 w-3/4 text-white font-bold p-4 rounded-full border-2 border-buttonBorder hover:scale-110 transform hover:shadow-xl transition duration-150"
          >
            My Teachers
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
          <Route exact path={`${path}/myHomeworks`}>
            <MyHomeworks myTeachers={myTeachers} />
          </Route>
          <Route exact path={`${path}/myHomeworks/:homeworkId`}>
            <MyIndividualHomework myTeachers={myTeachers} />
          </Route>
          <Route exact path={`${path}/myTeachers`}>
            <MyTeachers myTeachers={myTeachers} />
          </Route>
          <Route exact path={`${path}/myTeachers/:teacherId`}>
            <MyIndividualTeacher />
          </Route>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
