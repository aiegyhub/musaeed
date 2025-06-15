import Link from 'next/link';

type BreadcrumbItem = {
  name: string;
  href: string;
};

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 flex-wrap text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span className="rtl:ml-2 ltr:mr-2">/</span>}
              
              {/* إذا لم يكن العنصر هو الأخير، اجعله رابطاً */}
              {!isLast ? (
                <Link href={item.href} className="hover:text-blue-600">
                  {item.name}
                </Link>
              ) : (
                // إذا كان العنصر هو الأخير، اعرضه كنص عادي
                <span className="font-semibold text-gray-800" aria-current="page">
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;