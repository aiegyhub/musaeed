type FAQ = { question: string; answer: string };
type Breadcrumb = { name: string; href: string };
type Review = { name: string; rating: number; quote: string };

type SchemaProps = {
  serviceName?: string;
  cityName?: string;
  countryName?: string;
  neighborhoods?: string[]; // إضافة الأحياء
  faq?: FAQ[];
  breadcrumbs?: Breadcrumb[];
  reviews?: Review[];
  url: string;
};

const Schema = ({ serviceName, cityName, countryName, neighborhoods, faq, breadcrumbs, reviews, url }: SchemaProps) => {
  const graph: any[] = [];

  if (serviceName && cityName && countryName) {
    // إضافة الأحياء إلى areaServed
    const areasServed = [{ "@type": "City", "name": cityName }];
    if (neighborhoods && neighborhoods.length > 0) {
      neighborhoods.forEach(hood => {
        areasServed.push({ "@type": "Place", "name": hood });
      });
    }

    graph.push({
      "@type": "LocalBusiness",
      "name": `خبراء خدمة ${serviceName} في ${cityName}`,
      "url": url,
      "address": { "@type": "PostalAddress", "addressLocality": cityName, "addressCountry": countryName },
      "areaServed": areasServed // استخدام القائمة الجديدة
    });
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbItems = breadcrumbs.map((item, index) => ({ "@type": "ListItem", "position": index + 1, "name": item.name, "item": item.href }));
    graph.push({ "@type": "BreadcrumbList", "itemListElement": breadcrumbItems });
  }

  if (faq && faq.length > 0) {
    const faqItems = faq.map(item => ({ "@type": "Question", "name": item.question, "acceptedAnswer": { "@type": "Answer", "text": item.answer } }));
    graph.push({ "@type": "FAQPage", "mainEntity": faqItems });
  }

  if (reviews && reviews.length > 0) {
    const reviewItems = reviews.map(review => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": review.name },
      "reviewRating": { "@type": "Rating", "ratingValue": review.rating.toString(), "bestRating": "5" },
      "reviewBody": review.quote,
      "itemReviewed": { "@type": "Service", "name": serviceName }
    }));
    graph.push(...reviewItems);
  }

  const schema = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default Schema;