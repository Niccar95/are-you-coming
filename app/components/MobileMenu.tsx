"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Menu, X, LayoutDashboard, Calendar } from "lucide-react";
import useClickOutside from "../hooks/useClickOutside";

interface MobileMenuProps {
  name: string;
}

export default function MobileMenu({ name }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);
  const ref = useClickOutside(open, onClose);

  return (
    <div ref={ref}>
      <button onClick={() => setOpen(!open)} className="p-1 cursor-pointer">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav
        className={`fixed top-14 bottom-0 w-1/2 bg-white border-r border-zinc-200 shadow-2xl flex flex-col gap-2 px-4 py-4 transition-all duration-300 ${open ? "left-0 opacity-100" : "-left-1/2 opacity-0 pointer-events-none"}`}
      >
        <div className="flex flex-col items-center gap-2 mb-4 py-2">
          <div className="w-10 h-10 rounded-full bg-zinc-200" />
          <p className="text-xs text-zinc-500">{name}</p>
        </div>
        <Link
          href="/dashboard"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-violet-600 hover:bg-violet-50 px-3 py-2 rounded-md transition-colors"
        >
          <LayoutDashboard size={16} />
          Dashboard
        </Link>
        <Link
          href="/calendar"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-violet-600 hover:bg-violet-50 px-3 py-2 rounded-md transition-colors"
        >
          <Calendar size={16} />
          Calendar
        </Link>
      </nav>
    </div>
  );
}
