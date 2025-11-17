"use client";

import { useEffect, useState } from "react";

const CountDown = () => {
  const target = new Date("Dec 6, 2025 18:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const distance = target - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft((t) => ({ ...t, expired: true }));
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        expired: false,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  if (timeLeft.expired) {
    return (
      <div className="text-3xl font-bold text-yellow-500 animate-pulse">
        🎉 IT&apos;S PARTY TIME! 🎉
      </div>
    );
  }

  return (
    <div className="flex gap-3 justify-center mt-4">
      <div className="flex flex-col items-center bg-linear-to-br from-yellow-400 to-yellow-600 rounded-lg p-3 min-w-[70px] shadow-lg">
        <p className="text-3xl font-bold text-white">{timeLeft.days}</p>
        <p className="text-xs uppercase text-yellow-100 font-semibold">
          Days
        </p>
      </div>
      <div className="flex flex-col items-center bg-linear-to-br from-yellow-400 to-yellow-600 rounded-lg p-3 min-w-[70px] shadow-lg">
        <p className="text-3xl font-bold text-white">{timeLeft.hours}</p>
        <p className="text-xs uppercase text-yellow-100 font-semibold">
          Hours
        </p>
      </div>
      <div className="flex flex-col items-center bg-linear-to-br from-yellow-400 to-yellow-600 rounded-lg p-3 min-w-[70px] shadow-lg">
        <p className="text-3xl font-bold text-white">
          {timeLeft.minutes}
        </p>
        <p className="text-xs uppercase text-yellow-100 font-semibold">
          Minutes
        </p>
      </div>
      <div className="flex flex-col items-center bg-linear-to-br from-yellow-400 to-yellow-600 rounded-lg p-3 min-w-[70px] shadow-lg">
        <p className="text-3xl font-bold text-white">
          {timeLeft.seconds}
        </p>
        <p className="text-xs uppercase text-yellow-100 font-semibold">
          Seconds
        </p>
      </div>
    </div>
  );
};
export default CountDown;
