"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Maximize2,
  Minimize2,
  ListFilter,
  CheckCircle,
  ArrowUp,
} from "lucide-react";
import { ChapterReaderData } from "@/lib/types";
import { saveReadingProgress } from "@/lib/storage";

interface Props {
  data: ChapterReaderData;
}

export default function WebtoonReader({ data }: Props) {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [maxWidth, setMaxWidth] = useState<number>(850);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [chapterMenuOpen, setChapterMenuOpen] = useState(false);

  const currentChapterSlug = data.chapter_number || data.slug;

  // Save progress on mount
  useEffect(() => {
    saveReadingProgress({
      webtoonId: data.webtoon.id,
      webtoonTitle: data.webtoon.title,
      webtoonSlug: data.webtoon.slug,
      webtoonPoster: data.webtoon.poster,
      chapterId: data.id,
      chapterNumber: data.chapter_number,
      chapterSlug: currentChapterSlug,
      chapterTitle: data.title,
      readAt: new Date().toISOString(),
    });
  }, [data, currentChapterSlug]);

  // Scroll Progress and Scroll-to-top Listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
      setShowScrollTop(scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleWidth = () => {
    if (maxWidth === 750) setMaxWidth(950);
    else if (maxWidth === 950) setMaxWidth(1200);
    else setMaxWidth(750);
  };

  const getChapterHref = (slugOrNum?: string) => {
    return `/webtoon/${data.webtoon.slug}/${slugOrNum || ""}`;
  };

  return (
    <div className="min-h-screen bg-[#05080e] flex flex-col justify-between selection:bg-none">
      
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-dark-card z-50">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Reader Top Bar */}
      <header className={`sticky top-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-b border-dark-border transition-transform duration-300 ${
        controlsVisible ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          
          {/* Back to Webtoon & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={`/webtoon/${data.webtoon.slug}`}
              className="p-1.5 rounded-lg bg-dark-card hover:bg-dark-hover text-gray-300 hover:text-white border border-dark-border transition-colors flex-shrink-0"
              title="العودة لصفحة العمل"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="truncate">
              <Link href={`/webtoon/${data.webtoon.slug}`} className="hover:underline">
                <h1 dir="auto" className="text-sm font-bold text-white truncate">
                  {data.webtoon.title}
                </h1>
              </Link>
              <span dir="auto" className="text-xs text-brand-400 font-semibold block">
                {data.title}
              </span>
            </div>
          </div>

          {/* Chapter Quick Switcher & Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            
            {/* Width Toggle */}
            <button
              onClick={toggleWidth}
              className="hidden sm:flex p-2 rounded-lg bg-dark-card hover:bg-dark-hover border border-dark-border text-gray-300 hover:text-white transition-colors"
              title="تغيير عرض القراءة"
            >
              {maxWidth >= 1000 ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Chapters Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setChapterMenuOpen(!chapterMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-card hover:bg-dark-hover border border-dark-border text-xs font-semibold text-gray-200 transition-colors"
              >
                <ListFilter className="w-3.5 h-3.5 text-brand-400" />
                <span>تبديل الفصل</span>
              </button>

              {chapterMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 max-h-72 overflow-y-auto bg-dark-surface border border-dark-border rounded-xl shadow-2xl p-2 z-50 divide-y divide-dark-border/40">
                  {data.all_chapters && data.all_chapters.map((ch) => {
                    const chSlug = ch.chapter_number || ch.slug;
                    const isCurrent = ch.id === data.id;

                    return (
                      <button
                        key={ch.id}
                        onClick={() => {
                          setChapterMenuOpen(false);
                          router.push(getChapterHref(chSlug));
                        }}
                        className={`w-full text-right p-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                          isCurrent
                            ? "bg-brand-600/30 text-brand-300 font-bold"
                            : "text-gray-300 hover:bg-dark-card"
                        }`}
                      >
                        <span>{ch.title}</span>
                        {isCurrent && <CheckCircle className="w-3.5 h-3.5 text-brand-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Prev Chapter */}
            {data.prev_chapter ? (
              <Link
                href={getChapterHref(data.prev_chapter.chapter_number || data.prev_chapter.slug)}
                className="p-1.5 rounded-lg bg-dark-card hover:bg-brand-600 border border-dark-border text-gray-200 hover:text-white transition-colors"
                title="الفصل السابق"
              >
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="p-1.5 rounded-lg bg-dark-card/30 border border-dark-border/30 text-gray-600 cursor-not-allowed">
                <ChevronRight className="w-4 h-4" />
              </span>
            )}

            {/* Next Chapter */}
            {data.next_chapter ? (
              <Link
                href={getChapterHref(data.next_chapter.chapter_number || data.next_chapter.slug)}
                className="p-1.5 rounded-lg bg-dark-card hover:bg-brand-600 border border-dark-border text-gray-200 hover:text-white transition-colors"
                title="الفصل التالي"
              >
                <ChevronLeft className="w-4 h-4" />
              </Link>
            ) : (
              <span className="p-1.5 rounded-lg bg-dark-card/30 border border-dark-border/30 text-gray-600 cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
              </span>
            )}

          </div>

        </div>
      </header>

      {/* Main Reader View (Continuous Scroll) */}
      <main
        className="flex-1 mx-auto w-full py-4 transition-all duration-300"
        style={{ maxWidth: `${maxWidth}px` }}
        onClick={() => setControlsVisible(!controlsVisible)}
      >
        {data.images && data.images.length > 0 ? (
          <div className="flex flex-col items-center shadow-2xl bg-black">
            {data.images.map((imgUrl, idx) => (
              <div key={idx} className="w-full relative min-h-[300px] flex items-center justify-center bg-[#070b13]">
                <img
                  src={imgUrl}
                  alt={`${data.title} - صفحة ${idx + 1}`}
                  loading={idx < 3 ? "eager" : "lazy"}
                  className="w-full h-auto block select-none pointer-events-none"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center bg-dark-surface rounded-2xl border border-dark-border my-12">
            <p className="text-gray-300 text-base mb-2">لا توجد صور متوفرة لهذا الفصل حالياً.</p>
            <p className="text-xs text-gray-500">يرجى التأكد من مسار الفصل في سحابة Cloudflare R2.</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation Toolbar */}
      <footer className="bg-dark-surface border-t border-dark-border py-8 px-4 mt-8">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-white">انتهى {data.title}</h3>
            <p className="text-xs text-gray-400">تابع مغامرات {data.webtoon.title}</p>
          </div>

          <div className="flex items-center justify-center gap-4 w-full">
            {data.prev_chapter && (
              <Link
                href={getChapterHref(data.prev_chapter.chapter_number || data.prev_chapter.slug)}
                className="flex-1 max-w-[200px] py-3 px-4 rounded-xl bg-dark-card hover:bg-dark-hover border border-dark-border text-center text-sm font-bold text-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronRight className="w-4 h-4" />
                الفصل السابق
              </Link>
            )}

            <Link
              href={`/webtoon/${data.webtoon.slug}`}
              className="py-3 px-5 rounded-xl bg-dark-card hover:bg-dark-hover border border-dark-border text-xs font-semibold text-gray-300 transition-colors"
            >
              قائمة الفصول
            </Link>

            {data.next_chapter && (
              <Link
                href={getChapterHref(data.next_chapter.chapter_number || data.next_chapter.slug)}
                className="flex-1 max-w-[200px] py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-center text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2"
              >
                الفصل التالي
                <ChevronLeft className="w-4 h-4" />
              </Link>
            )}
          </div>

        </div>
      </footer>

      {/* Floating Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="الرجوع للأعلى"
        className={`fixed bottom-6 left-6 z-50 p-3 rounded-full bg-brand-600/90 hover:bg-brand-500 text-white shadow-xl shadow-brand-900/50 backdrop-blur-md border border-brand-400/30 transition-all duration-300 transform ${
          showScrollTop
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-12 opacity-0 scale-75 pointer-events-none"
        }`}
        title="الرجوع للأعلى"
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      </button>

    </div>
  );
}
