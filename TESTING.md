# Testing Guide

How to write and run tests in this project. The most important part is **how to write mocks**, so that comes first.

---

## How to write mocks

A test runs with no server, no Next.js router, no database and no browser. If a component uses any of those, the test has to replace them with fakes. That is all a mock is: a fake version of something the component uses.

### The method (works for any component)

1. **Read the component's imports and calls.** List everything that comes from outside: Next.js hooks, `fetch`, your own helper modules, browser APIs.
2. **For each one, write the mock as the reverse of how the component uses it.**
3. **Run the test.** If the fake is missing something, the error tells you what. Add it.

React itself and your own simple components run for real. Only mock things that need the real world.

### Example 1: a Next.js hook

The component does this:

```tsx
import { useRouter } from "next/navigation";

const router = useRouter();
router.refresh();
```

The mock is the same thing written backwards:

```tsx
const refresh = vi.fn();

vi.mock("next/navigation", () => ({   // when something imports "next/navigation"...
  useRouter: () => ({ refresh }),     // ...give it a useRouter that returns { refresh }
}));
```

Rules:

- The module name is the exact string from the import.
- `useRouter` is the exact name being imported.
- The returned object only needs what the component actually uses (`refresh`).
- `vi.fn()` makes a **spy**: a fake function that remembers whether and how it was called.

If the component also uses `router.push(...)`, add it:

```tsx
const refresh = vi.fn();
const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh, push }),
}));
```

If it uses other hooks from the same module, add them to the same mock:

```tsx
vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh, push }),
  usePathname: () => "/events",
  useSearchParams: () => new URLSearchParams("page=2"),
}));
```

### Example 2: fetch

The component does this:

```tsx
await fetch("/api/events", { method: "DELETE", ... });
```

The mock:

```tsx
global.fetch = vi.fn().mockResolvedValue({ ok: true });
```

If the component reads the response, return the data it reads:

```tsx
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ events: [] }),
});
```

#### Simulating a fetch error

**Rule: never invent an error. Mock the exact failure your real fetch would produce.** A made-up error makes the test pass against something that never happens in the app.

There are two kinds of fetch failure, and they behave differently:

**1. Network failure** (offline, server down). `fetch` rejects with a `TypeError`. Browsers use the message "Failed to fetch".

```tsx
global.fetch = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
```

**2. Server error** (404, 500, and so on). `fetch` does **not** reject. It resolves with `ok: false` and a status code.

```tsx
global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });
```

If the component reads an error message from the response body, copy the shape from the API route. Open the route (for example `/api/events`), see what it returns on failure, and mock exactly that:

```tsx
global.fetch = vi.fn().mockResolvedValue({
  ok: false,
  status: 500,
  json: async () => ({ error: "Could not delete" }),   // must match what the route really returns
});
```

**Only write a failure test once the component handles failures.** `DeleteButton` currently has no `res.ok` check and no `try/catch`, so there is nothing to test yet. When a failure path is added to the component (for example `if (!res.ok) { ...; return; }`), mock the failure as above and check that the component does the right thing, such as `expect(refresh).not.toHaveBeenCalled()`.

### Example 3: one of your own modules (hypothetical)

This example is not from our code. It shows the pattern. The component does this:

```tsx
import { getEvents } from "@/lib/events";
```

The mock:

```tsx
vi.mock("@/lib/events", () => ({
  getEvents: vi.fn().mockResolvedValue([{ id: 1, title: "Party" }]),
}));
```

### Example 4: a default export (hypothetical)

This example is not from our code. It shows the pattern. The component does this:

```tsx
import Chart from "some-chart-library";
```

The mock needs a `default` key:

```tsx
vi.mock("some-chart-library", () => ({
  default: () => <div>fake chart</div>,
}));
```

### Checking a spy

```tsx
expect(refresh).toHaveBeenCalled();                 // called at least once
expect(refresh).toHaveBeenCalledTimes(1);           // called exactly once
expect(push).toHaveBeenCalledWith("/events");       // called with these arguments
expect(global.fetch).toHaveBeenCalledWith("/api/events", { ... });
```

### Controlling what a fake returns

