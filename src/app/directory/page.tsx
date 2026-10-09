import React from "react";
import Link from "next/link";
import { getWebtoons, getGenres } from "@/lib/api";
import WebtoonCard from "@/components/WebtoonCard";
import { Filter, Layers } from "lucide-react";

export const revalidate = 60;

interface Props {
  searchParams: {
    page?: string;
    genre?: string;
    status?: string;
    sort?: string;
    q?: string;
  };
}

export default async function DirectoryPage({ searchParams }: Props) {
  const page = parseInt(searchParams.page || "1", 10);
  const genre = searchParams.genre || "";
  const status = searchParams.status || "";
  const sort = searchParams.sort || "latest";
  const q = searchParams.q || "";

  const [{ items, total, totalPages }, genres] = await Promise.all([
    getWebtoons({ page, per_page: 24, genre, status, sort, q }),
    getGenres(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Layers className="w-7 h-7 text-brand-400" />
            دليل المانهوا والويب تون
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            تصفح واستكشف الأعمال المترجمة، فلتر حسب تصنيفك المفضل
          </p>
        </div>

        <div className="text-xs text-gray-400 font-semibold bg-dark-card border border-dark-border px-3 py-1.5 rounded-xl self-start sm:self-auto">
          إجمالي الأعمال: {total}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-dark-surface/90 border border-dark-border rounded-2xl p-5 shadow-xl space-y-4">
        
        <div className="flex items-center gap-2 text-sm font-bold text-gray-200">
          <Filter className="w-4 h-4 text-brand-400" />
          تصفية وفلترة الأعمال
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Status Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">الحالة</label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "الكل", val: "" },
                { label: "مستمر", val: "Ongoing" },
                { label: "مكتمل", val: "Completed" },
              ].map((s) => (
                <Link
                  key={s.val}
                  href={`/directory?status=${s.val}&genre=${genre}&sort=${sort}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    status === s.val
                      ? "bg-brand-600 text-white"
                      : "bg-dark-card text-gray-300 hover:bg-dark-hover"
                  }`}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">الترتيب</label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "الأحدث", val: "latest" },
                { label: "الأعلى مشاهدة", val: "popular" },
                { label: "التقييم", val: "rating" },
              ].map((s) => (
                <Link
                  key={s.val}
                  href={`/directory?sort=${s.val}&genre=${genre}&status=${status}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    sort === s.val
                      ? "bg-brand-600 text-white"
                      : "bg-dark-card text-gray-300 hover:bg-dark-hover"
                  }`}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Genres Pill Bar */}
        {genres.length > 0 && (
          <div className="pt-3 border-t border-dark-border/60">
            <label className="block text-xs font-semibold text-gray-400 mb-2">التصنيف</label>
            <div className="flex flex-wrap gap-1.5">
              <Link
                href={`/directory?genre=&status=${status}&sort=${sort}`}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  genre === ""
                    ? "bg-brand-600 text-white"
                    : "bg-dark-card text-gray-300 hover:bg-dark-hover border border-dark-border/50"
                }`}
              >
                جميع التصنيفات
              </Link>
              {genres.map((g) => (
                <Link
                  key={g.id}
                  href={`/directory?genre=${g.slug}&status=${status}&sort=${sort}`}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    genre === g.slug
                      ? "bg-brand-600 text-white"
                      : "bg-dark-card text-gray-300 hover:bg-dark-hover border border-dark-border/50"
                  }`}
                >
                  {g.name}
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Webtoons Grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {items.map((item) => (
            <WebtoonCard key={item.id} webtoon={item} showChapters={true} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center bg-dark-surface rounded-2xl border border-dark-border text-gray-400">
          لا توجد أعمال تطابق الفلاتر المحددة حالياً.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/directory?page=${p}&genre=${genre}&status=${status}&sort=${sort}`}
              className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-colors ${
                p === page
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
                  : "bg-dark-card hover:bg-dark-hover text-gray-300 border border-dark-border"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}
