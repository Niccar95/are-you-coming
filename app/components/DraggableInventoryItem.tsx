import { Grip } from "lucide-react";
import { useDraggable } from "@dnd-kit/react";
import { InventoryCatalogueItem } from "../lib/types";

interface DraggableInventoryItemProps {
  item: InventoryCatalogueItem;
}

const DraggableInventoryItem = ({ item }: DraggableInventoryItemProps) => {
  const { ref } = useDraggable({
    id: item.id,
  });

  return (
    <article
      ref={ref}
      className="card shrink-0 md:shrink md:self-start text-violet-700 text-xs font-medium p-4! md:p-6! flex items-center gap-2 w-full cursor-pointer transition-colors hover:bg-violet-620"
    >
      <Grip size={18} className="shrink-0" />
      <span>{item.name}</span>
    </article>
  );
};

export default DraggableInventoryItem;
