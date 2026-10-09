import React from "react";
import Link from "next/link";
import { getHomeData } from "@/lib/api";
import FeaturedSlider from "@/components/FeaturedSlider";
import WebtoonCard from "@/components/WebtoonCard";
import { Flame, Sparkles, TrendingUp, Tags, ChevronLeft } from "lucide-react";

export const revalidate = 60; // ISR 60 seconds

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Hero Featured Slider */}
      {data.featured && data.featured.length > 0 && (
        <FeaturedSlider items={data.featured} />
      )}

      {/* Main Grid: Latest Updates + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Content: Latest Chapters (3 Cols) */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b border-dark-border">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400">
                <Flame className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">أحدث الفصول المضافة</h2>
            </div>
            
            <Link
              href="/directory?sort=latest"
              className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1 group"
            >
              عرض الكل
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>

          {data.latest && data.latest.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 sm:gap-6">
              {data.latest.map((item) => (
                <WebtoonCard key={item.id} webtoon={item} showChapters={true} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-dark-surface rounded-2xl border border-dark-border text-gray-400">
              لا توجد أعمال مضافة حالياً.
            </div>
          )}

        </div>

        {/* Sidebar (1 Col): Top Popular & Genres */}
        <aside className="space-y-8">
          
          {/* Top Popular Widget */}
          <div className="bg-dark-surface/80 border border-dark-border rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-dark-border">
              <div className="p-1.5 rounded-lg bg-brand-500/20 text-brand-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white">الأكثر شعبية</h3>
            </div>

            <div className="space-y-3.5">
              {data.popular && data.popular.slice(0, 7).map((item, index) => (
                <Link
                  key={item.id}
                  href={`/webtoon/${item.slug}`}
                  className="flex items-center gap-3 group hover:bg-dark-card p-1.5 rounded-xl transition-colors"
                >
                  <span className={`w-6 h-6 flex-shrink-0 rounded-lg flex items-center justify-center font-black text-xs ${
                    index === 0
                      ? "bg-amber-500 text-black shadow-md shadow-amber-500/30"
                      : index === 1
                      ? "bg-slate-300 text-black"
                      : index === 2
                      ? "bg-amber-700 text-white"
                      : "bg-dark-card text-gray-400"
                  }`}>
                    {index + 1}
                  </span>

                  <img
                    src={item.poster || "/placeholder.jpg"}
                    alt={item.title}
                    className="w-12 h-16 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-200 group-hover:text-brand-400 truncate transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                      <span className="text-accent-400 font-semibold">★ {item.rating}</span>
                      <span>•</span>
                      <span>{item.type}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Genres Cloud */}
          {data.genres && data.genres.length > 0 && (
            <div className="bg-dark-surface/80 border border-dark-border rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-dark-border">
                <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Tags className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">التصنيفات</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {data.genres.map((g) => (
                  <Link
                    key={g.id}
                    href={`/genres/${g.slug}`}
                    className="px-3 py-1.5 text-xs bg-dark-card hover:bg-brand-600 hover:text-white text-gray-300 rounded-lg border border-dark-border/60 transition-colors flex items-center gap-1.5"
                  >
                    <span>{g.name}</span>
                    {g.count !== undefined && (
                      <span className="text-[10px] text-gray-400 bg-black/30 px-1.5 py-0.2 rounded-full">
                        {g.count}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </aside>

      </div>

    </div>
  );
}
