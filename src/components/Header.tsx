import Link from 'next/link';

type MenuLink = {
  href: string;
  name: string;
};

const Header = ({ menuLinks }: { menuLinks?: MenuLink[] }) => {
  
  const defaultLinks: MenuLink[] = [
    { href: "/", name: "الرئيسية" },
    { href: "/about", name: "من نحن" },
    { href: "/contact", name: "اتصل بنا" },
  ];

  const linksToRender = menuLinks || defaultLinks;

  return (
    <header className="bg-white text-gray-800 shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto flex justify-between items-center p-4 h-20">
        
        {/* تم تجميع الشعار والروابط معاً في هذا الـ div ليتم وضعهم على اليمين */}
        <div className="flex items-center gap-x-10">
          <Link href="/" className="text-3xl font-extrabold text-blue-600 transition-transform hover:scale-105">
            اسم الشركة
          </Link>
          <div className="hidden md:flex items-center gap-x-8">
            {linksToRender.map(link => (
              <Link key={link.href} href={link.href} className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors pb-1 border-b-2 border-transparent hover:border-blue-500">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* هذا الجزء على اليسار، يمكنك وضع زر "اطلب خدمة" فيه مستقبلاً */}
        <div>
          {/* <a href="/contact" className="bg-blue-600 text-white px-5 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors">
            اطلب خدمة الآن
          </a> */}
        </div>

      </nav>
    </header>
  );
};

export default Header;