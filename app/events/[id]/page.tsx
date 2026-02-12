import AttendeeForm from "@/app/components/AttendeeForm";

const EventPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div>
      <h1>Event {id}</h1>
      <AttendeeForm eventId={Number(id)} />
    </div>
  );
};

export default EventPage;
