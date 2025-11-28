// src/features/home/components/BirthdayCountdown.tsx
import React, { useEffect, useState } from "react";
import { calculateTimeLeft, TimeLeft } from "../../../lib/utils/date";

// 26/12/2025 a las 21:00 hs (hora local del navegador)
const TARGET_DATE = new Date("2025-12-26T21:00:00");

export const BirthdayCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(TARGET_DATE)
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(TARGET_DATE));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="mt-2 text-xs text-cyan-200/80">
      Faltan{" "}
      <span className="font-mono">
        {timeLeft.days}d {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:
        {pad(timeLeft.seconds)}
      </span>{" "}
      para la fiesta 🎂
    </div>
  );
};
