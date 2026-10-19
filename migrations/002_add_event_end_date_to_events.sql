-- 002_add_event_end_date_to_events.sql
-- Stores event's chosen end date
-- Existing events get a custom end date 2 hours after event start date.

BEGIN;

ALTER TABLE events ADD COLUMN event_end_date TIMESTAMP WITH TIME ZONE;

UPDATE events SET event_end_date = event_date + INTERVAL '2 hours';

ALTER TABLE events ALTER COLUMN event_end_date SET NOT NULL;

COMMIT;