import React from "react";
import Link from "next/link";
import { Star, Clock } from "lucide-react";
import { WebtoonCard as WebtoonCardType } from "@/lib/types";

interface Props {
  webtoon: WebtoonCardType;
  showChapters?: boolean;
}

export default function WebtoonCard({ webtoon, showChapters = true }: Props) {
  const webtoonHref = `/webtoon/${webtoon.slug}`;

  return (
    <div className="group flex flex-col bg-dark-surface/60 hover:bg-dark-surface border border-dark-border/80 hover:border-brand-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1">
      
      {/* Poster Image Container */}
      <Link href={webtoonHref} className="relative aspect-[3/4] w-full overflow-hidden block bg-dark-card">
        <img
          src={webtoon.poster || "/placeholder.jpg"}
          alt={webtoon.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Rating Badge */}
        <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-accent-400 border border-white/10 shadow-md">
          <Star className="w-3.5 h-3.5 fill-accent-400" />
          <span>{webtoon.rating.toFixed(1)}</span>
        </div>

        {/* Type / Status Badge */}
        <div className="absolute top-2.5 left-2.5 bg-brand-600/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-semibold text-white shadow-md">
          {webtoon.type || "مانهوا"}
        </div>
      </Link>

      {/* Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={webtoonHref}>
            <h3 dir="auto" className="font-bold text-sm text-gray-100 group-hover:text-brand-400 transition-colors line-clamp-1 mb-1.5" title={webtoon.title}>
              {webtoon.title}
            </h3>
          </Link>

          {/* Genres summary tags */}
          {webtoon.genres && webtoon.genres.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {webtoon.genres.slice(0, 2).map((g) => (
                <Link
                  key={g.id}
                  href={`/genres/${g.slug}`}
                  className="text-[10px] text-gray-400 hover:text-white bg-dark-card px-1.5 py-0.5 rounded border border-dark-border/40 transition-colors"
                >
                  {g.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Latest Chapters list if enabled */}
        {showChapters && webtoon.latest_chapters && webtoon.latest_chapters.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-dark-border/50">
            {webtoon.latest_chapters.slice(0, 2).map((ch) => {
              const chSlug = ch.chapter_number || ch.slug;
              const chHref = `/webtoon/${webtoon.slug}/${chSlug}`;

              return (
                <Link
                  key={ch.id}
                  href={chHref}
                  className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-dark-card/60 hover:bg-brand-600/20 hover:text-brand-400 text-gray-300 transition-colors"
                >
                  <span className="font-medium truncate">{ch.title}</span>
                  {ch.date && (
                    <span className="text-[10px] text-gray-500 flex items-center gap-1 flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      {ch.date}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
