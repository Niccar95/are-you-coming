import { EventType } from "../lib/types";

interface PreviewProps {
  eventData: EventType;
}

export const EmailPreview = ({ eventData }: PreviewProps) => {
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
    <div className="text-body">
      <p className="pb-6">
        Here&apos;s a reminder that you have been invited to the upcoming event:
      </p>

      <p className="font-bold pb-6">{eventData.name}</p>

      <p className="pb-6">{eventData.description}</p>

      <div className="pb-6">
        <p className="font-bold pb-6">Location and date</p>
        <p>{eventData.eventLocation}</p>
        <p>{formattedDate}</p>
      </div>

      <p className="pb-6 italic">
        <span className="font-bold block">Best regards,</span>
        {eventData.hostName}
      </p>
    </div>
  );
};
