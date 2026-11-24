import { EventInventoryItemStatus, InventoryCategory } from "../types";

export class CatalogueItemClass {
  id: number;
  name: string;
  emoji: string;
  category: InventoryCategory;

  constructor(
    id: number,
    name: string,
    emoji: string,
    category: InventoryCategory,
  ) {
    this.id = id;
    this.name = name;
    this.emoji = emoji;
    this.category = category;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      emoji: this.emoji,
      category: this.category,
    };
  }
}

export class InventoryItemClass {
  id: number;
  eventId: number;
  inventoryItemId: number;
  quantity: number;
  status: EventInventoryItemStatus;

  constructor(
    id: number,
    eventId: number,
    inventoryItemId: number,
    quantity: number,
    status: EventInventoryItemStatus,
  ) {
    this.id = id;
    this.eventId = eventId;
    this.inventoryItemId = inventoryItemId;
    this.quantity = quantity;
    this.status = status;
  }

  hasValidQuantity(): boolean {
    return Number.isInteger(this.quantity) && this.quantity >= 0;
  }

  toJSON() {
    return {
      id: this.id,
      eventId: this.eventId,
      inventoryItemId: this.inventoryItemId,
      quantity: this.quantity,
      status: this.status,
    };
  }
}
