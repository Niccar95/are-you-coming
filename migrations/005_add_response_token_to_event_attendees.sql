-- 005_add_response_token_to_event_attendees.sql
-- Adds a unique token to each attendee's response record,
-- allowing them to securely update their response via a personal link.

BEGIN;

ALTER TABLE event_attendees
ADD COLUMN response_token TEXT UNIQUE;

COMMIT;