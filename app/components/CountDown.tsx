"use client";

import { useEffect, useState } from "react";
import { formatUtcToLocal } from "../utils/dateTimeFormatters";
import { getCountdownState } from "../utils/countdown";

interface DateProps {
  eventDate: Date;
  eventEndDate: Date;
}

const CountDown = ({ eventDate, eventEndDate }: DateProps) => {
  const endTarget = formatUtcToLocal(eventEndDate).getTime();

  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= endTarget) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTarget]);

  if (now === null) return null;

  const state = getCountdownState(eventDate, eventEndDate, now);

  if (state.status === "started") {
    return <div className="countdown-expired">EVENT HAS STARTED</div>;
  }
  if (state.status === "passed") {
    return <div className="countdown-expired">EVENT HAS PASSED</div>;
  }

  if (state.status === "upcoming") {
    const { days, hours, minutes, seconds } = state;

    return (
      <div className="countdown-wrapper">
        <div className="countdown-box">
          <p className="countdown-number">{days}</p>
          <p className="countdown-label">Days</p>
        </div>
        <div className="countdown-box">
          <p className="countdown-number">{hours}</p>
          <p className="countdown-label">Hours</p>
        </div>
        <div className="countdown-box">
          <p className="countdown-number">{minutes}</p>
          <p className="countdown-label">Minutes</p>
        </div>
        <div className="countdown-box">
          <p className="countdown-number">{seconds}</p>
          <p className="countdown-label">Seconds</p>
        </div>
      </div>
    );
  }

  return null;
};

export default CountDown;
