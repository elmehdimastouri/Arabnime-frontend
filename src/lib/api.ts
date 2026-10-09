import { HomePayload, WebtoonCard, WebtoonDetail, ChapterReaderData, Genre } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_WP_API_URL || "https://admin.arabnime.com/wp-json/arabnime/v1";

/**
 * Fetch Home page bundle (Single roundtrip)
 */
export async function getHomeData(): Promise<HomePayload> {
  try {
    const res = await fetch(`${API_BASE}/home`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch home data");
    return await res.json();
  } catch (error) {
    console.error("Error in getHomeData:", error);
    return { featured: [], latest: [], popular: [], genres: [] };
  }
}

/**
 * Fetch Webtoons directory with filters
 */
export async function getWebtoons(params: {
  page?: number;
  per_page?: number;
  genre?: string;
  status?: string;
  sort?: string;
  q?: string;
} = {}): Promise<{ items: WebtoonCard[]; total: number; totalPages: number }> {
  try {
    const query = new URLSearchParams();
    if (params.page) query.set("page", params.page.toString());
    if (params.per_page) query.set("per_page", params.per_page.toString());
    if (params.genre) query.set("genre", params.genre);
    if (params.status) query.set("status", params.status);
    if (params.sort) query.set("sort", params.sort);
    if (params.q) query.set("q", params.q);

    const res = await fetch(`${API_BASE}/webtoons?${query.toString()}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch webtoons");

    const total = parseInt(res.headers.get("X-WP-Total") || "0", 10);
    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
    const items = await res.json();

    return { items, total, totalPages };
  } catch (error) {
    console.error("Error in getWebtoons:", error);
    return { items: [], total: 0, totalPages: 1 };
  }
}

/**
 * Fetch single webtoon by slug or ID
 */
export async function getWebtoonBySlug(slug: string): Promise<WebtoonDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/webtoons/${encodeURIComponent(slug)}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    const data: WebtoonDetail = await res.json();

    // Ensure related works are populated
    if (!data.related || data.related.length === 0) {
      const primaryGenre = data.genres?.[0]?.slug;
      const relatedQuery = await getWebtoons({
        genre: primaryGenre,
        per_page: 7,
      });
      data.related = relatedQuery.items.filter((item) => item.id !== data.id);

      if (data.related.length < 6) {
        const popular = await getWebtoons({ sort: "popular", per_page: 7 });
        const existingIds = new Set([data.id, ...data.related.map((r) => r.id)]);
        const extra = popular.items.filter((item) => !existingIds.has(item.id));
        data.related = [...data.related, ...extra].slice(0, 6);
      }
    }

    return data;
  } catch (error) {
    console.error(`Error in getWebtoonBySlug(${slug}):`, error);
    return null;
  }
}

/**
 * Fetch chapter data by exact WordPress theme permalinks:
 * /webtoon/{webtoon-slug}/{chapter-slug}/
 */
export async function getChapterBySlug(webtoonSlug: string, chapterSlug: string): Promise<ChapterReaderData | null> {
  try {
    // 1. Try slug endpoint
    const res = await fetch(`${API_BASE}/webtoon/${encodeURIComponent(webtoonSlug)}/${encodeURIComponent(chapterSlug)}`, {
      next: { revalidate: 120 },
    });
    if (res.ok) {
      return await res.json();
    }

    // 2. Resolve chapter from webtoon chapters list
    const webtoon = await getWebtoonBySlug(webtoonSlug);
    if (webtoon && webtoon.chapters) {
      const match = webtoon.chapters.find(
        (c) =>
          c.slug === chapterSlug ||
          c.chapter_number === chapterSlug ||
          c.id.toString() === chapterSlug ||
          chapterSlug.endsWith(`-${c.chapter_number}`)
      );
      if (match) {
        return await getChapterData(match.id);
      }
    }

    // 3. Fallback to chapter ID if chapterSlug is numeric
    if (/^\d+$/.test(chapterSlug)) {
      const fallbackRes = await fetch(`${API_BASE}/chapters/${chapterSlug}`, {
        next: { revalidate: 120 },
      });
      if (fallbackRes.ok) {
        return await fallbackRes.json();
      }
    }

    return null;
  } catch (error) {
    console.error(`Error in getChapterBySlug(${webtoonSlug}, ${chapterSlug}):`, error);
    return null;
  }
}

/**
 * Fetch chapter data by numeric chapter ID
 */
export async function getChapterData(id: string | number): Promise<ChapterReaderData | null> {
  try {
    const res = await fetch(`${API_BASE}/chapters/${id}`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Error in getChapterData(${id}):`, error);
    return null;
  }
}

/**
 * Live instant search
 */
export async function searchWebtoons(query: string): Promise<WebtoonCard[]> {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error in searchWebtoons:", error);
    return [];
  }
}

/**
 * Fetch all genres
 */
export async function getGenres(): Promise<Genre[]> {
  try {
    const res = await fetch(`${API_BASE}/genres`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error in getGenres:", error);
    return [];
  }
}

/**
 * Fetch all webtoons and chapters for sitemap generation
 */
export async function getAllWebtoonsForSitemap(): Promise<WebtoonDetail[]> {
  try {
    const { items } = await getWebtoons({ per_page: 50 });
    const details = await Promise.all(
      items.map((item) => getWebtoonBySlug(item.slug))
    );
    return details.filter((d): d is WebtoonDetail => d !== null);
  } catch (e) {
    console.error("Error in getAllWebtoonsForSitemap:", e);
    return [];
  }
}
