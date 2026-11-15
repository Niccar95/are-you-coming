import { EventType } from "../lib/types";

interface PreviewProps {
  eventData: EventType;
  isEditingNote: boolean;
  note: {
    value: string;
    onChange: (note: string) => void;
  };
}

export const EmailPreview = ({
  eventData,
  isEditingNote,
  note,
}: PreviewProps) => {
  const formattedDate = new Date(eventData.eventDate).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="text-body relative">
      <p className="pb-6">
        Here&apos;s a reminder that you have been invited to the following
        event:
      </p>

      <p className="font-bold pb-6">{eventData.name}</p>

      <p className="pb-6">{eventData.description}</p>

      {isEditingNote ? (
        <div className="flex flex-col gap-2 mb-6">
          <textarea
            value={note.value}
            onChange={(e) => note.onChange(e.target.value)}
            placeholder="Add extra notes..."
            className="form-input w-full"
          />
          <p className="text-xs text-zinc-400">
            An "Extra notes" heading will be added automatically.
          </p>
        </div>
      ) : (
        note.value && (
          <>
            <p className="font-bold pb-6">Extra notes: </p>
            <p className="pb-6 whitespace-pre-wrap wrap-break-word">
              {note.value}
            </p>
          </>
        )
      )}

      <div className="pb-6">
        <p className="font-bold pb-6">Location and date</p>
        <p className="pb-2">{eventData.eventLocation}</p>
        <p>{formattedDate}</p>
      </div>

      <p className="pb-6 italic">
        <span className="font-bold block">Best regards,</span>
        {eventData.hostName}
      </p>
    </div>
  );
};
