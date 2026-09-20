# Architecture

## Request flow

Route handler
├─ Validate incoming data
├─ Check authentication/authorization
├─ Decide if the action is allowed
↓
Service
├─ Perform database operations
├─ Coordinate persistence
↓
Class/model
├─ Represent the entity
├─ Hold entity-specific behavior

## Data Flow

Database
↓
EventClass
↓
toPlainObjects()
↓
EventType
↓
Client Component

## Classes / Models

Classes represent entities and contain behavior that belongs to those entities.

They are used for:

- Encapsulating entity-specific logic
- Avoiding duplicated business rules across routes and services
- Providing reusable methods that operate on the entity

Example:

```ts
event.isAFutureDate();
attendee.hasValidEmail();
event.displayEvent();
```

## Types

Types describe the shape of data moving through the application.

They are used for:

- Component props
- Function contracts
- API responses
- Serialized data passed between Server and Client Components

Example:

```ts
export type EventType = {
  id: number;
  name: string;
  eventDate: string;
  description: string;
  imageUrl: string | null;
};
```

## Classes vs Types: Behavior vs Data

EventClass
├─ Has methods
├─ Can contain entity behavior
├─ Exists on the server

EventType
├─ Describes plain data
├─ Safe to serialize
├─ Used across boundaries

# Utils vs. Class Methods

## When to use Utils (`utils/`)

Use utility functions for simple helper functions that take an input, process it, and return a result without needing to know about a specific `EventClass` instance.

### Characteristics

- **Where they run:** Anywhere (Client Components, Server Components, API routes).
- **How they work:** They only care about the arguments passed into them.
- **Client friendly:** You can import and run them directly in the browser.

### Use them for:

- **Formatting data:** Changing date strings to local/UTC time for inputs or screen display (e.g., `formatDate`).
- **Preparing raw input:** Cleaning or formatting form data before creating an event object.
- **General helper functions:** Custom hooks, file uploads, or generic text helpers.

---

## When to use Class Methods (`EventClass`)

Use class methods for rules and actions that belong directly to an event and need to read or change the event's data using `this`.

### Characteristics

- **Where they run:** Server only (Services, API routes).
- **How they work:** They use the event's internal data (`this.eventDate`, `this.eventName`).
- **Server restricted:** They disappear when sent to the browser, so Client Components cannot call them.

### Use them for:

- **Checking event rules:** Checking if an event date is valid (e.g., `event.isAFutureDate()`).
- **Creating event-specific links:** Building a link tied to the event (e.g., `event.getGoogleCalendarUrl()`).
- **Updating event state:** Changing internal values on the event before saving to the database.

## Summary of Boundaries: Methods vs. Utilities

### 1. Class Methods (`this`-bound & State Mutation)

- **What they do:** Operate directly on an instance's internal state using `this`, handle business logic, or mutate properties.
- **Where they live:** Inside the class or model definition.
- **Example:** `event.updateTitle("New Title")` or `event.cancel()`.

### 2. Utility Functions (Stateless Data Transformation)

- **What they do:** Take input data, transform its shape, extract properties, or handle collections (like arrays) without mutating the underlying instance state.
- **Where they live:** In dedicated `utils/` files.
- **Example:** `toPlainObject(event)` or `toPlainObjects(events)` for crossing the server-client boundary cleanly.

---

## Quick Rule of Thumb

Are you working with a single event item and calling the function directly on it?
├─ YES ──> Use a Class Method on EventClass (e.g., event.isAFutureDate())
└─ NO ──> Use a Util function in utils/ (e.g., filterEvents(list) or formatDate(string))
