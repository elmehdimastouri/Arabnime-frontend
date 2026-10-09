import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWebtoonBySlug } from "@/lib/api";
import BookmarkButton from "@/components/BookmarkButton";
import ChapterList from "@/components/ChapterList";
import WebtoonCard from "@/components/WebtoonCard";
import JsonLd from "@/components/JsonLd";
import { Star, Eye, Calendar, User, Palette, BookOpen, Layers, Sparkles } from "lucide-react";

export const revalidate = 30; // ISR 30 seconds

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const webtoon = await getWebtoonBySlug(params.slug);
  if (!webtoon) {
    return {
      title: "عمل غير موجود",
    };
  }

  const cleanDescription = webtoon.synopsis
    ? webtoon.synopsis.replace(/<[^>]*>?/gm, "").slice(0, 160).trim() + "..."
    : `قراءة مانهوا ${webtoon.title} مترجمة لجميع الفصول بأعلى جودة وسرعة تصفح فائقة على Arabnime.`;

  const canonicalUrl = `https://arabnime.com/webtoon/${webtoon.slug}`;

  return {
    title: `مانهوا ${webtoon.title} مترجمة - جميع الفصول`,
    description: cleanDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `مانهوا ${webtoon.title} مترجمة | Arabnime`,
      description: cleanDescription,
      url: canonicalUrl,
      type: "book",
      images: [
        {
          url: webtoon.poster,
          width: 720,
          height: 1024,
          alt: `غلاف مانهوا ${webtoon.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `مانهوا ${webtoon.title} مترجمة - Arabnime`,
      description: cleanDescription,
      images: [webtoon.poster],
    },
  };
}

export default async function WebtoonDetailPage({ params }: Props) {
  const webtoon = await getWebtoonBySlug(params.slug);

  if (!webtoon) {
    notFound();
  }

  const firstChapterSlug = webtoon.first_chapter?.chapter_number || webtoon.first_chapter?.slug || (webtoon.chapters?.[0]?.chapter_number || "1");
  const latestChapterSlug = webtoon.latest_chapter?.chapter_number || webtoon.latest_chapter?.slug || (webtoon.chapters?.[webtoon.chapters.length - 1]?.chapter_number || "");
  const canonicalUrl = `https://arabnime.com/webtoon/${webtoon.slug}`;

  // Structured Data (Schema.org ComicSeries & Breadcrumbs)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "الرئيسية",
            "item": "https://arabnime.com",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "دليل المانهوا",
            "item": "https://arabnime.com/directory",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": webtoon.title,
            "item": canonicalUrl,
          },
        ],
      },
      {
        "@type": "ComicSeries",
        "@id": `${canonicalUrl}#series`,
        "url": canonicalUrl,
        "name": webtoon.title,
        "alternateName": webtoon.alt_title || undefined,
        "description": webtoon.synopsis ? webtoon.synopsis.replace(/<[^>]*>?/gm, "").trim() : undefined,
        "image": webtoon.poster,
        "genre": webtoon.genres?.map((g) => g.name),
        "author": {
          "@type": "Person",
          "name": webtoon.author || "Unknown",
        },
        "illustrator": {
          "@type": "Person",
          "name": webtoon.artist || "Unknown",
        },
        "inLanguage": "ar",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": webtoon.rating || 9.5,
          "bestRating": 10,
          "worstRating": 1,
          "ratingCount": Math.max(1, webtoon.views || 25),
        },
      },
    ],
  };

  return (
    <article className="min-h-screen pb-16">
      <JsonLd data={structuredData} />
      
      {/* Hero Backdrop Banner */}
      <div className="relative w-full h-80 sm:h-96 overflow-hidden bg-dark-card border-b border-dark-border">
        <img
          src={webtoon.banner || webtoon.poster}
          alt={`بانر خلفية ${webtoon.title}`}
          className="w-full h-full object-cover filter blur-3xl opacity-30 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/70 to-transparent" />
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-44 sm:-mt-52 relative z-10 space-y-10">
        
        {/* Top Header Card */}
        <header className="flex flex-col md:flex-row gap-8 items-start bg-dark-surface/90 border border-dark-border/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {/* Cover Poster */}
          <div className="w-52 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex-shrink-0 mx-auto md:mx-0 bg-dark-card">
            <img
              src={webtoon.poster}
              alt={`غلاف مانهوا ${webtoon.title}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Details & Actions */}
          <div className="flex-1 space-y-5 text-right w-full">
            
            {/* Status & Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-brand-600 text-white">
                {webtoon.type || "مانهوا"}
              </span>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                webtoon.status === "Completed"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-blue-500/20 text-blue-400 border-blue-500/30"
              }`}>
                {webtoon.status === "Completed" ? "مكتمل" : "مستمر"}
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-black/40 text-accent-400 border border-white/10">
                <Star className="w-3.5 h-3.5 fill-accent-400" />
                <span>{webtoon.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-black/40 text-gray-400 border border-white/10">
                <Eye className="w-3.5 h-3.5" />
                <span>{webtoon.views.toLocaleString()} مشاهدة</span>
              </div>
            </div>

            {/* Titles */}
            <div>
              <h1 dir="auto" className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {webtoon.title}
              </h1>
              {webtoon.alt_title && (
                <p dir="auto" className="text-sm text-gray-400 mt-1 italic">
                  {webtoon.alt_title}
                </p>
              )}
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-dark-border/60 text-xs">
              <div className="flex items-center gap-2 text-gray-400">
                <User className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <div>
                  <div className="text-gray-500 text-[10px]">المؤلف</div>
                  <div className="font-semibold text-gray-200 truncate">{webtoon.author}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Palette className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <div>
                  <div className="text-gray-500 text-[10px]">الرسام</div>
                  <div className="font-semibold text-gray-200 truncate">{webtoon.artist}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-gray-500 text-[10px]">سنة الإصدار</div>
                  <div className="font-semibold text-gray-200">{webtoon.release_year || "2024"}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Layers className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <div className="text-gray-500 text-[10px]">عدد الفصول</div>
                  <div className="font-semibold text-gray-200">{webtoon.total_chapters}</div>
                </div>
              </div>
            </div>

            {/* Genres */}
            {webtoon.genres && webtoon.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {webtoon.genres.map((g) => (
                  <Link
                    key={g.id}
                    href={`/genres/${g.slug}`}
                    className="px-3 py-1 rounded-lg text-xs bg-dark-card hover:bg-brand-600 hover:text-white text-gray-300 border border-dark-border/60 transition-colors"
                  >
                    {g.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {firstChapterSlug && (
                <Link
                  href={`/webtoon/${webtoon.slug}/${firstChapterSlug}`}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-600/25 transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  ابدأ القراءة (أول فصل)
                </Link>
              )}

              {latestChapterSlug && latestChapterSlug !== firstChapterSlug && (
                <Link
                  href={`/webtoon/${webtoon.slug}/${latestChapterSlug}`}
                  className="px-5 py-3 rounded-xl bg-dark-card hover:bg-dark-hover border border-dark-border text-gray-200 font-semibold text-sm transition-colors"
                >
                  أحدث فصل
                </Link>
              )}

              <BookmarkButton webtoon={webtoon} />
            </div>

          </div>

        </header>

        {/* Synopsis */}
        {webtoon.synopsis && (
          <section className="bg-dark-surface/80 border border-dark-border rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-3">قصة عمل {webtoon.title}</h2>
            <div
              className="text-sm sm:text-base text-gray-300 leading-relaxed space-y-3 prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: webtoon.synopsis }}
            />
          </section>
        )}

        {/* Full Chapters List */}
        <section>
          <ChapterList chapters={webtoon.chapters} webtoonId={webtoon.id} webtoonSlug={webtoon.slug} />
        </section>

        {/* Related / Similar Webtoons */}
        {webtoon.related && webtoon.related.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-dark-border/60">
            <div className="flex items-center justify-between pb-3 border-b border-dark-border">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">أعمال مشابهة قد تعجبك</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {webtoon.related.map((item) => (
                <WebtoonCard key={item.id} webtoon={item} showChapters={true} />
              ))}
            </div>
          </section>
        )}

      </div>

    </article>
  );
}
