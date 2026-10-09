import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | Arabnime",
  description: "سياسة الخصوصية وحماية بيانات المستخدمين على منصة Arabnime.",
  alternates: {
    canonical: "https://arabnime.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-brand-400 transition-colors">
          الرئيسية
        </Link>
        <span>/</span>
        <span className="text-gray-200">سياسة الخصوصية</span>
      </div>

      {/* Header */}
      <div className="border-b border-dark-border pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>حماية البيانات والخصوصية</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          سياسة الخصوصية (Privacy Policy)
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          آخر تحديث: أكتوبر 2026
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6 text-sm sm:text-base text-gray-300 leading-relaxed bg-dark-surface/60 border border-dark-border p-6 sm:p-8 rounded-2xl">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. مقدمة</h2>
          <p>
            مرحباً بكم في <strong className="text-brand-400">Arabnime</strong>. نحن نحترم خصوصيتكم ونلتزم بحماية أي بيانات شخصية قد تتم مشاركتها معنا. توضح هذه الوثيقة نوع المعلومات التي نقوم بجمعها، وكيف نستخدمها، والتدابير المتخذة لحمايتها.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. المعلومات التي نجمعها</h2>
          <p>
            نحن نتبع سياسة الحد الأدنى من جمع البيانات لضمان خصوصيتكم:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-gray-400 mr-2">
            <li>
              <strong className="text-gray-200">بيانات التصفح وسجلات الخادم (Log Files):</strong> تشمل عنوان IP، نوع المتصفح، نظام التشغيل، والصفحات التي تمت زيارتها بغرض تحسين الأداء وحماية الموقع من الهجمات.
            </li>
            <li>
              <strong className="text-gray-200">التخزين المحلي (Local Storage):</strong> يتم حفظ المفضلة وسجل القراءة وآخر الفصول المقروءة محلياً بالكامل على متصفح جهازكم دون تخزينها على خوادمنا الشخصية.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. ملفات تعريف الارتباط (Cookies)</h2>
          <p>
            قد نستخدم ملفات تعريف الارتباط لأغراض تقنية، مثل تذكر تفضيلات الواجهة (كالوضع الليلي أو حجم العرض)، بالإضافة إلى خدمات التحليل القياسية (مثل Google Analytics / Cloudflare Web Analytics) لفهم تفاعل القراء وتحسين تجربة الموقع دون تحديد الهوية الشخصية.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. شبكات الإعلانات والجهات الخارجية</h2>
          <p>
            قد نستعين بشركات إعلانية تابعة لجهات خارجية لعرض الإعلانات عند زيارة موقعنا. قد تستخدم هذه الشركات معلومات مجمعة حول زياراتك لهذا الموقع ومواقع الويب الأخرى لتقديم إعلانات حول السلع والخدمات التي تهمك، دون استخدام بيانات التعريف الشخصية.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">5. أمن المعلومات</h2>
          <p>
            نطبق تقنيات تشفير متقدمة عبر بروتوكول HTTPS/SSL وشبكة توزيع المحتوى العالمية Cloudflare لضمان أمان البيانات وتجربة تصفح آمنة ومحمية من التهديدات.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">6. اتصل بنا</h2>
          <p>
            إذا كان لديكم أي أسئلة أو استفسارات حول سياسة الخصوصية، يرجى مراسلتنا عبر البريد الإلكتروني:
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-dark-card border border-dark-border text-brand-300 text-sm">
            <Mail className="w-4 h-4 text-brand-400" />
            <a href="mailto:contact@arabnime.com" className="hover:underline">
              contact@arabnime.com
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
