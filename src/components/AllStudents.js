import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import ProfileCard from "./ProfileCard";

const AllStudents = () => {
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "users"), where("role", "==", "student")),
      (snapshot) => {
        setAllStudents(snapshot.docs);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="h-full flex flex-wrap py-8 px-8 overflow-y-scroll">
      {allStudents.map((teacher) => (
        <ProfileCard
          key={teacher.id}
          id={teacher.id}
          userName={teacher.data().name}
          userRole={teacher.data().role}
          userEmail={teacher.data().email}
          imgSrc={teacher.data().profilePic}
        />
      ))}
    </div>
  );
};

export default AllStudents;
