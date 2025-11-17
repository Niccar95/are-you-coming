import AttendeeForm from "./components/AttendeeForm";
import { Attendee } from "./lib/models/Attendee";
import { Poppins } from "next/font/google";
import pool from "./lib/db";
import CountDown from "./components/CountDown";

export const revalidate = 0;

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

async function getAttendees(): Promise<Attendee[]> {
  const { rows } = await pool.query("SELECT * FROM attendees ORDER BY id ASC");
  return rows.map(
    (attendee: Attendee) =>
      new Attendee(attendee.id, attendee.name, attendee.email)
  );
}
export default async function Home() {
  const allAttendees = await getAttendees();

  return (
    <div
      className={`flex flex-col min-h-screen items-center justify-center gap-8 bg-linear-to-br from-white to-blue-50 p-6 ${poppins.className}`}
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-800">
          🎉 NICOS 30TH BDAY PARTY
        </h1>
        <p className="text-2xl text-zinc-600 dark:text-zinc-400">
          December 6th, 2025 • 18:00
        </p>
      </div>
      <CountDown />

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 items-start justify-center">
        <div className="w-full lg:w-80 bg-white dark:bg-zinc-900 rounded-lg shadow-md p-6 border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-3">Party Info</h3>
          <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
            <li className="flex items-center gap-2">
              <span className="text-blue-500">🍹</span>
              Punch & snacks provided
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">🍺</span>
              Bring your own booze
            </li>
          </ul>
        </div>

        <div className="w-full lg:w-96">
          <AttendeeForm />
        </div>

        {allAttendees.length > 0 && (
          <div className="w-full lg:w-80">
            <div className="relative mb-6">
              <h2 className="text-2xl font-bold text-center bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                ⭐ VIP GUESTS ⭐
              </h2>
              <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {allAttendees.length}{" "}
                {allAttendees.length === 1 ? "guest" : "guests"}
              </p>
            </div>
            <ul className="space-y-2 lg:max-h-96 lg:overflow-y-auto lg:pr-2">
              {allAttendees.map((attendee, index) => (
                <li
                  key={attendee.id}
                  className="bg-linear-to-r from-yellow-50 to-amber-50 dark:from-zinc-900 dark:to-zinc-800 px-4 py-3 rounded-lg shadow border border-yellow-400/30 dark:border-yellow-600/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-sm shadow">
                      {index + 1}
                    </div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {attendee.name}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
