import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
  setDoc,
  doc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { useParams } from "react-router";
import ProfileCard from "./ProfileCard";

const WhoSubmit = () => {
  const [homeworks, setHomeworks] = useState([
    {
      id: "",
      title: "",
      summary: "",
      description: "",
      file: "https://www.catholiccharitiesdc.org/wp-content/uploads/2018/09/blank-profile-picture-973460_640.png",
    },
  ]);

  const [students, setStudents] = useState([]);

  const { homeworkId } = useParams();

  useEffect(() => {
    getHomework();
  }, []);

  const getHomework = async () => {
    const homeworkList = [];
    const q = query(
      collection(db, "homeworks"),
      where(documentId(), "==", homeworkId)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      homeworkList.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setHomeworks(homeworkList);
  };

  const getStudentsThatFinished = async () => {
    const studentsIdList = [];
    const q = query(collection(db, "homeworks", homeworkId, "submits"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      studentsIdList.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    const studentsList = [];
    for (let i = 0; i < studentsIdList.length; i++) {
      const q = query(
        collection(db, "users"),
        where("name", "==", studentsIdList[i].whoSubmitThisHW)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        studentsList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    }

    setStudents(studentsList);
  };

  useEffect(() => {
    getStudentsThatFinished();
  }, [homeworks]);

  return (
    <div className="h-full w-full flex flex-col pr-12 pt-12 pl-4 ">
      <div className="flex space-x-8 justify-center ">
        <div className=" flex-grow space-y-4 py-4">
          <div>
            <h1 className="font-extrabold text-xl">Title</h1>
            <h2 className="text-lg">{homeworks[0].title}</h2>
          </div>

          <div>
            <h1 className="font-extrabold text-xl">Summary</h1>
            <h2 className="text-lg">{homeworks[0].summary}</h2>
          </div>

          <div>
            <h1 className="font-extrabold text-xl">Description</h1>
            <h2 className="text-lg">{homeworks[0].description}</h2>
          </div>

          <div>
            <h1 className="font-extrabold text-xl">Start At</h1>
            <h2 className="text-lg">{homeworks[0].startDate}</h2>
          </div>

          <div>
            <h1 className="font-extrabold text-xl">Due Date</h1>
            <h2 className="text-lg">{homeworks[0].dueDate}</h2>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-extrabold text-xl">Submitted Students : </h1>
      </div>
      <div className="h-full flex flex-wrap py-8 px-8 overflow-y-scroll">
        {students.map((student) => (
          <ProfileCard
            key={student.id}
            id={student.id}
            userName={student.name}
            userRole={student.role}
            userEmail={student.email}
            imgSrc={student.profilePic}
            open={true}
          />
        ))}
      </div>
    </div>
  );
};

export default WhoSubmit;
