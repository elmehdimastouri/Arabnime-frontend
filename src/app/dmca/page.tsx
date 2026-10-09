import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "إخلاء المسؤولية وحقوق الملكية (DMCA) | Arabnime",
  description: "سياسة حقوق الطبع والنشر وإخلاء المسؤولية وإجراءات التبليغ DMCA على Arabnime.",
  alternates: {
    canonical: "https://arabnime.com/dmca",
  },
};

export default function DmcaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-brand-400 transition-colors">
          الرئيسية
        </Link>
        <span>/</span>
        <span className="text-gray-200">إخلاء المسؤولية وحقوق النشر (DMCA)</span>
      </div>

      {/* Header */}
      <div className="border-b border-dark-border pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <AlertTriangle className="w-4 h-4" />
          <span>حقوق الملكية الفكرية وDMCA</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          إخلاء المسؤولية وحقوق النشر (DMCA Disclaimer)
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Digital Millennium Copyright Act Notice
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6 text-sm sm:text-base text-gray-300 leading-relaxed bg-dark-surface/60 border border-dark-border p-6 sm:p-8 rounded-2xl">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. إخلاء المسؤولية العامة (General Disclaimer)</h2>
          <p>
            موقع <strong className="text-brand-400">Arabnime</strong> لا يستضيف أي ملفات رقمية أو وسائط أو فصول مانهوا محمية بحقوق الطبع والنشر على خوادمه الخاصة بشكل مباشر لتعدي الحقوق، وإنما يعتمد الموقع على فهرسة وتجميع محتوى متاح ومشارك على الإنترنت من قبل مجتمعات الترجمة العربية ومصادر التخزين السحابية العامة بهدف التعريف بالأعمال ومشاركتها مع الجمهور الناطق بالعربية.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            جميع الشخصيات والقصص والعلامات التجارية المذكورة أو المصورة هي ملكية حصرية لأصحابها ومؤلفيها والناشرين الأصليين.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. الامتثال لقانون DMCA</h2>
          <p>
            نحن نحترم حقوق الملكية الفكرية ونلتزم بالاستجابة الفورية لأي إشعارات بانتهاك حقوق الطبع والنشر تتماشى مع قانون الألفية الجديدة لحقوق طبع ونشر المواد الرقمية (DMCA). إذا كنت المالك القانوني لأي عمل أو وكيلاً معتمداً وترى أن هناك عملاً تم تضمينه بطريقة تنتهك حقوقك، يرجى تزويدنا بالمعلومات التالية:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-gray-400 mr-2">
            <li>اسم وتوقيع الشخص المخول بالتصرف نيابة عن مالك الحقوق.</li>
            <li>تحديد العمل الأصلي المحمي بحقوق الطبع والنشر الذي تدعي انتهاكه.</li>
            <li>رابط الصفحة المحددة (URL) على موقع Arabnime التي تحتوي على المحتوى المعني.</li>
            <li>بيانات الاتصال الخاصة بك (الاسم الكامل، العنوان، رقم الهاتف، والبريد الإلكتروني الرسمي).</li>
            <li>بيان يؤكد حسن نيتك بأن استخدام المادة غير مصرح به من قِبل مالك حقوق الطبع والنشر أو وكيله أو القانون.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. إجراءات الإزالة الفورية</h2>
          <p>
            بمجرد استلام إشعار صالح ومستوفٍ للشروط القانونية المذكورة، سنقوم بمراجعة الطلب وحذف أو تعطيل الوصول إلى المحتوى المخالف في غضون <strong className="text-white">24 إلى 48 ساعة عمل</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. البريد المخصص لطلبات DMCA</h2>
          <p>
            يرجى إرسال جميع الإشعارات الرسمية المتعلقة بحقوق الملكية إلى العنوان التالي:
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-dark-card border border-dark-border text-amber-300 text-sm">
            <Mail className="w-4 h-4 text-amber-400" />
            <a href="mailto:dmca@arabnime.com" className="hover:underline">
              dmca@arabnime.com
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
