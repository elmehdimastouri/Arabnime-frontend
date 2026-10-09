import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWebtoons, getGenres } from "@/lib/api";
import WebtoonCard from "@/components/WebtoonCard";
import JsonLd from "@/components/JsonLd";
import { Tag } from "lucide-react";

export const revalidate = 60;

interface Props {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const allGenres = await getGenres();
  const currentGenre = allGenres.find((g) => g.slug === params.slug);
  const genreTitle = currentGenre ? currentGenre.name : params.slug;

  const canonicalUrl = `https://arabnime.com/genres/${params.slug}`;
  const desc = `تصفح وقراءة جميع أعمال المانهوا والويب تون التابعة لتصنيف ${genreTitle} المترجمة للعربية بجودة عالية على Arabnime.`;

  return {
    title: `مانهوا ${genreTitle} - تصفح أعمال تصنيف ${genreTitle}`,
    description: desc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `مانهوا تصنيف ${genreTitle} | Arabnime`,
      description: desc,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function GenreArchivePage({ params, searchParams }: Props) {
  const page = parseInt(searchParams.page || "1", 10);
  const genreSlug = params.slug;

  const [{ items, total, totalPages }, allGenres] = await Promise.all([
    getWebtoons({ page, per_page: 24, genre: genreSlug }),
    getGenres(),
  ]);

  const currentGenre = allGenres.find((g) => g.slug === genreSlug);
  const genreTitle = currentGenre ? currentGenre.name : genreSlug;
  const canonicalUrl = `https://arabnime.com/genres/${genreSlug}`;

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
            "name": "التصنيفات",
            "item": "https://arabnime.com/directory",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": genreTitle,
            "item": canonicalUrl,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "name": `مانهوا تصنيف ${genreTitle}`,
        "inLanguage": "ar",
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <JsonLd data={structuredData} />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-border">
        <div>
          <nav aria-label="مسار التنقل" className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <Link href="/" className="hover:text-brand-400">الرئيسية</Link>
            <span>/</span>
            <Link href="/directory" className="hover:text-brand-400">التصنيفات</Link>
            <span>/</span>
            <span className="text-brand-400 font-semibold">{genreTitle}</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Tag className="w-6 h-6 text-brand-400" />
            تصنيف: {genreTitle}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            جميع أعمال المانهوا والويب تون التابعة لتصنيف {genreTitle}
          </p>
        </div>

        <div className="text-xs text-gray-400 font-semibold bg-dark-card border border-dark-border px-3 py-1.5 rounded-xl self-start sm:self-auto">
          الأعمال المتاحة: {total}
        </div>
      </div>

      {/* Genres Pill Bar */}
      <div className="flex flex-wrap gap-2 pb-2">
        {allGenres.map((g) => (
          <Link
            key={g.id}
            href={`/genres/${g.slug}`}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
              g.slug === genreSlug
                ? "bg-brand-600 text-white border-brand-500 shadow-md shadow-brand-600/30"
                : "bg-dark-card text-gray-300 hover:bg-dark-hover border-dark-border/60"
            }`}
          >
            {g.name}
          </Link>
        ))}
      </div>

      {/* Grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {items.map((item) => (
            <WebtoonCard key={item.id} webtoon={item} showChapters={true} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center bg-dark-surface rounded-2xl border border-dark-border text-gray-400">
          لا توجد أعمال مضافة تحت هذا التصنيف حتى الآن.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/genres/${genreSlug}?page=${p}`}
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
