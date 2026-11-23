import { InventoryCatalogueItem, InventoryCategory } from "../lib/types";
import DraggableInventoryItem from "./DraggableInventoryItem";

interface DraggableInventoryListProps {
  selectedCategory: InventoryCategory | null;
  filteredInventory: InventoryCatalogueItem[];
}

const DraggableInventoryList = ({
  selectedCategory,
  filteredInventory,
}: DraggableInventoryListProps) => {
  return (
    <>
      {!selectedCategory ? (
        <p className="text-meta">Select a category to view items</p>
      ) : (
        filteredInventory.map((item) => (
          <DraggableInventoryItem key={item.id} item={item} />
        ))
      )}
    </>
  );
};

export default DraggableInventoryList;
