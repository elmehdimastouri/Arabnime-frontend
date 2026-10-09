import React from "react";
import Link from "next/link";
import { BookOpen, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#060a12] border-t border-dark-border mt-20 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span dir="ltr" className="text-xl font-black tracking-wider text-white">
                ARAB<span className="text-brand-400">NIME</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              منصتكم الأولى لقراءة أحدث فصول المانهوا والمانجا المترجمة بجودة فائقة وسرعة لا تضاهى، بتجربة قراءة انسيابية وسريعة وخالية من الإعلانات المزعجة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-400 transition-colors">
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/directory" className="hover:text-brand-400 transition-colors">
                  دليل الأعمال
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="hover:text-brand-400 transition-colors">
                  سجل القراءة والمفضلة
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-400 transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">الصفحات القانونية</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-brand-400 transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-brand-400 transition-colors">
                  إخلاء المسؤولية (DMCA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-400 transition-colors">
                  شروط الاستخدام
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-dark-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Arabnime. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1">
            صُنع بشغف لعشاق المانهوا <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
