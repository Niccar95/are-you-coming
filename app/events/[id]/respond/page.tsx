import ResponseUpdateForm from "@/app/components/ResponseUpdateForm";
import { getAttendeeResponse } from "@/app/services/attendeeService";

const ResponsePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token: string }>;
}) => {
  const { id } = await params;
  const { token } = await searchParams;

  const eventId = Number(id);

  const response = await getAttendeeResponse(eventId, token);

  if (!response) {
    return <p>Invalid response link.</p>;
  }

  return (
    <ResponseUpdateForm response={response} eventId={eventId} token={token} />
  );
};

export default ResponsePage;
