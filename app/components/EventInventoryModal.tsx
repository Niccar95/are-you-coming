"use client";

import { DragDropProvider } from "@dnd-kit/react";
import InventoryModalContent from "./InventoryModalContent";
import { EventInventoryItem, InventoryCatalogueItem } from "../lib/types";
import { useState } from "react";

type ItemId = string | number;

interface InventoryModalProps {
  onClose: () => void;
  eventInventory: EventInventoryItem[];
  inventoryCatalogue: InventoryCatalogueItem[];
}

const EventInventoryModal = ({
  onClose,
  eventInventory,
  inventoryCatalogue,
}: InventoryModalProps) => {
  const [pendingIds, setPendingIds] = useState<ItemId[]>([]);
  const [inventoryIds, setInventoryIds] = useState<ItemId[]>([]);

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { source, target } = event.operation;
        if (!source || !target) return;

        const itemId = source.id;

        if (target.id === "pending" || target.id === "inventory") {
          setPendingIds((prev) => prev.filter((id) => id !== itemId));
          setInventoryIds((prev) => prev.filter((id) => id !== itemId));

          if (target.id === "pending") {
            setPendingIds((prev) => [...prev, itemId]);
          } else {
            setInventoryIds((prev) => [...prev, itemId]);
          }
        }
      }}
    >
      <InventoryModalContent
        onClose={onClose}
        eventInventory={eventInventory}
        inventoryCatalogue={inventoryCatalogue}
        pendingIds={pendingIds}
        inventoryIds={inventoryIds}
      />
    </DragDropProvider>
  );
};

export default EventInventoryModal;
