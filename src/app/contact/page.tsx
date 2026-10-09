import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Send, ShieldAlert, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "اتصل بنا | Arabnime",
  description: "تواصل مع فريق إدارة ودعم موقع Arabnime للاقتراحات، الشراكات، أو طلبات الدعم.",
  alternates: {
    canonical: "https://arabnime.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-brand-400 transition-colors">
          الرئيسية
        </Link>
        <span>/</span>
        <span className="text-gray-200">اتصل بنا</span>
      </div>

      {/* Header */}
      <div className="border-b border-dark-border pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <MessageSquare className="w-4 h-4" />
          <span>الدعم والتواصل المباشر</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          تواصل معنا (Contact Us)
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          نسعد دائماً بسماع آرائكم واقتراحاتكم لتطوير Arabnime وتوفير أفضل تجربة لقراءة المانهوا
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Email Card */}
        <div className="bg-dark-surface border border-dark-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-1">البريد الإلكتروني العام</h2>
            <p className="text-xs sm:text-sm text-gray-400">
              للاستفسارات العامة، الاقتراحات، أو طلبات إضافة أعمال جديدة:
            </p>
          </div>
          <div>
            <a
              href="mailto:contact@arabnime.com"
              className="inline-flex items-center gap-2 text-brand-400 font-semibold hover:underline text-sm"
            >
              <span>contact@arabnime.com</span>
              <Send className="w-3.5 h-3.5 rotate-180" />
            </a>
          </div>
        </div>

        {/* DMCA & Legal Inquiries */}
        <div className="bg-dark-surface border border-dark-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-1">الشؤون القانونية وDMCA</h2>
            <p className="text-xs sm:text-sm text-gray-400">
              لإشعارات إزالة المحتوى أو المسائل المتعلقة بالملكية الفكرية:
            </p>
          </div>
          <div>
            <a
              href="mailto:dmca@arabnime.com"
              className="inline-flex items-center gap-2 text-amber-400 font-semibold hover:underline text-sm"
            >
              <span>dmca@arabnime.com</span>
              <Send className="w-3.5 h-3.5 rotate-180" />
            </a>
          </div>
        </div>

      </div>

      {/* Note Section */}
      <div className="bg-dark-surface/50 border border-dark-border/60 rounded-xl p-5 text-center text-xs text-gray-400">
        نحاول جاهدين الرد على كافة الرسائل والاستفسارات في غضون 24 إلى 48 ساعة.
      </div>
    </div>
  );
}
