"use client";

import { useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import {
  EventInventoryItem,
  InventoryCatalogueItem,
  InventoryCategory,
} from "../lib/types";

import { useDroppable } from "@dnd-kit/react";
import DraggableInventoryList from "./DraggableInventoryList";
import DraggableInventoryItem from "./DraggableInventoryItem";

interface InventoryProps {
  onClose: () => void;
  eventInventory: EventInventoryItem[];
  inventoryCatalogue: InventoryCatalogueItem[];
  pendingIds: (string | number)[];
  inventoryIds: (string | number)[];
}

const CATEGORIES: { name: InventoryCategory; emoji: string; bg: string }[] = [
  { name: "Food", emoji: "🍕", bg: "bg-orange-100" },
  { name: "Drinks", emoji: "🥤", bg: "bg-blue-100" },
  { name: "Decorations", emoji: "🎈", bg: "bg-pink-100" },
  { name: "Equipment", emoji: "🪑", bg: "bg-emerald-100" },
];

const InventoryModalContent = ({
  onClose,
  eventInventory,
  inventoryCatalogue,
  pendingIds,
  inventoryIds,
}: InventoryProps) => {
  const modalRef = useClickOutside(true, onClose);

  const [selectedCategory, setSelectedCategory] =
    useState<InventoryCategory | null>(null);

  const placedIds = [...pendingIds, ...inventoryIds];

  const filteredInventory = inventoryCatalogue.filter(
    (item) =>
      item.category === selectedCategory && !placedIds.includes(item.id),
  );

  const pendingItems = pendingIds
    .map((id) => inventoryCatalogue.find((item) => item.id === id))
    .filter((item) => item !== undefined);

  const inventoryItems = inventoryIds
    .map((id) => inventoryCatalogue.find((item) => item.id === id))
    .filter((item) => item !== undefined);

  const { ref: pendingRef } = useDroppable({
    id: "pending",
  });

  const { ref: inventoryRef } = useDroppable({
    id: "in_inventory",
  });

  return (
    <div className="modal-overlay">
      <div
        ref={modalRef}
        className="card modal md:max-w-[90%]! h-full flex flex-col"
      >
        <h2 className="text-title mb-4">Inventory Manager</h2>

        <div className="flex flex-col md:flex-row gap-3 md:gap-6 flex-1 min-h-0">
          <div className="flex flex-col gap-3 w-full md:w-1/3">
            <div className="md:hidden flex flex-row gap-2 overflow-x-auto p-2 rounded-lg bg-zinc-50/50 border border-zinc-100">
              {CATEGORIES.map(({ name, emoji, bg }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSelectedCategory(name)}
                  className={`rounded-xl flex flex-row items-center justify-center gap-1 w-36 shrink-0 p-2 text-xs font-medium border-2 transition-all duration-150 ${
                    selectedCategory === name
                      ? "bg-violet-100 border-violet-500 text-violet-700"
                      : `${bg} border-transparent`
                  }`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-xs">{name}</span>
                </button>
              ))}
            </div>

            <div className="h-1/2 hidden md:grid grid-cols-2 gap-3">
              {CATEGORIES.map(({ name, emoji, bg }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSelectedCategory(name)}
                  className={`rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-150 hover:scale-[1.02] border-2 ${
                    selectedCategory === name
                      ? "bg-violet-100 border-violet-500 text-violet-700"
                      : `${bg} border-transparent hover:bg-violet-100`
                  }`}
                >
                  <span className="text-3xl">{emoji}</span>
                  <span className="font-medium">{name}</span>
                </button>
              ))}
            </div>

            <section className="flex flex-col min-h-0 md:flex-1">
              <div
                className={`shrink-0 flex flex-row gap-2 overflow-x-auto overflow-y-hidden md:h-auto md:flex-1 md:min-h-0 md:overflow-x-hidden md:overflow-y-auto md:flex-wrap rounded-lg bg-zinc-50/50 border border-zinc-100 p-2 md:p-4 ${!selectedCategory ? "md:place-content-center" : "md:content-start"}`}
              >
                <DraggableInventoryList
                  selectedCategory={selectedCategory}
                  filteredInventory={filteredInventory}
                />
              </div>
            </section>
          </div>

          <div className="flex-1 flex flex-row gap-0 md:gap-6 min-h-0">
            <section className="flex-1 flex flex-col min-h-0">
              <h3 className="text-body font-semibold mb-2">Pending</h3>
              <div
                ref={pendingRef}
                className={`flex-1 rounded-l-lg md:rounded-lg bg-zinc-50/50 border border-zinc-200 p-2 md:p-4 overflow-y-auto flex ${
                  pendingItems.length === 0
                    ? "items-center justify-center"
                    : "flex-col items-start gap-2"
                }`}
              >
                {pendingItems.length === 0 ? (
                  <p className="text-meta text-center">No pending items</p>
                ) : (
                  pendingItems.map((item) => (
                    <DraggableInventoryItem key={item.id} item={item} />
                  ))
                )}
              </div>
            </section>

            <section className="flex-1 flex flex-col min-h-0">
              <h3 className="text-body font-semibold mb-2">In Inventory</h3>
              <div
                ref={inventoryRef}
                className={`flex-1 rounded-r-lg md:rounded-lg bg-zinc-50/50 border border-l-0 md:border-l border-zinc-200 p-2 md:p-4 overflow-y-auto flex ${
                  inventoryItems.length === 0
                    ? "items-center justify-center"
                    : "flex-col items-start gap-2"
                }`}
              >
                {inventoryItems.length === 0 ? (
                  <p className="text-meta text-center">No items in inventory</p>
                ) : (
                  inventoryItems.map((item) => (
                    <DraggableInventoryItem key={item.id} item={item} />
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryModalContent;
