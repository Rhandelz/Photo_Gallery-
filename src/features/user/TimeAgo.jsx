import React from "react";
import { parseISO, formatDistance } from "date-fns";

const TimeAgo = ({ dateTime }) => {
  let ago = "";

  const currentDate = new Date();

  if (dateTime) {
    const date = parseISO(dateTime);
    const time = formatDistance(date, currentDate, { addSuffix: true });

    ago = `${time}  `;
  }

  return <p>{ago}</p>;
};

export default TimeAgo;
