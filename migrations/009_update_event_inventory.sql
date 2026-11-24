-- 009_update_event_inventory.sql
-- Update to event inventory table to also have a status property

BEGIN;

ALTER TABLE event_inventory
ADD COLUMN status TEXT NOT NULL DEFAULT 'unselected';

COMMIT;

