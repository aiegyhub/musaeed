'use client';

// المكون الآن يستقبل أرقام الهواتف كـ props
const ContactActionButtons = ({ phoneNumber, whatsappNumber }: { phoneNumber: string, whatsappNumber: string }) => {
    
    // إزالة علامة + والمسافات من رقم الواتساب للرابط
    const cleanWhatsappNumber = whatsappNumber.replace(/\s/g, '').replace('+', '');

    return (
        <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-4">
            {/* زر الواتساب بالشكل الجديد */}
            <a
                href={`https://wa.me/${cleanWhatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-5 py-3 rounded-full flex items-center justify-center gap-x-3 shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                aria-label="تواصل معنا عبر واتساب"
            >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                    <path d="M16.75 13.96c.25.13.43.2.5.25a.48.48 0 01.12.34c0 .12-.06.24-.12.3l-.06.06c-.19.18-.37.31-.56.41a3.54 3.54 0 01-.56.25c-.25.06-.5.12-.75.12a2.3 2.3 0 01-1.06-.25 5.48 5.48 0 01-1.94-1.06c-.5-.44-1-1-1.44-1.56a8.38 8.38 0 01-1.06-1.94 2.13 2.13 0 01-.25-1.06c0-.25.06-.5.12-.75a3.54 3.54 0 01.25-.56c.1-.19.23-.37.41-.56l.06-.06a.48.48 0 01.3-.12c.12 0 .24.06.34.12.05.06.12.18.25.43s.2.44.25.5a.6.6 0 010 .56c-.06.13-.12.25-.18.38a.38.38 0 00-.06.25c0 .12.06.25.12.37l.13.13.12.12c.44.5.94.94 1.5 1.31l.12.12.13.13c.12.06.25.12.37.12a.38.38 0 00.25-.06c.13-.06.25-.12.38-.18a.6.6 0 01.56 0zM12 2a10 10 0 100 20 10 10 0 000-20z" />
                </svg>
                <span className="font-semibold">واتساب</span>
            </a>
            {/* زر الاتصال بالشكل الجديد */}
            <a
                href={`tel:${phoneNumber}`}
                className="bg-blue-600 text-white px-5 py-3 rounded-full flex items-center justify-center gap-x-3 shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                aria-label="اتصل بنا الآن"
            >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                </svg>
                 <span className="font-semibold">اتصال</span>
            </a>
        </div>
    );
};

export default ContactActionButtons;