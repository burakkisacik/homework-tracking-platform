import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  collection,
  query,
  where,
  getDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import ProfileCard from "./ProfileCard";

const MyStudents = () => {
  const currentUser = useSelector((state) => state.currentUser);

  const [myStudents, setMyStudents] = useState([]);

  useEffect(() => {
    getMyStudents();
  }, []);

  const getMyStudents = async () => {
    const allMyStudents = [];
    const docRef = doc(db, "users", currentUser.id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data().students);
      for (let i = 0; i < docSnap.data().students.length; i++) {
        const studentRef = doc(db, "users", docSnap.data().students[i]);
        const studentSnap = await getDoc(studentRef);

        allMyStudents.push({
          id: docSnap.data().students[i],
          ...studentSnap.data(),
        });
      }
      setMyStudents(allMyStudents);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    console.log(myStudents);
  }, [myStudents]);

  return (
    <div className="h-full flex flex-wrap py-8 px-8 overflow-y-scroll">
      {myStudents.map((student) => (
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
  );
};

export default MyStudents;
