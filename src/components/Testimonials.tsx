// تعريف نوع البيانات التي سيستقبلها المكون
type Testimonial = {
  name: string;
  location?: string; // الموقع أصبح اختيارياً
  city?: string; // المدينة أصبحت اختيارية
  rating: number;
  quote: string;
};

const StarIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// المكون الآن يستقبل الشهادات كـ prop بدلاً من استيرادها
const Testimonials = ({ testimonials }: { testimonials: Testimonial[] }) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }
  
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">ماذا يقول عملاؤنا؟</h2>
        <p className="text-lg text-center text-gray-600 mb-12">شهادات نفخر بها من عملائنا في جميع أنحاء المنطقة</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-right">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                {/* استخدام city أو location إذا كان أحدهما موجوداً */}
                <p className="text-sm text-gray-500">{testimonial.city || testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;