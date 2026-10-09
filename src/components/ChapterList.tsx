"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ArrowUpDown, Clock, CheckCircle2 } from "lucide-react";
import { ChapterSummary } from "@/lib/types";
import { getReadingHistory } from "@/lib/storage";

interface Props {
  chapters: ChapterSummary[];
  webtoonId: number;
  webtoonSlug: string;
}

export default function ChapterList({ chapters, webtoonId, webtoonSlug }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDesc, setSortDesc] = useState(true);
  const [readChapterIds, setReadChapterIds] = useState<number[]>([]);

  useEffect(() => {
    const history = getReadingHistory();
    const read = history
      .filter((h) => h.webtoonId === webtoonId)
      .map((h) => h.chapterId);
    setReadChapterIds(read);
  }, [webtoonId]);

  // Filter
  const filtered = chapters.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.chapter_number.includes(searchTerm)
  );

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    const numA = parseFloat(a.chapter_number) || 0;
    const numB = parseFloat(b.chapter_number) || 0;
    return sortDesc ? numB - numA : numA - numB;
  });

  return (
    <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-white">قائمة الفصول</h3>
          <span className="text-xs bg-dark-card border border-dark-border px-2.5 py-0.5 rounded-full text-gray-400 font-semibold">
            {chapters.length} فصل
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search inside chapters */}
          <div className="relative flex-1 sm:w-48">
            <input
              type="text"
              placeholder="ابحث عن رقم الفصل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-card border border-dark-border rounded-lg py-1.5 pr-8 pl-3 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-brand-500"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2" />
          </div>

          {/* Sort Toggle */}
          <button
            onClick={() => setSortDesc(!sortDesc)}
            className="flex items-center gap-1.5 text-xs bg-dark-card hover:bg-dark-hover border border-dark-border px-3 py-1.5 rounded-lg text-gray-300 transition-colors flex-shrink-0"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-brand-400" />
            {sortDesc ? "الأحدث أولاً" : "الأقدم أولاً"}
          </button>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
        {sorted.length > 0 ? (
          sorted.map((chapter) => {
            const isRead = readChapterIds.includes(chapter.id);
            const chapterSlug = chapter.chapter_number || chapter.slug;
            const chapterHref = `/webtoon/${webtoonSlug}/${chapterSlug}`;

            return (
              <Link
                key={chapter.id}
                href={chapterHref}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isRead
                    ? "bg-dark-card/30 border-dark-border/40 text-gray-500 hover:text-gray-300"
                    : "bg-dark-card/80 hover:bg-brand-600/10 border-dark-border hover:border-brand-500/50 text-gray-200 hover:text-brand-300"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {isRead && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
                  <span className="font-bold text-sm truncate">{chapter.title}</span>
                </div>

                {chapter.date && (
                  <span className="text-[11px] text-gray-500 flex-shrink-0 flex items-center gap-1 mr-2">
                    <Clock className="w-3 h-3" />
                    {chapter.date}
                  </span>
                )}
              </Link>
            );
          })
        ) : (
          <div className="col-span-full py-8 text-center text-sm text-gray-400">
            لم يتم العثور على أي فصل يطابق البحث.
          </div>
        )}
      </div>

    </div>
  );
}
