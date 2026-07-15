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
toPlainObject()
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
