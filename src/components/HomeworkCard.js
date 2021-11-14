import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router";

const HomeworkCard = ({
  title,
  summary,
  description,
  dueDate,
  startDate,
  id,
  timeStamp,
  file,
  open,
}) => {
  const [isExpired, setIsExpired] = useState(false);

  const finalDate = new Date(dueDate);
  const currentDate = new Date();

  const history = useHistory();

  const { url } = useRouteMatch();

  useState(() => {
    if (finalDate < currentDate) {
      setIsExpired(true);
    }
  }, []);

  const handleClick = () => {
    if (open) {
      history.push(`${url}/${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        isExpired ? "bg-niceRed" : "bg-lightYellow"
      } relative  w-48 h-56 flex flex-col justify-between py-2 items-center rounded-lg px-2 shadow-lg sm:ml-4 mt-4 hover:z-10 hover:scale-110 hover:rotate-6 transform transition duration-150`}
    >
      <div className="bg-darkYellow w-full rounded-2xl text-center shadow-lg ">
        <h1 className="font-bold text-lg truncate">{title}</h1>
      </div>
      <div className="w-full space-y-2">
        <div className="bg-darkYellow w-full rounded-2xl text-center shadow-lg ">
          <h1 className="font-bold">Start At</h1>
          <h1>{startDate}</h1>
        </div>

        <div className="bg-darkYellow w-full rounded-2xl text-center shadow-lg ">
          <h1 className="font-bold">Due Date</h1>
          <h1>{dueDate}</h1>
        </div>
      </div>
    </div>
  );
};

HomeworkCard.defaultProps = {
  open: false,
};

export default HomeworkCard;
