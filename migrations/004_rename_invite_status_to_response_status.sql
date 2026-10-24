
-- 004_rename_invite_status_to_response_status.sql
-- Renaming to more fitting name as this status is for potential attendees who themselves choose if they want to attend or not.
-- Dropping default value too as users themselves choose their status.

BEGIN;

ALTER TABLE "event_attendees"
RENAME COLUMN "invite_status" TO "response_status";

ALTER TABLE "event_attendees"
ALTER COLUMN "response_status" DROP DEFAULT;

COMMIT;