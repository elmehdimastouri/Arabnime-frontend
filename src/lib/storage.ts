"use client";

import { HistoryItem, WebtoonCard } from "./types";

const BOOKMARKS_KEY = "arabnime_bookmarks";
const HISTORY_KEY = "arabnime_history";

export function getBookmarks(): WebtoonCard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isBookmarked(id: number): boolean {
  const list = getBookmarks();
  return list.some((item) => item.id === id);
}

export function toggleBookmark(webtoon: WebtoonCard): boolean {
  const list = getBookmarks();
  const exists = list.some((item) => item.id === webtoon.id);
  let updated: WebtoonCard[];

  if (exists) {
    updated = list.filter((item) => item.id !== webtoon.id);
  } else {
    updated = [webtoon, ...list];
  }

  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  return !exists;
}

export function getReadingHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveReadingProgress(item: HistoryItem): void {
  if (typeof window === "undefined") return;
  try {
    const history = getReadingHistory().filter((h) => h.webtoonId !== item.webtoonId);
    const updated = [item, ...history].slice(0, 50); // Keep last 50 read
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save reading history", e);
  }
}
