import React, { useState, useEffect } from "react";

const Timer = () => {
  const [remainingTime, setRemainingTime] = useState(1 * 5); // 30 minutes * 60 seconds = 1800 seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);

      if (remainingTime <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval when component unmounts
  }, []);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className="timer text-[#fff]">
      {remainingTime > 0 ? (
        <>
          <img src="/imgs/misson_clear.svg" className="w-full" />
        </>
      ) : (
        (location.href = "/kiosk")
      )}
    </div>
  );
};

export default Timer;
