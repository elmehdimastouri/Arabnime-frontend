export interface Genre {
  id: number;
  name: string;
  slug: string;
  url?: string;
  count?: number;
}

export interface ChapterSummary {
  id: number;
  chapter_number: string;
  title: string;
  slug?: string;
  url?: string;
  date?: string;
}

export interface WebtoonCard {
  id: number;
  title: string;
  slug: string;
  url?: string;
  alt_title?: string;
  poster: string;
  banner?: string;
  status: string;
  type: string;
  rating: number;
  views: number;
  genres: Genre[];
  is_18plus: boolean;
  updated_at: string;
  latest_chapters?: ChapterSummary[];
}

export interface WebtoonDetail extends WebtoonCard {
  synopsis: string;
  author: string;
  artist: string;
  release_year: string;
  chapters: ChapterSummary[];
  total_chapters: number;
  first_chapter?: ChapterSummary | null;
  latest_chapter?: ChapterSummary | null;
  first_chapter_id: number | null;
  latest_chapter_id: number | null;
  related?: WebtoonCard[];
}

export interface ChapterReaderData {
  id: number;
  title: string;
  chapter_number: string;
  slug: string;
  url: string;
  webtoon: {
    id: number;
    title: string;
    slug: string;
    url?: string;
    poster: string;
  };
  images: string[];
  total_images: number;
  prev_chapter: ChapterSummary | null;
  next_chapter: ChapterSummary | null;
  all_chapters: ChapterSummary[];
}

export interface HomePayload {
  featured: WebtoonCard[];
  latest: WebtoonCard[];
  popular: WebtoonCard[];
  genres: Genre[];
}

export interface HistoryItem {
  webtoonId: number;
  webtoonTitle: string;
  webtoonSlug: string;
  webtoonPoster: string;
  chapterId: number;
  chapterNumber: string;
  chapterSlug?: string;
  chapterTitle: string;
  readAt: string;
}
