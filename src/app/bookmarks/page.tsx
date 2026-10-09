"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, Clock, BookOpen, Trash2, ArrowLeft } from "lucide-react";
import { WebtoonCard, HistoryItem } from "@/lib/types";
import { getBookmarks, getReadingHistory, toggleBookmark } from "@/lib/storage";

export default function BookmarksAndHistoryPage() {
  const [activeTab, setActiveTab] = useState<"history" | "bookmarks">("history");
  const [bookmarks, setBookmarks] = useState<WebtoonCard[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setBookmarks(getBookmarks());
    setHistory(getReadingHistory());
  }, []);

  const handleRemoveBookmark = (item: WebtoonCard) => {
    toggleBookmark(item);
    setBookmarks(getBookmarks());
  };

  const handleClearHistory = () => {
    if (confirm("هل أنت متأكد من رغبتك في مسح سجل القراءة بالكامل؟")) {
      localStorage.removeItem("arabnime_history");
      setHistory([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            المكتبة الشخصية
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            تابع قراءة مانهواتك المفضلة وسجل الفصول السابقة المحفوظة في متصفحك
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 bg-dark-surface p-1 rounded-xl border border-dark-border">
          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "history"
                ? "bg-brand-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Clock className="w-4 h-4" />
            سجل القراءة ({history.length})
          </button>

          <button
            onClick={() => setActiveTab("bookmarks")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "bookmarks"
                ? "bg-brand-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            المفضلة ({bookmarks.length})
          </button>
        </div>
      </div>

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="space-y-4">
          {history.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={handleClearHistory}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                مسح السجل
              </button>
            </div>
          )}

          {history.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-dark-surface border border-dark-border hover:border-brand-500/50 rounded-2xl p-4 flex gap-4 items-center group transition-all"
                >
                  <img
                    src={item.webtoonPoster || "/placeholder.jpg"}
                    alt={item.webtoonTitle}
                    className="w-16 h-22 object-cover rounded-xl flex-shrink-0 bg-dark-card"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <Link
                      href={`/webtoon/${item.webtoonSlug}`}
                      className="font-bold text-sm text-gray-100 group-hover:text-brand-400 truncate block transition-colors"
                    >
                      {item.webtoonTitle}
                    </Link>
                    <div className="text-xs text-brand-400 font-semibold">
                      آخر قراءة: {item.chapterTitle}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {new Date(item.readAt).toLocaleDateString("ar-EG", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/webtoon/${item.webtoonSlug}/${item.chapterSlug || item.chapterNumber}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        متابعة القراءة
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center bg-dark-surface rounded-2xl border border-dark-border text-gray-400">
              <Clock className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              لا يوجد سجل قراءة حتى الآن. ابدأ بقراءة بعض الفصول وستظهر هنا تلقائياً!
            </div>
          )}
        </div>
      )}

      {/* Bookmarks Tab */}
      {activeTab === "bookmarks" && (
        <div>
          {bookmarks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {bookmarks.map((item) => (
                <div key={item.id} className="relative group">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl block bg-dark-card border border-dark-border">
                    <img
                      src={item.poster || "/placeholder.jpg"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <button
                      onClick={() => handleRemoveBookmark(item)}
                      className="absolute top-2 left-2 p-1.5 rounded-lg bg-black/70 hover:bg-red-600 text-white transition-colors"
                      title="إزالة من المفضلة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <Link href={`/webtoon/${item.slug}`} className="block mt-2">
                    <h3 className="font-bold text-xs text-gray-200 group-hover:text-brand-400 truncate">
                      {item.title}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center bg-dark-surface rounded-2xl border border-dark-border text-gray-400">
              <Bookmark className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              لم تقم بإضافة أي عمل إلى المفضلة بعد.
            </div>
          )}
        </div>
      )}

    </div>
  );
}
