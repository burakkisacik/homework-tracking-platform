import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import ProfileCard from "./ProfileCard";

const MyTeachers = ({ myTeachers }) => {
  return (
    <div className="h-full flex flex-wrap py-8 px-8 overflow-y-scroll">
      {myTeachers.map((teacher) => (
        <ProfileCard
          key={teacher.id}
          id={teacher.id}
          userName={teacher.name}
          userRole={teacher.role}
          userEmail={teacher.email}
          imgSrc={teacher.profilePic}
        />
      ))}
    </div>
  );
};

export default MyTeachers;
