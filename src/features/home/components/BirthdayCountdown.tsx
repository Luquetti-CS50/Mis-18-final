// src/features/home/components/BirthdayCountdown.tsx
import React, { useEffect, useState } from "react";
import { calculateTimeLeft, TimeLeft } from "../../../lib/utils/date";

const TARGET_DATE = new Date("2025-12-27T00:00:00");

export const BirthdayCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(TARGET_DATE)
  );

  useEffect(() => {
    const update = () => setTimeLeft(calculateTimeLeft(TARGET_DATE));

    const intervalMs =
      timeLeft.total <= 24 * 60 * 60 * 1000 ? 1000 : 60 * 1000;

    const id = setInterval(update, intervalMs);
    return () => clearInterval(id);
  }, [timeLeft.total]);

  if (timeLeft.total <= 0) {
    return (
      <div className="mt-2 text-sm text-emerald-300">
        ¡Ya es el día! 🎉
      </div>
    );
  }

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
