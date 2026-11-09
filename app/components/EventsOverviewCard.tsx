interface EventsOverviewProps {
  totalCount: number;
  upcomingCount: number;
  pastCount: number;
}

const EventsOverviewCard = ({
  totalCount,
  upcomingCount,
  pastCount,
}: EventsOverviewProps) => {
  return (
    <section className="card">
      <h2 className="text-title mb-4">Events Overview</h2>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-zinc-50 border border-zinc-100 p-4 text-center">
          <p className="text-3xl font-bold text-zinc-700">{totalCount}</p>
          <p className="text-subtle mt-1">Total</p>
        </div>
        <div className="rounded-lg bg-violet-50 border border-violet-100 p-4 text-center">
          <p className="text-3xl font-bold text-violet-600">{upcomingCount}</p>
          <p className="text-subtle mt-1">Upcoming</p>
        </div>
        <div className="rounded-lg bg-zinc-50 border border-zinc-100 p-4 text-center">
          <p className="text-3xl font-bold text-zinc-700">{pastCount}</p>
          <p className="text-subtle mt-1">Past</p>
        </div>
      </div>
    </section>
  );
};

export default EventsOverviewCard;
