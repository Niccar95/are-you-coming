export type CountdownState =
  | {
      status: "upcoming";
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    }
  | { status: "started" }
  | { status: "passed" };

export const getCountdownState = (
  eventDate: Date | string,
  eventEndDate: Date | string,
  now: number,
): CountdownState => {
  const target = new Date(eventDate).getTime();
  const endTarget = new Date(eventEndDate).getTime();

  const distance = target - now;

  if (distance <= 0) {
    return now < endTarget ? { status: "started" } : { status: "passed" };
  }

  return {
    status: "upcoming",
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
};
