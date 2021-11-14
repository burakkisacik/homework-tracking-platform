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

const SubmitDetails = () => {
  const { homeworkId, studentId } = useParams();

  const [studentSubmits, setStudentSubmits] = useState([
    {
      file: "https://cdn.ceoworld.biz/wp-content/uploads/2021/03/schoolgirl-doing-homework.jpg",
      name: "Jhon Doe",
    },
  ]);

  const getSubmit = async () => {
    const submits = [];

    const q = query(
      collection(db, "homeworks", homeworkId, "submits"),
      where(documentId(), "==", studentId)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      submits.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setStudentSubmits(submits);
  };

  useEffect(() => {
    getSubmit();
  }, []);

  useEffect(() => {
    console.log(studentSubmits);
  }, [studentSubmits]);

  return (
    <div className="h-full w-full flex justify-between pr-12 pt-12 pl-4">
      <img src={studentSubmits[0].file} alt="file" className="h-1/3" />
    </div>
  );
};

export default SubmitDetails;
