import React, { useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import HomeworkCard from "./HomeworkCard";

const MyHomeworks = ({ myTeachers }) => {
  const [homeworks, setHomeworks] = React.useState([]);

  const getMyAllHomeworks = async () => {
    const myHomeworks = [];
    for (let i = 0; i < myTeachers.length; i++) {
      const q = query(
        collection(db, "homeworks"),
        where("whoCreatedThisHW", "==", myTeachers[i].id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        myHomeworks.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    setHomeworks(myHomeworks);
  };

  useEffect(() => {
    if (myTeachers) {
      getMyAllHomeworks();
    }
  }, []);

  return (
    <div className="h-full flex flex-wrap py-8 px-8 overflow-y-scroll">
      {homeworks.map((hw) => (
        <HomeworkCard
          key={hw.id}
          id={hw.id}
          title={hw.title}
          summary={hw.summary}
          description={hw.description}
          dueDate={hw.dueDate}
          startDate={hw.startDate}
          timeStamp={hw.timeStamp}
          file={hw.homeworkFile}
          open={true}
        />
      ))}
    </div>
  );
};

export default MyHomeworks;
