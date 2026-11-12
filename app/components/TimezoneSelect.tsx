"use client";

import { useEffect, useState } from "react";

interface TimezoneSelectProps {
  value: string;
  onChange: (timezone: string) => void;
}

const TimezoneSelect = ({ value, onChange }: TimezoneSelectProps) => {
  const [timezones, setTimezones] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimezones(Intl.supportedValuesOf("timeZone"));
  }, []);

  const filteredTimezones = timezones.filter((timezone) =>
    timezone.toLowerCase().includes(search.toLowerCase()),
  );

  const selectTimezone = (timezone: string) => {
    onChange(timezone);
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-col gap-2">
      <label htmlFor="eventTimezone" className="form-label">
        Event Timezone (Optional)
      </label>

      <input
        id="eventTimezone"
        type="text"
        value={isOpen ? search : value}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => {
          setIsOpen(true);
          setSearch("");
        }}
        placeholder="Search timezone..."
        autoComplete="off"
        className="form-input"
      />

      {isOpen && (
        <div className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-zinc-200 bg-white shadow-lg">
          {filteredTimezones.length > 0 ? (
            filteredTimezones.map((timezone) => (
              <button
                key={timezone}
                type="button"
                onClick={() => selectTimezone(timezone)}
                className={`block w-full px-3 py-2 text-left text-sm hover:bg-violet-50 ${
                  value === timezone
                    ? "bg-violet-50 text-violet-700"
                    : "text-zinc-700"
                }`}
              >
                {timezone.replaceAll("_", " ")}
              </button>
            ))
          ) : (
            <p className="p-3 text-sm text-zinc-500">No timezones found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TimezoneSelect;
