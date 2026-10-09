import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "شروط الاستخدام | Arabnime",
  description: "الشروط والأحكام الخاصة باستخدام وتصفح موقع Arabnime.",
  alternates: {
    canonical: "https://arabnime.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:text-brand-400 transition-colors">
          الرئيسية
        </Link>
        <span>/</span>
        <span className="text-gray-200">شروط الاستخدام</span>
      </div>

      {/* Header */}
      <div className="border-b border-dark-border pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <FileText className="w-4 h-4" />
          <span>اتفاقية المستخدم والأحكام</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          شروط وأحكام الاستخدام (Terms of Service)
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          تاريخ السريان: أكتوبر 2026
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6 text-sm sm:text-base text-gray-300 leading-relaxed bg-dark-surface/60 border border-dark-border p-6 sm:p-8 rounded-2xl">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. الموافقة على الشروط</h2>
          <p>
            باستخدامك لموقع <strong className="text-brand-400">Arabnime</strong> وتصفح محتواه، فإنك تقر وتوافق على الالتزام بجميع بنود وشروط الاستخدام الواردة هنا. إذا كنت لا توافق على هذه الشروط، يرجى الامتناع عن استخدام الموقع.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. الاستخدام المسموح به</h2>
          <p>
            تُتاح خدمات الموقع للاستخدام الشخصي وغير التجاري فقط بهدف القراءة ومتابعة الإصدارات. يحظر القيام بأي من الممارسات التالية:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-gray-400 mr-2">
            <li>استخدام أدوات الفحص والتجريف الآلي (Automated Scraping/Crawling) العنيفة التي تسبب ضغطاً غير معقول على الخوادم.</li>
            <li>محاولة اختراق الموقع، تجاوز الحماية، أو تشغيل أكواد ضارة.</li>
            <li>إعادة بيع المحتوى أو استغلاله تجارياً دون ترخيص رسمي من أصحاب الحقوق.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. إخلاء الضمانات وحدود المسؤولية</h2>
          <p>
            يُقدَم المحتوى والخدمات "كما هي" دون أي ضمانات صريحة أو ضمنية. نحن نسعى دائماً لضمان استقرار وسرعة الموقع، لكننا لا نضمن عدم حدوث انقطاعات مؤقتة ناجمة عن أعمال الصيانة أو ظروف شبكة الإنترنت الخارجة عن إرادتنا.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. الروابط الخارجية ومحتوى الأطراف الثالثة</h2>
          <p>
            قد يحتوي الموقع على روابط إلى مواقع أو منصات خارجية لسيرفرات التحميل أو القراءة. موقع Arabnime لا يتحمل مسؤولية المحتوى أو السياسات المتبعة في تلك المواقع الخارجية.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">5. التعديل على الشروط</h2>
          <p>
            نحتفظ بالحق في تحديث أو تعديل شروط الاستخدام في أي وقت دون إشعار مسبق. يُعتبر استمرارك في استخدام الموقع بعد نشر أي تعديل بمثابة قبول صريح للشروط المحدثة.
          </p>
        </section>
      </div>
    </div>
  );
}
