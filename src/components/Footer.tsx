import Link from 'next/link';
import { SocialIcon } from './SocialIcons';

// تعريف أنواع البيانات التي سيستقبلها الفوتر
type FooterLink = { href: string; name: string; };
type SocialLink = { name: string, href: string };
type FooterData = {
  about: { title: string; description: string; };
  quickLinks: { title: string; links: FooterLink[]; };
  services: { title: string; links: FooterLink[]; };
  contactInfo: { title: string; phone: string; email: string; address: string; };
  socialLinks: SocialLink[];
  copyrightText: string;
};

const Footer = ({ footerData }: { footerData?: FooterData }) => {

  const defaultFooterData: FooterData = {
    about: { title: "اسم الشركة", description: "شريكك الموثوق لجميع الخدمات المنزلية والمقاولات في الشرق الأوسط." },
    quickLinks: { title: "روابط هامة", links: [ { href: "/about", name: "من نحن" }, { href: "/contact", "name": "اتصل بنا" }, { href: "/privacy-policy", "name": "سياسة الخصوصية" } ] },
    services: { title: "أبرز الخدمات", links: [ { href: "/sa/riyadh/home-cleaning", name: "خدمات النظافة" }, { href: "/sa/riyadh/ac-cleaning-maintenance", name: "صيانة وتكييف" } ] },
    contactInfo: { title: "تواصل معنا", phone: "+966 12 345 6789", email: "contact@yourdomain.com", address: "الرياض، المملكة العربية السعودية" },
    socialLinks: [
      { name: "twitter", href: "#" }, { name: "facebook", href: "#" }, { name: "instagram", href: "#" }, { name: "tiktok", href: "#" }, { name: "youtube", href: "#" }
    ],
    copyrightText: "© 2025 اسم الشركة. جميع الحقوق محفوظة.",
  };

  const data = footerData || defaultFooterData;

  const socialColorClasses: { [key: string]: string } = {
    twitter: 'hover:text-sky-500',
    facebook: 'hover:text-blue-600',
    instagram: 'hover:text-pink-600',
    tiktok: 'hover:text-black',
    youtube: 'hover:text-red-600',
  }

  return (
    <footer className="bg-gray-900 text-white text-right">
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* العمود الأول: عن الشركة */}
          <div className="md:col-span-1 mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">{data.about.title}</h3>
            <p className="text-gray-400 leading-relaxed">{data.about.description}</p>
            {/* قسم أيقونات التواصل الاجتماعي */}
            {/* --- تم تعديل هذا الجزء لضمان المحاذاة لليمين --- */}
            <div className="flex gap-x-6 mt-6">
              {data.socialLinks.map(social => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className={`text-gray-400 transition-colors ${socialColorClasses[social.name.toLowerCase()] || 'hover:text-white'}`}>
                  <span className="sr-only">{social.name}</span>
                  <SocialIcon name={social.name} />
                </a>
              ))}
            </div>
          </div>

          {/* باقي الأعمدة */}
          <div>
            <h4 className="font-bold text-lg mb-4 tracking-wider">{data.quickLinks.title}</h4>
            <ul className="space-y-3">
              {data.quickLinks.links.map(link => ( <li key={link.href}><Link href={link.href} className="text-gray-400 hover:text-white transition-colors">{link.name}</Link></li> ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 tracking-wider">{data.services.title}</h4>
            <ul className="space-y-3">
              {data.services.links.map(link => ( <li key={link.href}><Link href={link.href} className="text-gray-400 hover:text-white transition-colors">{link.name}</Link></li> ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 tracking-wider">{data.contactInfo.title}</h4>
            <ul className="space-y-3 text-gray-400">
              <li dir="ltr" className="text-right">{data.contactInfo.phone}</li>
              <li>{data.contactInfo.email}</li>
              <li>{data.contactInfo.address}</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-500">
          <p>{data.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;