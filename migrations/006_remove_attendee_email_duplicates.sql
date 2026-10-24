-- 006_remove_attendee_email_duplicates.sql
-- Removing duplicate attendee records
-- Adding the UNIQUE constraint

BEGIN;

DELETE FROM attendees a
USING attendees b
WHERE a.email = b.email
  AND a.id > b.id;
ALTER TABLE attendees
ADD CONSTRAINT attendees_email_unique UNIQUE (email);

COMMIT;