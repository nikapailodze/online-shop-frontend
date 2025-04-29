"use client";
import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // This only runs on client side
    const updateTime = () => {
      setTime(new Date());
    };

    updateTime(); // set immediately
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  if (!time) return null; // Don't render anything until client loaded

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <p>{formatTime(time)}</p>
  );
};

export default Clock;
