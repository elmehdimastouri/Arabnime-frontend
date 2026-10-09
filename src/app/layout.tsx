import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export const viewport: Viewport = {
  themeColor: "#080c14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://arabnime.com"),
  title: {
    default: "Arabnime | عالم المانهوا والويب تون المترجمة للعربية",
    template: "%s | Arabnime",
  },
  description:
    "موقع Arabnime الأول لقراءة أحدث فصول المانهوا والمانجا والويب تون الكورية والصينية واليابانية المترجمة للعربية بجودة عالية وبدون إعلانات مزعجة وبسرعة فائقة.",
  keywords: [
    "مانهوا",
    "مانجا",
    "ويب تون",
    "مانهوا مترجمة",
    "قراءة مانهوا",
    "فصول مانهوا",
    "manhwa",
    "webtoon",
    "arabnime",
    "مانهوا كورية",
    "مانجا مترجمة",
  ],
  authors: [{ name: "Arabnime Team", url: "https://arabnime.com" }],
  creator: "Arabnime",
  publisher: "Arabnime",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://arabnime.com",
    languages: {
      "ar": "https://arabnime.com",
      "x-default": "https://arabnime.com",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Arabnime | عالم المانهوا والويب تون المترجمة للعربية",
    description: "قراءة أحدث فصول المانهوا والمانجا والويب تون مترجمة للعربية بأعلى دقة وسرعة البرق.",
    url: "https://arabnime.com",
    siteName: "Arabnime",
    locale: "ar_AR",
    type: "website",
    images: [
      {
        url: "https://admin.arabnime.com/wp-content/uploads/2026/10/Dao-of-the-Bizarre-Immortal-720x1024.webp",
        width: 720,
        height: 1024,
        alt: "Arabnime Manhwa Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arabnime | عالم المانهوا والويب تون المترجمة",
    description: "قراءة أحدث فصول المانهوا والويب تون مترجمة للعربية بأعلى جودة.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global Schema for Organization and WebSite Searchbox
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://arabnime.com/#organization",
        "name": "Arabnime",
        "url": "https://arabnime.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://arabnime.com/logo.png",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://arabnime.com/#website",
        "url": "https://arabnime.com",
        "name": "Arabnime",
        "publisher": {
          "@id": "https://arabnime.com/#organization",
        },
        "inLanguage": "ar",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://arabnime.com/directory?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={globalSchema} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#080c14] text-gray-100 antialiased selection:bg-brand-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
