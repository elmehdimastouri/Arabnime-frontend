import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getChapterBySlug } from "@/lib/api";
import WebtoonReader from "@/components/WebtoonReader";
import JsonLd from "@/components/JsonLd";

export const revalidate = 120; // ISR 2 minutes

interface Props {
  params: {
    slug: string;
    chapter: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getChapterBySlug(params.slug, params.chapter);
  if (!data) {
    return {
      title: "الفصل غير موجود",
    };
  }

  const chapterNum = data.chapter_number || params.chapter;
  const webtoonTitle = data.webtoon.title;
  const canonicalUrl = `https://arabnime.com/webtoon/${data.webtoon.slug}/${data.slug || chapterNum}`;
  const desc = `اقرأ مانهوا ${webtoonTitle} الفصل ${chapterNum} مترجم بجودة فائقة HD وسرعة تصفح عالية بدون إعلانات مزعجة على منصة Arabnime.`;

  return {
    title: `مانهوا ${webtoonTitle} الفصل ${chapterNum} مترجم`,
    description: desc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${webtoonTitle} - الفصل ${chapterNum} | Arabnime`,
      description: desc,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: data.webtoon.poster,
          width: 720,
          height: 1024,
          alt: `${webtoonTitle} - الفصل ${chapterNum}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${webtoonTitle} - الفصل ${chapterNum}`,
      description: desc,
      images: [data.webtoon.poster],
    },
  };
}

export default async function WebtoonChapterPage({ params }: Props) {
  const data = await getChapterBySlug(params.slug, params.chapter);

  if (!data) {
    notFound();
  }

  const chapterNum = data.chapter_number || params.chapter;
  const canonicalUrl = `https://arabnime.com/webtoon/${data.webtoon.slug}/${data.slug || chapterNum}`;
  const seriesUrl = `https://arabnime.com/webtoon/${data.webtoon.slug}`;

  // Structured Data (ComicIssue & BreadcrumbList)
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
            "name": data.webtoon.title,
            "item": seriesUrl,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `الفصل ${chapterNum}`,
            "item": canonicalUrl,
          },
        ],
      },
      {
        "@type": "ComicIssue",
        "@id": `${canonicalUrl}#issue`,
        "url": canonicalUrl,
        "name": `${data.webtoon.title} - الفصل ${chapterNum}`,
        "issueNumber": chapterNum,
        "inLanguage": "ar",
        "partOfSeries": {
          "@type": "ComicSeries",
          "name": data.webtoon.title,
          "url": seriesUrl,
        },
        "image": data.webtoon.poster,
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <WebtoonReader data={data} />
    </>
  );
}
