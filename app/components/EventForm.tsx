"use client";

const EventForm = () => {
  return (
    <form className="flex flex-col gap-4 w-full p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-zinc-800 dark:text-white mb-2">Create Event</h3>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Event Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter event name"
          className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-zinc-800 dark:text-white"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="eventDate" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Event Date
        </label>
        <input
          id="eventDate"
          type="datetime-local"
          className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-zinc-800 dark:text-white"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-violet-500 hover:bg-violet-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 mt-2 cursor-pointer"
      >
        Create Event
      </button>
    </form>
  );
};

export default EventForm;
