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

  // for later
  // const countDownDate = new Date("Dec 6, 2025 18:00").getTime();

  return (
    <div
      className={`flex flex-col min-h-screen items-center justify-center gap-8 bg-[linear-gradient(135deg,#fff5f5,#f3e5ff,#e5ebff,#e0f2ff,#d9f7f7,#d3f9d8,#e9fac8,#fff9db)] p-6 ${poppins.className}`}
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white">
          🎉 NICO&apos;S BIRTHDAY PARTY
        </h1>
        <p className="text-2xl text-zinc-600 dark:text-zinc-400">
          December 6th, 2025 • 18:00
        </p>
      </div>
      <CountDown />

      <AttendeeForm />

      {allAttendees.length > 0 && (
        <div className="w-full max-w-md">
          <div className="relative mb-6">
            <h2 className="text-3xl font-bold text-center bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              ⭐ VIP GUEST LIST ⭐
            </h2>
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {allAttendees.length}{" "}
              {allAttendees.length === 1 ? "guest" : "guests"} confirmed
            </p>
          </div>
          <ul className="space-y-3">
            {allAttendees.map((attendee, index) => (
              <li
                key={attendee.id}
                className="group relative bg-linear-to-r from-yellow-50 to-amber-50 dark:from-zinc-900 dark:to-zinc-800 px-6 py-5 rounded-xl shadow-lg border-2 border-yellow-400/30 dark:border-yellow-600/30 hover:border-yellow-500 dark:hover:border-yellow-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <span className="text-xl font-semibold text-zinc-900 dark:text-white">
                      {attendee.name}
                    </span>
                  </div>
                  <span className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity">
                    🎊
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
