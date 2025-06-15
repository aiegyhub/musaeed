import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  // metadataBase يساعد Next.js على تحديد الروابط بشكل صحيح
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  
  title: {
    default: "اسم الشركة | خدمات المقاولات والصيانة المتكاملة", // العنوان الافتراضي للموقع
    template: "%s | اسم الشركة", // قالب لإضافة اسم الشركة إلى عناوين الصفحات الفرعية
  },
  description: "نقدم أفضل خدمات المقاولات، الصيانة، النظافة، والتشطيبات في السعودية، مصر، الإمارات، والكويت. جودة عالية وأسعار تنافسية.",
  
  // البيانات الافتراضية عند المشاركة على منصات التواصل
  openGraph: {
    title: "اسم الشركة | للخدمات المتكاملة",
    description: "شريكك الموثوق لجميع خدماتك.",
    images: ['/og-image.jpg'], // الصورة الافتراضية التي أنشأتها
    siteName: "اسم الشركة",
    type: 'website',
    locale: 'ar_AR'
  },
  twitter: {
    card: 'summary_large_image',
    title: "اسم الشركة | للخدمات المتكاملة",
    description: "شريكك الموثوق لجميع خدماتك.",
    images: ['/og-image.jpg'], // الصورة الافتراضية التي أنشأتها
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <main className="min-h-screen bg-white text-gray-800">
          {children}
        </main>
      </body>
    </html>
  );
}