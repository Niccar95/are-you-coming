-- 003_add_attendee_invite_status_to_event_attendees.sql
-- Stores invite status (for attendees are invited to events)
-- Existing attendees get "pending" as status.

BEGIN;

ALTER TABLE event_attendees ADD COLUMN invite_status TEXT NOT NULL DEFAULT 'pending';

COMMIT;