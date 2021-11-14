import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  documentId,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router";
import { CheckIcon } from "@heroicons/react/outline";
import ProfileCard from "./ProfileCard";

const Teacher = () => {
  const [theTeacher, setTheTeacher] = useState({
    name: "",
    email: "",
    role: "",
    id: "",
  });

  const [allStudentsOfThisTeacher, setAllStudentsOfThisTeacher] = useState([]);

  const usersRef = collection(db, "users");

  const { teacherId } = useParams();

  const getTeacherById = async () => {
    const q = query(usersRef, where(documentId(), "==", teacherId));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setTheTeacher({
        name: doc.data().name,
        email: doc.data().email,
        role: doc.data().role,
        profilePic: doc.data().profilePic,
        id: doc.id,
      });
    });
  };

  useEffect(() => {
    getTeacherById();
  }, []);

  const getAllStudentsOfThisTeacher = async () => {
    const allStudents = [];
    const docRef = doc(db, "users", teacherId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      for (let i = 0; i < docSnap.data().students.length; i++) {
        const studentRef = doc(db, "users", docSnap.data().students[i]);
        const studentSnap = await getDoc(studentRef);

        allStudents.push({
          id: docSnap.data().students[i],
          ...studentSnap.data(),
        });
      }
      setAllStudentsOfThisTeacher(allStudents);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getAllStudentsOfThisTeacher();
  }, [theTeacher]);

  return (
    <div className="h-full w-full flex flex-col pr-12 pt-12 pl-4">
      <div className="flex space-x-8">
        <div>
          <img
            src={theTeacher.profilePic}
            alt="profile pic"
            className="w-40 h-40 rounded-full shadow-2xl"
          />
        </div>

        <div className="space-y-4 py-4">
          <div>
            <h1 className="font-extrabold text-xl">Name</h1>
            <h2 className="text-lg">{theTeacher.name}</h2>
          </div>

          <div>
            <h1 className="font-extrabold text-xl">Email</h1>
            <h2 className="text-lg">{theTeacher.email}</h2>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap py-8 px-8 overflow-y-scroll">
        {allStudentsOfThisTeacher.map((student) => (
          <ProfileCard
            key={student.profilePic}
            id={student.id}
            userName={student.name}
            userRole={student.role}
            userEmail={student.email}
            imgSrc={student.profilePic}
          />
        ))}
      </div>
    </div>
  );
};

export default Teacher;
