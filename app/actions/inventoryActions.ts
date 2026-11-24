"use server";

import { auth } from "@/auth";
import { EventInventoryItemStatus } from "../lib/types";
import {
  addEventInventoryItem,
  getEventInventories,
  getInventoryCatalogue,
} from "../services/inventoryService";
import { getEventById } from "../services/eventService";
import { toPlainObjects } from "../utils/toPlainObject";

export async function getInventoryData(eventId: number) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const event = await getEventById(eventId);

  if (!event) {
    throw new Error("Event not found.");
  }

  if (String(event.userId) !== String(session.user.id)) {
    throw new Error("Forbidden.");
  }

  const [inventory, catalogue] = await Promise.all([
    getEventInventories(eventId),
    getInventoryCatalogue(),
  ]);

  return {
    eventInventory: toPlainObjects(inventory),
    inventoryCatalogue: toPlainObjects(catalogue),
  };
}

export async function addInventoryItemAction(
  eventId: number,
  inventoryItemId: number,
  quantity: number,
  status: EventInventoryItemStatus,
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const event = await getEventById(eventId);

  if (!event) {
    throw new Error("Event not found.");
  }

  if (String(event.userId) !== String(session.user.id)) {
    throw new Error("Forbidden.");
  }

  await addEventInventoryItem(eventId, inventoryItemId, quantity, status);
}
