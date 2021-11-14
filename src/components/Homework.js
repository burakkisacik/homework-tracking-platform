import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";
import { db } from "../firebase";

const MyIndividualHomework = ({ myTeachers }) => {
  const [homeworks, setHomeworks] = useState([
    {
      id: "",
      title: "",
      summary: "",
      description: "",
      file: "https://www.catholiccharitiesdc.org/wp-content/uploads/2018/09/blank-profile-picture-973460_640.png",
    },
  ]);

  const { homeworkId } = useParams();

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

  useEffect(() => {
    getHomework();
  }, []);

  return (
    <div className="h-full w-full flex justify-between pr-12 pt-12 pl-4">
      <div className="flex-grow flex space-x-8 justify-center">
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
    </div>
  );
};

export default MyIndividualHomework;
