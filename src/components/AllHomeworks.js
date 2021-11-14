import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import HomeworkCard from "./HomeworkCard";

const AllHomeworks = () => {
  const [allHomeworks, setAllHomeworks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "homeworks")),
      (snapshot) => {
        setAllHomeworks(snapshot.docs);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="h-full flex flex-wrap py-8 px-8 overflow-y-scroll">
      {allHomeworks.map((homework) => (
        <HomeworkCard
          key={homework.id}
          id={homework.id}
          title={homework.data().title}
          summary={homework.data().summary}
          description={homework.data().description}
          dueDate={homework.data().dueDate}
          startDate={homework.data().startDate}
          timeStamp={homework.data().timeStamp}
          file={homework.data().file}
          open={true}
        />
      ))}
    </div>
  );
};

export default AllHomeworks;
