"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, BookOpen, ChevronRight, ChevronLeft } from "lucide-react";
import { WebtoonCard } from "@/lib/types";

interface Props {
  items: WebtoonCard[];
}

export default function FeaturedSlider({ items }: Props) {
  const [current, setCurrent] = useState(0);

  if (!items || items.length === 0) return null;

  const active = items[current];

  const nextSlide = () => setCurrent((prev) => (prev + 1) % items.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-dark-surface border border-dark-border/80 shadow-2xl mb-12 min-h-[380px] sm:min-h-[440px] flex items-center">
      
      {/* Background Banner with Heavy Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={active.banner || active.poster}
          alt={active.title}
          className="w-full h-full object-cover filter blur-2xl opacity-25 scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080c14] via-[#080c14]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent" />
      </div>

      {/* Content Grid */}
      <div className="relative z-10 max-w-6xl mx-auto p-6 sm:p-10 w-full flex flex-col-reverse md:flex-row items-center gap-8 justify-between">
        
        {/* Info Column */}
        <div className="flex-1 space-y-4 text-right">
          
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-600/30 text-brand-400 border border-brand-500/30">
              عمل مميز 🔥
            </span>
            <div className="flex items-center gap-1 text-sm font-bold text-accent-400 bg-black/40 px-2.5 py-0.5 rounded-lg border border-white/5">
              <Star className="w-4 h-4 fill-accent-400" />
              <span>{active.rating.toFixed(1)}</span>
            </div>
          </div>

          <h1 dir="auto" className="text-2xl sm:text-4xl font-black text-white leading-tight">
            {active.title}
          </h1>

          {active.alt_title && (
            <p dir="auto" className="text-xs sm:text-sm text-gray-400 line-clamp-1 italic">
              {active.alt_title}
            </p>
          )}

          {/* Genres */}
          {active.genres && active.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {active.genres.map((g) => (
                <Link
                  key={g.id}
                  href={`/genres/${g.slug}`}
                  className="px-2.5 py-1 text-xs rounded-lg bg-dark-card/90 hover:bg-brand-600 text-gray-300 hover:text-white border border-dark-border/60 transition-colors"
                >
                  {g.name}
                </Link>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <Link
              href={`/webtoon/${active.slug}`}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-600/25 transition-all flex items-center gap-2 hover:scale-105"
            >
              <BookOpen className="w-4 h-4" />
              ابدأ القراءة الآن
            </Link>

            <Link
              href={`/webtoon/${active.slug}`}
              className="px-5 py-3 rounded-xl bg-dark-card/80 hover:bg-dark-hover border border-dark-border text-gray-300 hover:text-white font-semibold text-sm transition-colors"
            >
              تفاصيل العمل
            </Link>
          </div>

        </div>

        {/* Poster Column */}
        <div className="flex-shrink-0 relative group">
          <Link href={`/webtoon/${active.slug}`} className="block w-44 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10 group-hover:scale-105 transition-transform duration-500 bg-dark-card">
            <img
              src={active.poster}
              alt={active.title}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>

      </div>

      {/* Slider Controls */}
      {items.length > 1 && (
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-9 h-9 rounded-full bg-dark-card/80 hover:bg-brand-600 text-gray-300 hover:text-white border border-dark-border flex items-center justify-center transition-colors"
            aria-label="Previous slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-9 h-9 rounded-full bg-dark-card/80 hover:bg-brand-600 text-gray-300 hover:text-white border border-dark-border flex items-center justify-center transition-colors"
            aria-label="Next slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      )}

    </div>
  );
}
