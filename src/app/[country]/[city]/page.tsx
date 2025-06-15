import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import locations from '@/core-data/locations.json';

export async function generateMetadata({ params }: { params: { country: string, city: string } }): Promise<Metadata> {
  const countryData = locations.find(loc => loc.countryCode === params.country);
  const cityData = countryData?.cities.find(c => c.slug === params.city);
  const title = `خدماتنا في ${cityData?.name || ''}, ${countryData?.countryName || ''}`;
  const description = `قائمة كاملة بخدماتنا في مدينة ${cityData?.name || ''}.`;
  return { title, description };
}

export default async function CityPage({ params }: { params: { country: string; city: string } }) {
  const countryData = locations.find(loc => loc.countryCode === params.country);
  const cityData = countryData?.cities.find(c => c.slug === params.city);
  if (!countryData || !cityData) {
    notFound();
  }
  const services = countryData.services;

  return (
    <div className="bg-white">
      <div className="container mx-auto py-16 px-4 text-right">
        <h1 className="text-4xl font-bold text-center mb-4">جميع الخدمات في <span className="text-blue-600">{cityData.name}</span></h1>
        <p className="text-lg text-gray-600 text-center mb-12">تصفح قائمة الخدمات المتوفرة في مدينتك واختر ما يناسبك.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${countryData.countryCode}/${cityData.slug}/${service.slug}`}
              className="block p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-900">{service.name_ar}</h2>
              <p className="text-gray-500 mt-2">اطلب أفضل خدمة {service.name_ar.toLowerCase()} في {cityData.name} الآن.</p>
              <span className="inline-block mt-4 text-blue-600 font-semibold">عرض التفاصيل ←</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}