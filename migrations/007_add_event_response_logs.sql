-- 007_add_event_response_logs.sql
-- add logs to attendee responses 
-- add index as log shortcut

BEGIN;

CREATE TABLE event_response_logs (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  attendee_id INTEGER NOT NULL REFERENCES attendees(id) ON DELETE CASCADE,
  response_status TEXT NOT NULL
    CHECK (response_status IN ('coming', 'unsure', 'skipping')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_event_response_logs_event_created
  ON event_response_logs (event_id, created_at DESC);

COMMIT;