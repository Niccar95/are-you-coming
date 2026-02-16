"use client";

import { Share2 } from "lucide-react";

const ShareButton = () => {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  return (
    <button onClick={handleShare} className="btn-outline-violet flex items-center gap-2 self-start">
      <Share2 size={16} />
      Share event
    </button>
  );
};

export default ShareButton;
