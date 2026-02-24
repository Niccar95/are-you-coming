"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowDownUp } from "lucide-react";

const SortControls = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const upcomingSort = searchParams.get("sortUpcomingEvent") ?? "asc";
  const pastSort = searchParams.get("sortPastEvent") ?? "desc";

  const updateSort = (param: string, order: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(param, order);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wide">
        <ArrowDownUp size={13} />
        Sort
      </div>
      <section className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-600">Upcoming</p>
        <div className="flex rounded-md overflow-hidden border border-zinc-200">
          <button
            onClick={() => updateSort("sortUpcomingEvent", "asc")}
            className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              upcomingSort === "asc"
                ? "bg-violet-600 text-white"
                : "text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            Soonest first
          </button>
          <button
            onClick={() => updateSort("sortUpcomingEvent", "desc")}
            className={`px-3 py-1.5 text-xs font-medium border-l border-zinc-200 transition-colors cursor-pointer ${
              upcomingSort === "desc"
                ? "bg-violet-600 text-white"
                : "text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            Latest first
          </button>
        </div>
      </section>
      <hr className="border-zinc-100" />
      <section className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-600">Past</p>
        <div className="flex rounded-md overflow-hidden border border-zinc-200">
          <button
            onClick={() => updateSort("sortPastEvent", "desc")}
            className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              pastSort === "desc"
                ? "bg-violet-600 text-white"
                : "text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            Most recent
          </button>
          <button
            onClick={() => updateSort("sortPastEvent", "asc")}
            className={`px-3 py-1.5 text-xs font-medium border-l border-zinc-200 transition-colors cursor-pointer ${
              pastSort === "asc"
                ? "bg-violet-600 text-white"
                : "text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            Oldest first
          </button>
        </div>
      </section>
    </div>
  );
};

export default SortControls;
