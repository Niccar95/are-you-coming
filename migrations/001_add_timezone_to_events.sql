-- 001_add_timezone_to_events.sql
-- Stores which timezone each event's clock time refers to.
-- Existing events are labelled Europe/Stockholm; new events must supply their own.

BEGIN;

ALTER TABLE events ADD COLUMN timezone TEXT NOT NULL DEFAULT 'Europe/Stockholm';

ALTER TABLE events ALTER COLUMN timezone DROP DEFAULT;

COMMIT;