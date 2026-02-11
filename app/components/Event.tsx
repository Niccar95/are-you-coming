import Link from "next/link";

interface EventProps {
  id: number;
  name: string;
  eventDate: Date;
  description: string;
}

const Event = ({ id, name, eventDate, description }: EventProps) => {
  return (
    <Link href={`/events/${id}`} className="block min-w-[300px] shrink-0">
      <article
        key={id}
        className="h-[200px] w-[300] p-5 bg-white dark:bg-zinc-900 rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
      >
        <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
          {name}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          {new Date(eventDate).toLocaleString()}
        </p>
        {description && (
          <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-3 line-clamp-2">
            {description}
          </p>
        )}
      </article>
    </Link>
  );
};

export default Event;
