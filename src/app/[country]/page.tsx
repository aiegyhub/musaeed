import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import locations from '@/core-data/locations.json';

export async function generateMetadata({ params }: { params: { country: string } }): Promise<Metadata> {
  const countryData = locations.find(loc => loc.countryCode === params.country);
  const title = `جميع الخدمات في ${countryData?.countryName || ''}`;
  const description = `تصفح جميع خدماتنا المتوفرة في ${countryData?.countryName || ''} واختر ما يناسبك.`;
  return { title, description };
}

export default async function CountryPage({ params }: { params: { country: string } }) {
  const countryData = locations.find(loc => loc.countryCode === params.country);
  if (!countryData) {
    notFound();
  }
  // الآن نقرأ الخدمات من داخل بيانات الدولة نفسها
  const { cities, services } = countryData;

  return (
    <div className="bg-white">
      <div className="container mx-auto py-16 px-4 text-right">
        <h1 className="text-4xl font-bold text-center mb-12">
          خدماتنا في <span className="text-blue-600">{countryData.countryName}</span>
        </h1>
        <h2 className="text-2xl font-semibold mb-6">اختر مدينتك:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <div key={city.slug} className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">{city.name}</h3>
              <div className="space-y-2">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/${countryData.countryCode}/${city.slug}/${service.slug}`}
                    className="block text-blue-600 hover:underline"
                  >
                    {service.name_ar}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}