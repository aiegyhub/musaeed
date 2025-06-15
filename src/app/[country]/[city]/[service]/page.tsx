import { notFound } from "next/navigation";
import locations from '@/core-data/locations.json';
import { generateServiceDescription, generateServiceFAQ, generateCoverageAreas } from "@/lib/ai";
import PhoneNumberDisplay from "@/components/PhoneNumberDisplay";
import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Schema from "@/components/Schema";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import ContactActionButtons from "@/components/ContactActionButtons";
import ServiceHero from "@/components/ServiceHero";
import CoverageAreas from "@/components/CoverageAreas";

export async function generateStaticParams() {
    const paths = [];
    for (const loc of locations) { 
        for (const city of loc.cities) { 
            for (const service of loc.services) { 
                paths.push({ 
                    country: loc.countryCode, 
                    city: city.slug, 
                    service: service.slug 
                }); 
            } 
        } 
    }
    return paths;
}

export async function generateMetadata({ params }: { params: { country: string; city: string; service: string } }): Promise<Metadata> {
    const countryData = locations.find(l => l.countryCode === params.country);
    const serviceData = countryData?.services.find(s => s.slug === params.service);
    const cityData = countryData?.cities.find(c => c.slug === params.city);
    if (!countryData || !cityData || !serviceData) return { title: "الخدمة غير متوفرة" };
    const title = `⭐ ${serviceData.name_ar} في ${cityData.name} | اتصل الآن`;
    const description = `نقدم أفضل خدمات ${serviceData.name_ar} في ${cityData.name}.`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const canonicalUrl = `${baseUrl}/${params.country}/${params.city}/${params.service}`;
    const alternates: { [key: string]: string } = {};
    locations.forEach(loc => { alternates[loc.langCode] = `${baseUrl}/${loc.countryCode}`; });
    return { title, description, alternates: { canonical: canonicalUrl, languages: alternates }, other: { 'x-default': `${baseUrl}/sa` } };
}

export default async function ServicePage({ params }: { params: { country: string; city: string; service: string } }) {
  const countryData = locations.find(l => l.countryCode === params.country);
  const cityData = countryData?.cities.find(c => c.slug === params.city);
  const serviceData = countryData?.services.find(s => s.slug === params.service);
  
  if (!countryData || !cityData || !serviceData) notFound();

  const [aiGeneratedContent, faqItems, coverageAreas] = await Promise.all([
    generateServiceDescription(serviceData.name_ar, cityData.name),
    generateServiceFAQ(serviceData.name_ar, cityData.name),
    generateCoverageAreas(cityData.name)
  ]);
  const serviceTestimonials = serviceData.testimonials || [];
  const relatedServices = countryData.services.filter(s => s.slug !== serviceData.slug).slice(0, 5);
  const breadcrumbItems = [
    { name: "الرئيسية", href: "/" },
    { name: countryData.countryName, href: `/${countryData.countryCode}` },
    { name: cityData.name, href: `/${countryData.countryCode}/${cityData.slug}` },
    { name: serviceData.name_ar, href: `/${countryData.countryCode}/${cityData.slug}/${serviceData.slug}` }
  ];
  const primaryPhoneNumber = serviceData.virtualPhoneNumbers[0] || "";

  return (
    <>
      <Schema serviceName={serviceData.name_ar} cityName={cityData.name} countryName={countryData.countryName} neighborhoods={coverageAreas} faq={faqItems} breadcrumbs={breadcrumbItems} reviews={serviceTestimonials} url={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${params.country}/${params.city}/${params.service}`} />
      <ServiceHero title={serviceData.name_ar} subtitle={`أفضل خدمات ${serviceData.name_ar.toLowerCase()} في ${cityData.name}`} imageUrl="/background-service.jpg" />
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16 text-right">
            <div className="max-w-4xl mx-auto">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="bg-gray-50 border-t-4 border-blue-500 rounded-b-lg p-8 my-12 shadow-lg">
                    <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">اطلب خدمتك الآن</h2>
                    <p className="text-gray-600 mb-6 text-center">تواصل معنا مباشرة للحصول على استشارة وعرض سعر مجاني وسريع.</p>
                    <div className="text-center"> <PhoneNumberDisplay numbers={serviceData.virtualPhoneNumbers} /> </div>
                </div>
                <article className="prose prose-lg max-w-none text-right bg-white p-8 rounded-lg shadow-md" dangerouslySetInnerHTML={{ __html: aiGeneratedContent }} />
                <CoverageAreas cityName={cityData.name} neighborhoods={coverageAreas} />
                <section className="my-20"><h3 className="text-3xl font-bold text-center mb-10">لماذا نحن خيارك الأفضل؟</h3><div className="grid md:grid-cols-3 gap-8 text-center"><div className="p-6 bg-gray-50 rounded-lg"><span className="text-5xl">🏆</span><h4 className="text-xl font-semibold mt-4">جودة وخبرة</h4><p className="text-gray-600 mt-2">سنوات من الخبرة وفريق من المحترفين.</p></div><div className="p-6 bg-gray-50 rounded-lg"><span className="text-5xl">⏱️</span><h4 className="text-xl font-semibold mt-4">التزام بالمواعيد</h4><p className="text-gray-600 mt-2">نقدر وقتك ونلتزم بالتسليم في الموعد.</p></div><div className="p-6 bg-gray-50 rounded-lg"><span className="text-5xl">💰</span><h4 className="text-xl font-semibold mt-4">أسعار تنافسية</h4><p className="text-gray-600 mt-2">نقدم أفضل الأسعار مع الحفاظ على الجودة.</p></div></div></section>
                <ServiceTestimonials testimonials={serviceTestimonials} serviceName={serviceData.name_ar} cityName={cityData.name} />
                {faqItems && faqItems.length > 0 && (<section className="my-20"><h3 className="text-3xl font-bold text-center mb-10">أسئلة شائعة</h3><div className="space-y-4"> {faqItems.map((faq, index) => (<details key={index} className="p-6 border rounded-lg bg-gray-50 shadow-sm"><summary className="font-semibold text-lg cursor-pointer">{faq.question}</summary><p className="mt-4 text-gray-700">{faq.answer}</p></details>))} </div></section>)}
                <section className="mt-20 pt-10 border-t-2 border-gray-100"><h3 className="text-3xl font-bold text-center mb-8">خدماتنا الأخرى في {cityData.name}</h3><div className="flex flex-wrap justify-center gap-4"> {relatedServices.map(service => (<Link key={service.slug} href={`/${countryData.countryCode}/${cityData.slug}/${service.slug}`} className="bg-gray-100 text-gray-800 font-semibold px-5 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300">{service.name_ar}</Link>))} </div></section>
            </div>
        </div>
      </div>
      <ContactActionButtons phoneNumber={primaryPhoneNumber} whatsappNumber={primaryPhoneNumber} />
    </>
  );
}