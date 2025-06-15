import React from 'react';

const CoverageAreas = ({ cityName, neighborhoods }: { cityName: string, neighborhoods: string[] }) => {
  if (!neighborhoods || neighborhoods.length === 0) {
    return null;
  }

  return (
    <section className="my-16">
      <h3 className="text-3xl font-bold text-center mb-10">
        نغطي جميع أحياء <span className="text-blue-600">{cityName}</span>
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {neighborhoods.map((area, index) => (
          <span key={index} className="bg-gray-100 text-gray-800 font-medium px-4 py-2 rounded-full shadow-sm">
            ✓ {area}
          </span>
        ))}
      </div>
    </section>
  );
};

export default CoverageAreas;