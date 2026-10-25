"use client";

import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";
import Spinner from "./Spinner";
import { ResponseStatus } from "../lib/types";

type ResponseUpdateFormProps = {
  eventId: number;
  token: string;
  response: {
    name: string;
    responseStatus: ResponseStatus;
  };
};

const ResponseUpdateForm = ({
  eventId,
  token,
  response,
}: ResponseUpdateFormProps) => {
  const [responseStatus, setResponseStatus] = useState(response.responseStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await fetch("/api/responses", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          token,
          responseStatus,
        }),
      });

      if (!result.ok) {
        throw new Error("Failed to update response");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Error updating response:", error);
      setError("Something went wrong updating your response.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="card md:w-1/2 mt-8 flex flex-col items-center gap-3 text-center">
        <h3 className="text-title flex items-center justify-center gap-2">
          Response updated!
          <CheckCircle size={20} className="text-violet-500" />
        </h3>
        <p className="text-subtle">Your response has been saved.</p>
      </div>
    );
  }

  return (
    <div className="form-card mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-3">
        {loading && <Spinner />}

        <h3 className="form-heading">Update your response, {response.name}</h3>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 form-label cursor-pointer">
            <input
              type="radio"
              name="response"
              value="coming"
              checked={responseStatus === "coming"}
              onChange={() => setResponseStatus("coming")}
            />
            Coming
          </label>

          <label className="flex items-center gap-2 form-label cursor-pointer">
            <input
              type="radio"
              name="response"
              value="unsure"
              checked={responseStatus === "unsure"}
              onChange={() => setResponseStatus("unsure")}
            />
            Unsure
          </label>

          <label className="flex items-center gap-2 form-label cursor-pointer">
            <input
              type="radio"
              name="response"
              value="skipping"
              checked={responseStatus === "skipping"}
              onChange={() => setResponseStatus("skipping")}
            />
            Skipping
          </label>
        </div>

        <p className="text-subtle">
          You can change your response at any time using this link.
        </p>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-2 flex items-center gap-2 self-start"
        >
          <Send size={16} />
          Update response
        </button>
      </form>
    </div>
  );
};

export default ResponseUpdateForm;
