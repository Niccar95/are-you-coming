import { describe, it, expect } from "vitest";
import { escapeHtml } from "./escapeHtml";

describe("escapeHtml", () => {
  it("should escape ampersands", () => {
    const value = "&";

    expect(escapeHtml(value)).toBe("&amp;");
  });

  it("should escape less-than signs", () => {
    const value = "<";

    expect(escapeHtml(value)).toBe("&lt;");
  });

  it("should escape greater-than signs", () => {
    const value = ">";

    expect(escapeHtml(value)).toBe("&gt;");
  });

  it("should escape double quotes", () => {
    const value = '"';

    expect(escapeHtml(value)).toBe("&quot;");
  });

  it("should escape single quotes", () => {
    const value = "'";

    expect(escapeHtml(value)).toBe("&#39;");
  });

  it("should handle strings without special characters", () => {
    const value = "Hello world";

    expect(escapeHtml(value)).toBe("Hello world");
  });

  it("should handle empty strings", () => {
    const value = "";

    expect(escapeHtml(value)).toBe("");
  });
});
