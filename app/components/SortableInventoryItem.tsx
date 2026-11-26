import { Grip } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { InventoryCatalogueItem } from "../lib/types";

interface SortableInventoryItemProps {
  item: InventoryCatalogueItem;
  index: number;
  column: string;
}

const SortableInventoryItem = ({
  item,
  index,
  column,
}: SortableInventoryItemProps) => {
  const { ref } = useSortable({ id: item.id, index, group: column });

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

export default SortableInventoryItem;
