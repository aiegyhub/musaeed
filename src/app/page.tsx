import { Metadata } from 'next';
import Link from 'next/link';
import locations from '@/core-data/locations.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchForm from '@/components/SearchForm';
import { getServiceIcon } from '@/components/ServiceIcons';

export const metadata: Metadata = {
  title: 'اسم الشركة | خدمات المقاولات والصيانة الرائدة في الشرق الأوسط',
  description: 'من المقاولات العامة إلى الصيانة المنزلية، نقدم حلولاً متكاملة بجودة واحترافية عالية في السعودية، مصر، الإمارات، والكويت.',
};

export default function HomePage() {
  const featuredServices = locations.flatMap(loc => loc.services).slice(0, 6);
  const saudiData = locations.find(loc => loc.countryCode === 'sa');

  return (
    <>
      <Header />
      <main>
        <section className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-white" style={{ backgroundImage: "url('/background.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">شريكك الموثوق لجميع خدماتك</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">من المقاولات العامة إلى الصيانة المنزلية، نقدم حلولاً متكاملة بجودة واحترافية عالية.</p>
            <div className="max-w-4xl mx-auto"><SearchForm /></div>
          </div>
        </section>
        <section className="py-20 bg-gray-50 text-right">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">أبرز خدماتنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map(service => (
                <div key={service.slug} className="bg-white p-8 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">{getServiceIcon(service.slug)}<h3 className="text-2xl font-semibold">{service.name_ar}</h3></div>
                  <p className="text-gray-600">نقدم أفضل خدمات {service.name_ar.toLowerCase()} بأسعار تنافسية وجودة لا تضاهى.</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div><p className="text-5xl font-extrabold">+10</p><p className="text-xl mt-2">سنوات من الخبرة</p></div>
              <div><p className="text-5xl font-extrabold">+500</p><p className="text-xl mt-2">مشروع مكتمل</p></div>
              <div><p className="text-5xl font-extrabold">+1000</p><p className="text-xl mt-2">عميل سعيد</p></div>
            </div>
          </div>
        </section>
      </main>
      <Footer footerData={saudiData?.footerData} />
    </>
  );
}