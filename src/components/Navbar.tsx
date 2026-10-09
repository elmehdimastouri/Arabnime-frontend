"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, BookOpen, Bookmark, Menu, X, Flame, Sparkles } from "lucide-react";
import { searchWebtoons } from "@/lib/api";
import { WebtoonCard } from "@/lib/types";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WebtoonCard[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const res = await searchWebtoons(query);
      setResults(res);
      setIsSearching(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close search dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/90 backdrop-blur-md border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span dir="ltr" className="text-xl font-black tracking-wider text-white flex items-center">
                  ARAB<span className="text-brand-400">NIME</span>
                </span>
                <span className="text-[10px] text-gray-400 -mt-1 font-medium">عالم المانهوا والويب تون</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-dark-card rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Flame className="w-4 h-4 text-orange-400" />
                الرئيسية
              </Link>
              <Link
                href="/directory"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-card rounded-lg transition-colors"
              >
                دليل المانهوا
              </Link>
              <Link
                href="/directory?sort=popular"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-card rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-accent-400" />
                الأكثر شهرة
              </Link>
              <Link
                href="/bookmarks"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-card rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Bookmark className="w-4 h-4 text-brand-400" />
                المفضلة والسجل
              </Link>
            </nav>
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="relative flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن مانهوا، مؤلف، أو تصنيف..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-dark-surface/90 border border-dark-border focus:border-brand-500 rounded-full py-2 pr-10 pl-4 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-2.5" />
            </div>

            {/* Live Search Popup */}
            {results.length > 0 && (
              <div className="absolute top-12 left-0 right-0 bg-[#0f172a] border border-dark-border rounded-2xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                <div className="p-2 divide-y divide-dark-border/40">
                  {results.map((item) => (
                    <Link
                      key={item.id}
                      href={`/webtoon/${item.slug}`}
                      onClick={() => setResults([])}
                      className="flex items-center gap-3 p-2 hover:bg-dark-card/80 rounded-xl transition-colors group"
                    >
                      <img
                        src={item.poster || "/placeholder.jpg"}
                        alt={item.title}
                        className="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-100 group-hover:text-brand-400 truncate transition-colors">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                          <span className="text-accent-400 font-semibold">★ {item.rating}</span>
                          <span>•</span>
                          <span>{item.type}</span>
                          <span>•</span>
                          <span className="text-gray-300">{item.status}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-dark-card focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-border space-y-2">
            <div className="px-2 mb-3">
              <input
                type="text"
                placeholder="ابحث عن مانهوا..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-dark-surface border border-dark-border rounded-xl py-2 px-3 text-sm text-gray-100 placeholder-gray-400"
              />
            </div>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:bg-dark-card"
            >
              الرئيسية
            </Link>
            <Link
              href="/directory"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:bg-dark-card"
            >
              دليل المانهوا
            </Link>
            <Link
              href="/bookmarks"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:bg-dark-card"
            >
              المفضلة وسجل القراءة
            </Link>
          </div>
        )}

      </div>
    </header>
  );
}
