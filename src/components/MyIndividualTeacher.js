import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/outline";
import { TrashIcon } from "@heroicons/react/outline";

const MyIndividualTeacher = () => {
  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    profilePic: "",
    role: "",
  });

  const { teacherId } = useParams();

  const getMyTeacher = async () => {
    const myTeacher = [];

    const q = query(
      collection(db, "users"),
      where(documentId(), "==", teacherId)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      myTeacher.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setTeacher({
      name: myTeacher[0].name,
      email: myTeacher[0].email,
      profilePic: myTeacher[0].profilePic,
      role: myTeacher[0].role,
    });
  };

  useEffect(() => {
    getMyTeacher();
  }, []);

  return (
    <div className="h-full w-full flex justify-between pr-12 pt-12 pl-4">
      <div className="flex-grow flex space-x-8 justify-center">
        <div>
          <img
            src={teacher.profilePic}
            alt="profile pic"
            className="w-40 h-40 rounded-full shadow-2xl"
          />
        </div>

        <div className=" flex-grow space-y-4 py-4">
          <div>
            <h1 className="font-extrabold text-xl">Name</h1>
            <h2 className="text-lg">{teacher.name}</h2>
          </div>

          <div>
            <h1 className="font-extrabold text-xl">Email</h1>
            <h2 className="text-lg">{teacher.email}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyIndividualTeacher;
