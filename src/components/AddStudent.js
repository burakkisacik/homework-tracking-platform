import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  collection,
  query,
  where,
  documentId,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";
import { PlusIcon } from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/outline";
import { TrashIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";

const AddStudent = ({ remove }) => {
  const currentUser = useSelector((state) => state.currentUser);

  const [isStudentAdded, setIsStudentAdded] = useState(false);

  const [student, setStudent] = useState({
    name: "",
    email: "",
    profilePic: "",
  });

  const { studentId } = useParams();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "users"), where(documentId(), "==", studentId)),
      (snapshot) => {
        //console.log(snapshot);
        setStudent(snapshot.docs[0].data());
      }
    );
    return () => unsubscribe;
  }, [db]);

  const handleAddButtonClick = () => {
    addOrRemoveStudentToTeacher();
  };

  const addOrRemoveStudentToTeacher = async () => {
    const teacherDocRef = doc(db, "users", currentUser.id);

    if (remove) {
      await updateDoc(teacherDocRef, {
        students: arrayRemove(studentId),
      });
    } else {
      await updateDoc(teacherDocRef, {
        students: arrayUnion(studentId),
      });
    }
    setIsStudentAdded(true);
  };

  return (
    <div className="h-full w-full flex justify-between pr-12 pt-12 pl-4">
      <div className="flex-grow flex space-x-8 justify-center">
        <div>
          <img
            src={student.profilePic}
            alt="profile pic"
            className="w-40 h-40 rounded-full shadow-2xl"
          />
        </div>

        <div className=" flex-grow space-y-4 py-4">
          <div>
            <h1 className="font-extrabold text-xl">Name</h1>
            <h2 className="text-lg">{student.name}</h2>
          </div>

          <div>
            <h1 className="font-extrabold text-xl">Email</h1>
            <h2 className="text-lg">{student.email}</h2>
          </div>
        </div>
      </div>

      <div className="py-4">
        <button
          onClick={handleAddButtonClick}
          className="bg-niceRed shadow-2xl w-24 h-24 flex justify-center items-center rounded-full"
        >
          {isStudentAdded ? (
            <CheckIcon className="h-12 w-12 text-white" />
          ) : remove ? (
            <TrashIcon className="h-12 w-12 text-white" />
          ) : (
            <PlusIcon className="h-12 w-12 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default AddStudent;
