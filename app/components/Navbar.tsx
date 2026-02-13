import Image from "next/image";
import Link from "next/link";
import { auth, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  if (!session) return null;

  return (
    <>
      {/* Mobile: top bar */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-4 z-50">
        <Link href="/dashboard">
          <Image
            src="/are-you-coming-logo-light-q.svg"
            alt="Are You Coming?"
            width={120}
            height={43}
          />
        </Link>
        <div className="flex items-center gap-3">
          <p className="text-xs text-zinc-500">{session?.user?.name}</p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="bg-red-500 text-white px-3 py-1.5 rounded text-xs hover:bg-red-600 cursor-pointer"
            >
              Sign out
            </button>
          </form>
        </div>
      </nav>

      {/* Desktop: left sidebar */}
      <nav className="hidden lg:flex fixed top-0 left-0 h-screen w-56 bg-white border-r border-zinc-200 flex-col justify-between p-4 z-50">
        <div className="flex flex-col gap-2">
          <Link href="/dashboard" className="mb-4">
            <Image
              src="/are-you-coming-logo-light-q.svg"
              alt="Are You Coming?"
              width={180}
              height={65}
            />
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-zinc-700 hover:text-violet-600 hover:bg-violet-50 px-3 py-2 rounded-md transition-colors"
          >
            Dashboard
          </Link>
        </div>
        <div className="flex flex-col gap-2 border-t border-zinc-200 pt-4">
          <p className="text-xs text-zinc-500 truncate">{session?.user?.name}</p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="w-full bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 cursor-pointer"
            >
              Sign out
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
