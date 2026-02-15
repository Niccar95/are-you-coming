"use client";

import { useEffect, useState } from "react";

interface DateProps {
  eventDate: Date;
}

const CountDown = ({ eventDate }: DateProps) => {
  const target = new Date(eventDate).getTime();

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
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
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
      <div className="countdown-expired">
        🎉 IT&apos;S PARTY TIME! 🎉
      </div>
    );
  }

  return (
    <div className="countdown-wrapper">
      <div className="countdown-box">
        <p className="countdown-number">{timeLeft.days}</p>
        <p className="countdown-label">Days</p>
      </div>
      <div className="countdown-box">
        <p className="countdown-number">{timeLeft.hours}</p>
        <p className="countdown-label">Hours</p>
      </div>
      <div className="countdown-box">
        <p className="countdown-number">{timeLeft.minutes}</p>
        <p className="countdown-label">Minutes</p>
      </div>
      <div className="countdown-box">
        <p className="countdown-number">{timeLeft.seconds}</p>
        <p className="countdown-label">Seconds</p>
      </div>
    </div>
  );
};
export default CountDown;
