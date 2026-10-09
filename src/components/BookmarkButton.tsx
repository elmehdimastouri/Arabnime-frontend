"use client";

import React, { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { WebtoonCard } from "@/lib/types";
import { isBookmarked, toggleBookmark } from "@/lib/storage";

interface Props {
  webtoon: WebtoonCard;
}

export default function BookmarkButton({ webtoon }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isBookmarked(webtoon.id));
  }, [webtoon.id]);

  const handleToggle = () => {
    const nextState = toggleBookmark(webtoon);
    setSaved(nextState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
        saved
          ? "bg-brand-600/30 border border-brand-500 text-brand-300 hover:bg-brand-600/40"
          : "bg-dark-card hover:bg-dark-hover border border-dark-border text-gray-200"
      }`}
    >
      {saved ? (
        <>
          <BookmarkCheck className="w-4 h-4 text-brand-400" />
          في المفضلة
        </>
      ) : (
        <>
          <Bookmark className="w-4 h-4" />
          إضافة للمفضلة
        </>
      )}
    </button>
  );
}
