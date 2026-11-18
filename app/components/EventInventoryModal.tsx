"use client";
import { useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import {
  EventInventoryItem,
  InventoryCatalogueItem,
  InventoryCategory,
} from "../lib/types";

interface InventoryProps {
  onClose: () => void;
  eventInventory: EventInventoryItem[];
  inventoryCatalogue: InventoryCatalogueItem[];
}

const EventInventoryModal = ({
  onClose,
  eventInventory,
  inventoryCatalogue,
}: InventoryProps) => {
  const modalRef = useClickOutside(true, onClose);

  const [selectedCategory, setSelectedCategory] =
    useState<InventoryCategory | null>(null);

  const filteredInventory = inventoryCatalogue.filter((item) => {
    return item.category === selectedCategory;
  });

  return (
    <div className="modal-overlay">
      <div
        ref={modalRef}
        className="card modal md:max-w-[90%]! h-full flex flex-col"
      >
        <h2 className="text-title mb-4">Inventory Manager</h2>

        <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
          <div className="flex flex-col gap-3 w-full md:w-1/3">
            <div className="md:hidden grid grid-cols-4 gap-2">
              {[
                { name: "Food", emoji: "🍕", bg: "bg-orange-100" },
                { name: "Drinks", emoji: "🥤", bg: "bg-blue-100" },
                { name: "Decorations", emoji: "🎈", bg: "bg-pink-100" },
                { name: "Equipment", emoji: "🪑", bg: "bg-emerald-100" },
              ].map(({ name, emoji, bg }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSelectedCategory(name as InventoryCategory)}
                  className={`rounded-xl flex flex-col items-center justify-center gap-1 py-2 text-xs font-medium border-2 transition-all duration-150 ${
                    selectedCategory === name
                      ? "bg-violet-100 border-violet-500 text-violet-700"
                      : `${bg} border-transparent`
                  }`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span>{name}</span>
                </button>
              ))}
            </div>
            <section className="h-1/2 hidden md:grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedCategory("Food")}
                className={`rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-150 hover:scale-[1.02] ${
                  selectedCategory === "Food"
                    ? "bg-violet-100 border-2 border-violet-500 text-violet-700"
                    : "bg-orange-100 border-2 border-transparent hover:bg-violet-100"
                }`}
              >
                <span className="text-3xl">🍕</span>
                <span className="font-medium">Food</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory("Drinks")}
                className={`rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-150 hover:scale-[1.02] ${
                  selectedCategory === "Drinks"
                    ? "bg-violet-100 border-2 border-violet-500 text-violet-700"
                    : "bg-blue-100 border-2 border-transparent hover:bg-violet-100"
                }`}
              >
                <span className="text-3xl">🥤</span>
                <span className="font-medium">Drinks</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory("Decorations")}
                className={`rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-150 hover:scale-[1.02] ${
                  selectedCategory === "Decorations"
                    ? "bg-violet-100 border-2 border-violet-500 text-violet-700"
                    : "bg-pink-100 border-2 border-transparent hover:bg-violet-100"
                }`}
              >
                <span className="text-3xl">🎈</span>
                <span className="font-medium">Decorations</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory("Equipment")}
                className={`rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-150 hover:scale-[1.02] ${
                  selectedCategory === "Equipment"
                    ? "bg-violet-100 border-2 border-violet-500 text-violet-700"
                    : "bg-emerald-100 border-2 border-transparent hover:bg-violet-100"
                }`}
              >
                <span className="text-3xl">🪑</span>
                <span className="font-medium">Equipment</span>
              </button>
            </section>

            <section className="flex-1 rounded-lg bg-zinc-50/50 border border-zinc-100 p-4 overflow-y-auto">
              <h3 className="text-subtitle mb-4 text-center">
                Add Inventory Item
              </h3>
              {filteredInventory.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </section>
          </div>
          <section className="flex-1 grid grid-cols-2 gap-4">
            <section className="rounded-lg bg-zinc-50 border border-zinc-100 p-4 overflow-y-auto">
              <h3 className="text-subtitle mb-4 text-center">Pending</h3>
            </section>

            <section className="rounded-lg bg-zinc-50 border border-zinc-100 p-4 overflow-y-auto">
              <h3 className="text-subtitle mb-4 text-center">In Inventory</h3>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EventInventoryModal;