| Code | Meaning |
| --- | --- |
| `vi.fn()` | Does nothing, returns `undefined`. |
| `vi.fn().mockReturnValue(5)` | Returns `5`. |
| `vi.fn().mockResolvedValue(x)` | Returns a promise that resolves to `x` (use for async functions like `fetch`). |
| `vi.fn().mockRejectedValue(err)` | Returns a promise that fails with `err`. |

### Reset between tests

```tsx
beforeEach(() => {
  vi.clearAllMocks();
});
```

Without this, calls from one test show up in the next one.

### Common mistakes

| Error or problem | Cause and fix |
| --- | --- |
| `useRouter is not a function` | The mock is missing that name. Add `useRouter` to the mock. |
| `router.refresh is not a function` | The fake router is missing `refresh`. Add it. |
| `Cannot access 'refresh' before initialization` | A `vi.mock` is hoisted above your other code. Only use variables like `refresh` inside a function in the mock (`() => ({ refresh })`), not directly at the top level of the mock factory. If you need to share a variable that way, create it with `vi.hoisted(() => vi.fn())`. |
| Mock seems ignored | The module string in `vi.mock("...")` must match the component's import exactly. |
| `Default export is missing` | Add a `default` key to the mock (Example 4). |
| Spy shows calls from an earlier test | Add `vi.clearAllMocks()` in `beforeEach`. |

### Where to look when unsure

When you don't know what to mock, run the test without a mock first. The error names the exact thing that failed, which is the thing to mock. Docs: https://vitest.dev/guide/mocking

---

## Setup

We use **Vitest** with **Testing Library**. The config is `vitest.config.mjs` in the project root:

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
  },
})
```

Run the tests:

```
npm test
```

Vitest starts in watch mode and reruns tests when files change. Press `q` to quit.

## Where tests go

Put each test **next to the file it tests**. Vitest finds any file named `*.test.*` or `*.spec.*`.

```
app/
  components/
    DeleteButton.tsx
    DeleteButton.test.tsx
```

Use `.tsx` for tests that contain JSX. Don't put test files inside `pages/` if you use the Pages Router, because every file there becomes a route.

## Anatomy of a test

```tsx
import { describe, it, expect } from "vitest";

describe("what you are testing", () => {
  it("what it should do", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- `describe` groups tests.
- `it` is one test.
- `expect(...)` is the check. If it is wrong, the test fails.

## Testing a component

A component test has three steps: render, act, check.

```tsx
render(<DeleteButton id={42} />);                                           // 1. render
fireEvent.click(document.getElementById("delete-event-42") as HTMLElement); // 2. act
expect(refresh).toHaveBeenCalledTimes(1);                                   // 3. check
```

To find an element, give it an `id` in the component:

```tsx
<button id={`delete-event-${id}`} onClick={handleDelete}>
```

Then grab it with `document.getElementById(...)`. The `as HTMLElement` is needed because TypeScript thinks the element might not exist.

If the click triggers async work (like `fetch`), wait for the result:

```tsx
await waitFor(() => expect(refresh).toHaveBeenCalledTimes(1));
```

## Full example: `DeleteButton.test.tsx`

```tsx
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
```

## Checklist for a new test

1. Create `Component.test.tsx` next to the component.
2. List what the component imports from the outside world and mock each one.
3. Render the component.
4. Click or type to trigger the behavior.
5. `expect` the result.
6. Run `npm test`.

## Other troubleshooting

| Problem | Fix |
| --- | --- |
| `'X' refers to a value, but is being used as a type` | Rename the test file to `.tsx` and check `"jsx"` is set in `tsconfig.json`. |
| `document is not defined` | Check `environment: 'jsdom'` is in `vitest.config.mjs`. |
| Duplicate elements found across tests | Add `globals: true` to the `test` block in the config. |

## Notes on npm warnings

- `ERESOLVE overriding peer dependency` warnings come from version mismatches between ESLint, TypeScript and `eslint-config-next`. They are harmless unless linting breaks.
- The remaining `braces` audit warning is in dev tooling only. Don't run `npm audit fix --force`, because it downgrades `eslint-config-next`.
- `install-scripts` warnings are npm asking permission to run setup scripts. The project works without approving them.
