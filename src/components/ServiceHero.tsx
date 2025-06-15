import React from 'react';

// المكون يستقبل عنواناً رئيسياً، عنواناً فرعياً، وصورة خلفية
const ServiceHero = ({ title, subtitle, imageUrl }: { title: string, subtitle: string, imageUrl: string }) => {
  return (
    <section 
      className="relative bg-cover bg-center h-[40vh] flex items-center justify-center text-white text-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* طبقة معتمة فوق الصورة لتوضيح النص */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-2xl font-light">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default ServiceHero;