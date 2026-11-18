-- 008_add_inventory_items.sql
-- create shared inventory catalog and event inventory relationships

BEGIN;

-- Shared catalog: seeded once for all events
CREATE TABLE inventory_items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  emoji TEXT NOT NULL,
  category TEXT NOT NULL
);

-- Event-specific item selections and quantities
CREATE TABLE event_inventory (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL
    REFERENCES events(id) ON DELETE CASCADE,
  inventory_item_id INTEGER NOT NULL
    REFERENCES inventory_items(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (event_id, inventory_item_id)
);

CREATE INDEX idx_event_inventory_event_id
  ON event_inventory(event_id);

COMMIT;