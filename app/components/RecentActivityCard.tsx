"use client";

import { useCallback, useState } from "react";
import { ResponseLogType } from "../lib/types";
import useClickOutside from "../hooks/useClickOutside";

interface RecentActivityCardProps {
  responseLogs: ResponseLogType[];
}

const RecentActivityCard = ({ responseLogs }: RecentActivityCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = useCallback(() => setIsOpen(false), []);

  const modalRef = useClickOutside(isOpen, onClose);

  const mostrecentResponseLog = responseLogs[0];
  return (
    <>
      <section className="card h-55 shrink-0 flex flex-col w-full md:flex-1 min-w-0">
        <h2 className="text-title mb-4">Recent Activity</h2>

        {responseLogs.length === 0 ? (
          <p className="text-meta">No activity yet.</p>
        ) : (
          <ul className="relative ml-2 border-l-2 border-violet-100">
            <li
              key={mostrecentResponseLog.id}
              className="relative pl-6 pb-6 last:pb-0"
            >
              <span className="absolute -left-1.75 top-1.5 h-3 w-3 rounded-full bg-violet-500 ring-4 ring-white" />

              <div className="flex flex-col gap-1">
                <p className="text-body">
                  <span className="font-semibold">
                    {mostrecentResponseLog.attendeeName}
                  </span>{" "}
                  {mostrecentResponseLog.responseStatus === "coming"
                    ? "accepted the invitation"
                    : mostrecentResponseLog.responseStatus === "unsure"
                      ? "is unsure about attending"
                      : "declined the invitation"}
                </p>

                <p className="text-meta">{mostrecentResponseLog.eventName}</p>

                <time className="text-subtle">
                  {new Date(mostrecentResponseLog.createdAt).toLocaleString(
                    "sv-SE",
                    {
                      timeZone: "Europe/Stockholm",
                    },
                  )}
                </time>
              </div>
            </li>
          </ul>
        )}
        <button
          onClick={() => setIsOpen(true)}
          disabled={responseLogs.length <= 1}
          className="mt-auto font-medium text-violet-600 hover:text-violet-700 transition-colors self-end cursor-pointer"
        >
          View all →
        </button>
      </section>
      {isOpen && (
        <div className="modal-overlay fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="card w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-title mb-4">All Recent Activity</h2>

            <div className="flex flex-col gap-6 overflow-y-auto overflow-x-hidden">
              <ul className="relative ml-2 border-l-2 border-violet-100">
                {responseLogs.map((log) => (
                  <li key={log.id} className="relative pl-6 pb-6 last:pb-0">
                    <span className="absolute -left-1.75 top-1.5 h-3 w-3 rounded-full bg-violet-500 ring-4 ring-white" />

                    <div className="flex flex-col gap-1">
                      <p className="text-body">
                        <span className="font-semibold">
                          {log.attendeeName}
                        </span>{" "}
                        {log.responseStatus === "coming"
                          ? "accepted the invitation"
                          : log.responseStatus === "unsure"
                            ? "is unsure about attending"
                            : "declined the invitation"}
                      </p>

                      <p className="text-meta">{log.eventName}</p>

                      <time className="text-subtle">
                        {new Date(log.createdAt).toLocaleString()}
                      </time>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentActivityCard;
