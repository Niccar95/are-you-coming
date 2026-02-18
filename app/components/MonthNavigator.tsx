"use client";

interface MonthNavigatorProps {
  onPrevious: () => void;
  onNext: () => void;
}

export default function MonthNavigator({ onPrevious, onNext }: MonthNavigatorProps) {
  return (
    <div className="flex gap-2">
      <button onClick={onPrevious} className="px-3 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 transition-colors cursor-pointer">
        ←
      </button>
      <button onClick={onNext} className="px-3 py-1 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 transition-colors cursor-pointer">
        →
      </button>
    </div>
  );
}
