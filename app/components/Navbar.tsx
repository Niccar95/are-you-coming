import Image from "next/image";
import Link from "next/link";
import { Calendar, LayoutDashboard, LogOut } from "lucide-react";
import { auth, signOut } from "@/auth";
import MobileMenu from "./MobileMenu";

const Navbar = async () => {
  const session = await auth();

  if (!session) return null;

  return (
    <>
      {/* Mobile: top bar */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-4">
          <MobileMenu
            name={session?.user?.name || ""}
            signOutAction={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          />

          <Link href="/dashboard">
            <Image
              src="/are-you-coming-logo-light-q.svg"
              alt="Are You Coming?"
              width={82}
              height={30}
            />
          </Link>
        </div>
      </nav>

      {/* Desktop: left sidebar */}
      <nav className="hidden lg:flex fixed top-0 left-0 h-screen w-56 bg-white border-r border-zinc-200 flex-col justify-between p-4 z-50">
        <div className="flex flex-col gap-2">
          <Link href="/dashboard" className="mb-4">
            <Image
              src="/are-you-coming-logo-light-q.svg"
              alt="Are You Coming?"
              width={130}
              height={47}
            />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-violet-600 hover:bg-violet-50 px-3 py-2 rounded-md transition-colors"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
          <Link
            href="/calendar"
            className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-violet-600 hover:bg-violet-50 px-3 py-2 rounded-md transition-colors"
          >
            <Calendar size={16} />
            Calendar
          </Link>
        </div>
        <div className="flex flex-col gap-2 border-t border-zinc-200 pt-4">
          <p className="text-xs text-zinc-500 truncate">
            {session?.user?.name}
          </p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="btn-danger w-full px-3 py-2 text-sm flex items-center justify-center gap-2"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
