import AttendeeForm from "../components/AttendeeForm";
import { Poppins } from "next/font/google";
import CountDown from "../components/CountDown";
import Image from "next/image";
import SendRemindersButton from "../components/SendRemindersButton";
import { auth, signOut } from "@/auth";
import EventForm from "../components/EventForm";
import { getAttendees } from "../services/attendeeService";

export const revalidate = 0;

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const DashboardPage = async () => {
  const session = await auth();
  const allAttendees = await getAttendees();

  return (
    <div
      className={`flex flex-col min-h-screen items-center justify-center gap-8 bg-linear-to-br from-white to-violet-50 p-6 ${poppins.className}`}
    >
      <div className="w-full max-w-2xl flex justify-between items-center">
        <p className="text-sm text-gray-600">Welcome, {session?.user?.name}</p>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm cursor-pointer"
          >
            Sign out
          </button>
        </form>
      </div>

      <div className="relative w-full max-w-2xl rounded-lg overflow-hidden">
        <Image
          src="/party.jpg"
          alt="Party"
          width={800}
          height={500}
          className="object-cover w-full min-h-[420px] md:min-h-0"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-6 p-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
              🎉 NICO&apos;S 30TH BDAY PARTY
            </h1>
            <p className="text-xl md:text-2xl text-white drop-shadow-md">
              December 6th, 2025 • 18:00
            </p>
            <p className="text-lg text-white drop-shadow-md">
              📍 Ursvik, Sundbyberg
            </p>
          </div>
          <CountDown />
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-6 items-start justify-center">
        <div className="w-full lg:w-80 order-2 lg:order-1">
          <div className="relative mb-6">
            <h2 className="text-2xl font-bold text-center bg-linear-to-r from-violet-400 via-violet-500 to-violet-600 bg-clip-text text-transparent">
              ℹ️ PARTY INFO ℹ️
            </h2>
          </div>
          <ul className="space-y-3">
            <li className="bg-linear-to-r from-violet-50 to-fuchsia-50 dark:from-zinc-900 dark:to-zinc-800 px-4 py-3 rounded-lg border border-violet-400/30 dark:border-violet-600/30">
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-lg">
                  🍹
                </div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Punch & snacks provided
                </p>
              </div>
            </li>
            <li className="bg-linear-to-r from-violet-50 to-fuchsia-50 dark:from-zinc-900 dark:to-zinc-800 px-4 py-3 rounded-lg border border-violet-400/30 dark:border-violet-600/30">
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-lg">
                  🍺
                </div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Bring your own booze
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="w-full lg:w-96 order-1 lg:order-2">
          <AttendeeForm />
        </div>

        {allAttendees.length > 0 && (
          <div className="w-full lg:w-80 order-3 lg:order-3">
            <div className="relative mb-6">
              <h2 className="text-2xl font-bold text-center bg-linear-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                ⭐ GUEST LIST ⭐
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
      <SendRemindersButton />
      <EventForm />
    </div>
  );
};

export default DashboardPage;
