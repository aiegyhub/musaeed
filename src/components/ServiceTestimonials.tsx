type Testimonial = {
  name: string;
  city: string;
  rating: number;
  quote: string;
};

const StarIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ServiceTestimonials = ({ testimonials, serviceName, cityName }: { testimonials: Testimonial[], serviceName: string, cityName: string }) => {
  if (!testimonials || testimonials.length === 0) {
    return null; // لا تعرض أي شيء إذا لم تكن هناك شهادات
  }

  return (
    <section className="my-16">
      <h3 className="text-3xl font-bold text-center mb-10 border-b-2 pb-4 border-gray-100">
        شهادات عملاء خدمة {serviceName} في {cityName}
      </h3>
      <div className="space-y-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-lg text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.city}</p>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
            <p className="text-gray-700 italic mt-4">"{testimonial.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceTestimonials;