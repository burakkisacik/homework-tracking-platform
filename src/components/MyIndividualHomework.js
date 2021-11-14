import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
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
import { UploadIcon } from "@heroicons/react/outline";

const MyIndividualHomework = ({ myTeachers }) => {
  const currentUser = useSelector((state) => state.currentUser);

  const [selectedFile, setSelectedFile] = useState();

  const fileInputRef = useRef(null);

  const [homeworks, setHomeworks] = useState([
    {
      id: "",
      title: "",
      summary: "",
      description: "",
      file: "https://www.catholiccharitiesdc.org/wp-content/uploads/2018/09/blank-profile-picture-973460_640.png",
    },
  ]);

  const [theTeacher, setTheTeacher] = useState("Jhon Doe");

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

    for (let i = 0; i < myTeachers.length; i++) {
      if (myTeachers[i].id === homeworks[0].whoCreatedThisHW) {
        console.log("girdi");
        setTheTeacher((prevState) => myTeachers[i].name);
      }
    }

    setHomeworks(homeworkList);
  };

  useEffect(() => {
    getHomework();
  }, []);

  useEffect(() => {
    for (let i = 0; i < myTeachers.length; i++) {
      if (myTeachers[i].id === homeworks[0].whoCreatedThisHW) {
        setTheTeacher((prevState) => myTeachers[i].name);
      }
    }
  }, [homeworks]);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      console.log("file is empty");
      return;
    }
    submitMyHomeworkToDB(selectedFile);
    setSelectedFile(null);
  };

  const submitMyHomeworkToDB = async (file) => {
    await setDoc(doc(db, "homeworks", homeworkId, "submits", currentUser.id), {
      whoSubmitThisHW: currentUser.name,
      file: file,
    });
  };

  return (
    <div className="h-full w-full flex justify-between pr-12 pt-12 pl-4">
      <div className="flex-grow flex space-x-8 justify-center">
        <div className=" flex-grow space-y-4 py-4">
          <div>
            <h1 className="font-extrabold text-xl">The Teacher</h1>
            <h2 className="text-lg">{theTeacher}</h2>
          </div>
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

      <form onSubmit={handleFormSubmit} className=" w-2/3">
        <div className="space-y-10">
          {selectedFile ? (
            <img
              src={selectedFile}
              alt="no preview"
              className="w-24 h-24  rounded-full"
              onClick={() => setSelectedFile(null)}
            />
          ) : (
            <label
              htmlFor="file"
              className="bg-niceRed w-2/6 h-16 text-white flex flex-col justify-center items-center hover:scale-110 transform transition duration-150 shadow-2xl rounded-lg"
            >
              <UploadIcon className="h-8 w-8" />
              <h1>Upload A File</h1>
            </label>
          )}
          <input
            type="file"
            name="file"
            id="file"
            className="hidden"
            onChange={handleFileUpload}
            ref={fileInputRef}
          />

          <button className="bg-darkYellow w-2/6 tracking-wider shadow-2xl text-center truncate text-black font-bold p-4 rounded-full border-2 border-buttonBorder hover:scale-110 transform hover:shadow-xl transition duration-150">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyIndividualHomework;
