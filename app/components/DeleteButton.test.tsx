import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import DeleteButton from "./DeleteButton";

const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

describe("DeleteButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({ ok: true });
  });

  it("sends a DELETE request and refreshes the router when clicked", async () => {
    render(<DeleteButton id={42} />);

    fireEvent.click(document.getElementById("delete-event-42") as HTMLElement);

    await waitFor(() => expect(refresh).toHaveBeenCalledTimes(1));

    expect(global.fetch).toHaveBeenCalledWith("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 42 }),
    });
  });
});
