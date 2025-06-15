'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import locations from '@/core-data/locations.json';

const SearchForm = () => {
  const [selectedCountry, setSelectedCountry] = useState('sa');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedService, setSelectedService] = useState('');
  
  // قائمة الخدمات المتاحة بناءً على الدولة المختارة
  const [availableServices, setAvailableServices] = useState(locations.find(loc => loc.countryCode === 'sa')?.services || []);
  
  const router = useRouter();

  // useEffect لمراقبة تغيير الدولة وتحديث قائمة الخدمات والمدن
  useEffect(() => {
    const currentCountryData = locations.find(loc => loc.countryCode === selectedCountry);
    setAvailableServices(currentCountryData?.services || []);
    // إعادة تعيين المدينة والخدمة عند تغيير الدولة
    setSelectedCity('');
    setSelectedService('');
  }, [selectedCountry]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService && selectedCity && selectedCountry) {
      router.push(`/${selectedCountry}/${selectedCity}/${selectedService}`);
    } else {
      alert('الرجاء اختيار الدولة والمدينة والخدمة');
    }
  };
  
  const citiesForSelectedCountry = locations.find(loc => loc.countryCode === selectedCountry)?.cities || [];

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white p-6 rounded-lg shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-right"
    >
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">الدولة</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
        >
          {locations.map(loc => ( <option key={loc.countryCode} value={loc.countryCode}>{loc.countryName}</option> ))}
        </select>
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
        <select
          id="city"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          disabled={!selectedCountry}
        >
          <option value="">-- اختر --</option>
          {citiesForSelectedCountry.map(city => ( <option key={city.slug} value={city.slug}>{city.name}</option>))}
        </select>
      </div>
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">الخدمة</label>
        <select
          id="service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md"
          disabled={!selectedCountry}
        >
          <option value="">-- اختر --</option>
          {availableServices.map(service => ( <option key={service.slug} value={service.slug}>{service.name_ar}</option> ))}
        </select>
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700"
        >
          بحث
        </button>
      </div>
    </form>
  );
};

export default SearchForm;