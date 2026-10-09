import { MetadataRoute } from "next";
import { getAllWebtoonsForSitemap, getGenres } from "@/lib/api";

export const revalidate = 3600; // Generate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://arabnime.com";
  const now = new Date();

  // Static core routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "always",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/directory`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bookmarks`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/dmca`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  try {
    const [webtoons, genres] = await Promise.all([
      getAllWebtoonsForSitemap(),
      getGenres(),
    ]);

    // Genre archive pages
    genres.forEach((g) => {
      routes.push({
        url: `${baseUrl}/genres/${g.slug}`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.7,
      });
    });

    // Webtoon details and chapter reader pages
    webtoons.forEach((w) => {
      // Main webtoon page
      routes.push({
        url: `${baseUrl}/webtoon/${w.slug}`,
        lastModified: w.updated_at ? new Date(w.updated_at) : now,
        changeFrequency: "daily",
        priority: 0.9,
      });

      // Individual chapters
      if (w.chapters && w.chapters.length > 0) {
        w.chapters.forEach((ch) => {
          const chSlug = ch.chapter_number || ch.slug;
          routes.push({
            url: `${baseUrl}/webtoon/${w.slug}/${chSlug}`,
            lastModified: ch.date ? new Date(ch.date) : now,
            changeFrequency: "weekly",
            priority: 0.8,
          });
        });
      }
    });
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
  }

  return routes;
}
