import { describe, it, expect } from "vitest";
import { getCountdownState } from "./countdown";

const storedStart = new Date("2027-10-28T21:00:00.000Z");
const storedEnd = new Date("2027-10-28T23:00:00.000Z");

const start = storedStart.getTime();
const end = storedEnd.getTime();

const SECOND = 1000;

describe("getCountdownState", () => {
  it("returns started when now is exactly the start time", () => {
    const result = getCountdownState(storedStart, storedEnd, start);

    expect(result.status).toBe("started");
  });

  it("Event countdown status is upcoming one second before the start", () => {
    const result = getCountdownState(storedStart, storedEnd, start - SECOND);

    expect(result.status).toBe("upcoming");
  });

  it("Status stays as started one second before the end", () => {
    const result = getCountdownState(storedStart, storedEnd, end - SECOND);

    expect(result.status).toBe("started");
  });

  it("returns passed when now is exactly the end time", () => {
    const result = getCountdownState(storedStart, storedEnd, end);

    expect(result.status).toBe("passed");
  });

  it("calculates remaining days, hours, minutes and seconds correctly", () => {
    const now = start - (2 * 86400000 + 3 * 3600000 + 15 * 60000 + 20 * SECOND);

    const result = getCountdownState(storedStart, storedEnd, now);

    expect(result).toEqual({
      status: "upcoming",
      days: 2,
      hours: 3,
      minutes: 15,
      seconds: 20,
    });
  });

  it("returns passed after the event has ended", () => {
    const result = getCountdownState(storedStart, storedEnd, end + SECOND);

    expect(result.status).toBe("passed");
  });
});
