"use client";

import { DragDropProvider } from "@dnd-kit/react";
import InventoryModalContent from "./InventoryModalContent";
import { EventInventoryItem, InventoryCatalogueItem } from "../lib/types";
import { useState } from "react";
import { addInventoryItemAction } from "../actions/inventoryActions";

type ItemId = string | number;

interface InventoryModalProps {
  onClose: () => void;
  eventInventory: EventInventoryItem[];
  inventoryCatalogue: InventoryCatalogueItem[];
  eventId: number;
}

const EventInventoryModal = ({
  onClose,
  eventInventory,
  inventoryCatalogue,
  eventId,
}: InventoryModalProps) => {
  const [pendingIds, setPendingIds] = useState<ItemId[]>(
    eventInventory
      .filter((item) => item.status === "pending")
      .map((item) => item.inventoryItemId),
  );
  const [inventoryIds, setInventoryIds] = useState<ItemId[]>(
    eventInventory
      .filter((item) => item.status === "in_inventory")
      .map((item) => item.inventoryItemId),
  );

  return (
    <DragDropProvider
      onDragEnd={async (event) => {
        if (event.canceled) return;

        const { source, target } = event.operation;
        if (!source || !target) return;

        const itemId = source.id;

        if (target.id === "pending" || target.id === "in_inventory") {
          setPendingIds((prev) => prev.filter((id) => id !== itemId));
          setInventoryIds((prev) => prev.filter((id) => id !== itemId));

          if (target.id === "pending") {
            setPendingIds((prev) => [...prev, itemId]);
          } else {
            setInventoryIds((prev) => [...prev, itemId]);
          }

          try {
            await addInventoryItemAction(
              eventId,
              Number(source.id),
              0,
              target.id,
            );
          } catch (error) {
            console.error("Save failed:", error);
          }
        }
      }}
    >
      <InventoryModalContent
        onClose={onClose}
        inventoryCatalogue={inventoryCatalogue}
        pendingIds={pendingIds}
        inventoryIds={inventoryIds}
      />
    </DragDropProvider>
  );
};

export default EventInventoryModal;
