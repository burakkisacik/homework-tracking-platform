import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import HomeworkCard from "./HomeworkCard";

const GivenHomeworks = () => {
  const [givenHomeworks, setGivenHomeworks] = useState([]);

  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "homeworks"),
        where("whoCreatedThisHW", "==", currentUser.id)
      ),
      (snapshot) => {
        setGivenHomeworks(snapshot.docs);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="h-full flex flex-wrap py-8 px-8 overflow-y-scroll">
      {givenHomeworks.map((hw) => (
        <HomeworkCard
          key={hw.id}
          id={hw.id}
          title={hw.data().title}
          summary={hw.data().summary}
          description={hw.data().description}
          dueDate={hw.data().dueDate}
          startDate={hw.data().startDate}
          timeStamp={hw.data().timeStamp}
          file={hw.data().homeworkFile}
          open={true}
        />
      ))}
    </div>
  );
};

export default GivenHomeworks;
