import { auth } from "@/auth";
import { inventoryItems } from "../data/inventory";
import pool from "../lib/db";

import { InventoryCategory } from "../lib/types";
import {
  CatalogueItemClass,
  InventoryItemClass,
} from "../lib/models/Inventory";

export const seedInventory = async (): Promise<void> => {
  for (const item of inventoryItems) {
    await pool.query(
      `INSERT INTO inventory_items (name, emoji, category)
       VALUES ($1, $2, $3)
       ON CONFLICT DO NOTHING`,
      [item.name, item.emoji, item.category],
    );
  }
};

export const getEventInventories = async (
  eventId: number,
): Promise<InventoryItemClass[]> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return [];

  const { rows } = await pool.query(
    `SELECT event_inventory.*
     FROM event_inventory
     JOIN events ON event_inventory.event_id = events.id
     WHERE event_inventory.event_id = $1
     AND events.user_id = $2
     ORDER BY event_inventory.id DESC`,
    [eventId, userId],
  );

  return rows.map(
    (item: {
      id: number;
      event_id: number;
      inventory_item_id: number;
      quantity: number;
    }) =>
      new InventoryItemClass(
        item.id,
        item.event_id,
        item.inventory_item_id,
        item.quantity,
      ),
  );
};

export const getInventoryCatalogue = async (): Promise<
  CatalogueItemClass[]
> => {
  const { rows } = await pool.query(
    "SELECT * FROM inventory_items ORDER BY id DESC",
  );

  return rows.map(
    (item: {
      id: number;
      name: string;
      emoji: string;
      category: InventoryCategory;
    }) => new CatalogueItemClass(item.id, item.name, item.emoji, item.category),
  );
};
