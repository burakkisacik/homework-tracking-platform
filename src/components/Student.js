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
  const [theStudent, settheStudent] = useState({
    name: "",
    email: "",
    role: "",
    id: "",
    profilePic: "",
  });

  const usersRef = collection(db, "users");

  const { studentId } = useParams();

  const getStudentById = async () => {
    const q = query(usersRef, where(documentId(), "==", studentId));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      settheStudent({
        name: doc.data().name,
        email: doc.data().email,
        role: doc.data().role,
        profilePic: doc.data().profilePic,
        id: doc.id,
      });
    });
  };

  useEffect(() => {
    getStudentById();
  }, []);

  return (
    <div className="h-full w-full flex flex-col pr-12 pt-12 pl-4">
      <div className="flex space-x-8">
        <div>
          <img
            src={theStudent.profilePic}
            alt="profile pic"
            className="w-40 h-40 rounded-full shadow-2xl"
          />
        </div>

        <div className="space-y-4 py-4">
          <div>
            <h1 className="font-extrabold text-xl">Name</h1>
            <h2 className="text-lg">{theStudent.name}</h2>
          </div>

          <div>
            <h1 className="font-extrabold text-xl">Email</h1>
            <h2 className="text-lg">{theStudent.email}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
