import { ResponseLogType } from "../lib/types";

interface RecentActivityCardProps {
  responseLogs: ResponseLogType[];
}

const RecentActivityCard = ({ responseLogs }: RecentActivityCardProps) => {
  return (
    <section className="card">
      <h2 className="text-title mb-4">Recent Activity</h2>

      {responseLogs.length === 0 ? (
        <p className="text-meta">No activity yet.</p>
      ) : (
        <ul className="relative ml-2 border-l-2 border-violet-100">
          {responseLogs.map((log) => (
            <li key={log.id} className="relative pl-6 pb-6 last:pb-0">
              <span className="absolute -left-1.75 top-1.5 h-3 w-3 rounded-full bg-violet-500 ring-4 ring-white" />

              <div className="flex flex-col gap-1">
                <p className="text-body">
                  <span className="font-semibold">{log.attendeeName}</span>{" "}
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
      )}
    </section>
  );
};

export default RecentActivityCard;
