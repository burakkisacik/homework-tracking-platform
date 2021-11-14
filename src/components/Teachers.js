import React from "react";
import ProfileCard from "./ProfileCard";

const Teachers = ({ teachersList }) => {
  return (
    <div className="h-full flex flex-wrap py-8 px-8 overflow-y-scroll">
      {teachersList.map((teacher) => (
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

export default Teachers;
