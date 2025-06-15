'use client';
import { useState, useEffect } from 'react';

const PhoneNumberDisplay = ({ numbers }: { numbers: string[] }) => {
    // دائماً ابدأ بالرقم الأول في القائمة. هذا يضمن تطابق الخادم والعميل في العرض الأول.
    const [displayNumber, setDisplayNumber] = useState(numbers[0] || "---");

    // هذا الكود سيعمل فقط على العميل (المتصفح) بعد اكتمال العرض الأول
    useEffect(() => {
        // إذا كان هناك أكثر من رقم، قم باختيار رقم عشوائي
        if (numbers && numbers.length > 1) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            setDisplayNumber(numbers[randomIndex]);
        }
    // نقوم بتشغيل هذا التأثير مرة واحدة فقط عند تحميل المكون
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCallClick = () => {
        console.log(`Call initiated to: ${displayNumber}`);
        window.location.href = `tel:${displayNumber}`;
    };

    return (
        <div 
            onClick={handleCallClick}
            className="inline-block px-8 py-4 bg-blue-600 text-white font-bold text-2xl rounded-full shadow-lg cursor-pointer transition-transform transform hover:scale-105"
            dir="ltr" //  نجبر اتجاه هذا العنصر ليكون من اليسار لليمين لعرض الرقم بشكل صحيح
        >
            <span className="ml-3">📞</span>
            {displayNumber}
        </div>
    );
};

export default PhoneNumberDisplay;