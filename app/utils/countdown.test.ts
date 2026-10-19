import { describe, it, expect } from "vitest";
import { getCountdownState } from "./countdown";

const storedStart = new Date("2027-10-28T21:00:00.000Z");
const storedEnd = new Date("2027-10-28T23:00:00.000Z");

// 21:00 Stockholm (UTC+2) = 19:00 UTC, this is the real moment the event starts
const start = new Date("2027-10-28T19:00:00.000Z").getTime();
//real moment event ends
const end = new Date("2027-10-28T21:00:00.000Z").getTime();

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
});
