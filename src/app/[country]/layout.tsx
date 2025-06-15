import Header from "@/components/Header";
import Footer from "@/components/Footer";
import locations from "@/core-data/locations.json";
import { notFound } from "next/navigation";

export default async function CountrySpecificLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { country: string };
}) {
  // استخدام async يحل المشكلة
  const countryData = locations.find(loc => loc.countryCode === params.country);

  if (!countryData) {
    notFound();
  }

  return (
    <>
      <Header menuLinks={countryData.menuLinks} />
      {children}
      <Footer footerData={countryData.footerData} />
    </>
  );
}