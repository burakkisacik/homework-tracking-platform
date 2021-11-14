import React, { useState, useRef, useEffect } from "react";
import { UploadIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { useSelector } from "react-redux";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { useHistory, useRouteMatch } from "react-router";

const CreateHomework = () => {
  const currentUser = useSelector((state) => state.currentUser);

  const [selectedFile, setSelectedFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileLoadingState, setFileLoadingState] = useState("");

  const history = useHistory();
  const { url } = useRouteMatch();

  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };

    reader.onloadstart = (readerEvent) => {
      setFileLoadingState("start");
    };

    reader.onloadend = (readerEvent) => {
      setFileLoadingState("end");
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, summary, description, startDate, dueDate } =
      e.target.elements;

    console.log("submit");

    uploadHomework(
      title.value,
      summary.value,
      description.value,
      startDate.value,
      dueDate.value,
      selectedFile
    );

    title.value = "";
    summary.value = "";
    description.value = "";
    startDate.value = "";
    dueDate.value = "";
    setSelectedFile(null);

    history.push(`/teacher/${currentUser.id}/givenHomeworks`);
  };

  const uploadHomework = async (
    title,
    summary,
    description,
    startDate,
    dueDate,
    file
  ) => {
    if (loading) return;

    setLoading(true);

    console.log("run");

    const docRef = await addDoc(collection(db, "homeworks"), {
      whoCreatedThisHW: currentUser.id,
      timeStamp: serverTimestamp(),
      title,
      summary,
      description,
      startDate,
      dueDate,
    });

    if (file) {
      const fileRef = ref(storage, `homeworks/${docRef.id}/file`);

      await uploadString(fileRef, file, "data_url").then(async (snapshot) => {
        const downloadURL = await getDownloadURL(fileRef);
        await updateDoc(doc(db, "homeworks", docRef.id), {
          homeworkFile: downloadURL,
        });
      });
    }

    setLoading(false);
  };

  return (
    <div className=" h-full w-full pl-4 pt-4 flex flex-col justify-between">
      <h1 className="text-2xl tracking-wider text-niceRed font-extrabold">
        Create Homework
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex-grow flex flex-col  pt-4 pl-2 space-y-2"
      >
        <label htmlFor="title" className="text-lg font-bold tracking-wide">
          HomeWork Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter title"
          className="h-8 outline-none pl-2 rounded-lg shadow-2xl w-1/3"
        />
        <label htmlFor="summary" className="text-lg font-bold tracking-wide">
          Summary
        </label>
        <input
          type="text"
          name="summary"
          id="summary"
          placeholder="Enter homework summary"
          className="h-8 outline-none pl-2 rounded-lg shadow-2xl w-4/5"
        />
        <label
          htmlFor="description"
          className="text-lg font-bold tracking-wide"
        >
          HomeWork Description
        </label>
        <textarea
          name="description"
          id="description"
          rows={5}
          placeholder="Enter homework description"
          className="outline-none rounded-lg shadow-lg w-4/5 resize-none p-2"
        />
        <div className="flex w-4/5">
          <div className="flex flex-col space-y-2  w-1/3 ">
            <label
              htmlFor="startDate"
              className="text-lg font-bold tracking-wide"
            >
              Start At
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="h-8 outline-none pl-2 rounded-lg shadow-2xl w-2/3"
            />
            <label
              htmlFor="dueDate"
              className="text-lg font-bold tracking-wide"
            >
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              className="h-8 outline-none pl-2 rounded-lg shadow-2xl w-2/3"
            />
          </div>
          <div className="flex justify-center items-center w-2/3">
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
          </div>
        </div>

        <div className="h-24 py-4">
          <button className="bg-darkYellow tracking-wider shadow-2xl text-center truncate sm:w-1/6 w-3/4 text-black font-bold p-4 rounded-full border-2 border-buttonBorder hover:scale-110 transform hover:shadow-xl transition duration-150">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateHomework;
