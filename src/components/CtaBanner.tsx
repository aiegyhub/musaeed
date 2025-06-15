import Link from 'next/link';

const CtaBanner = () => {
    return (
        <section className="bg-blue-600">
            <div className="container mx-auto py-12 px-4 text-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    هل أنت مستعد للبدء؟
                </h2>
                <p className="mt-4 text-lg leading-6 text-blue-200">
                    احصل على عرض سعر مجاني ومفصل لمشروعك اليوم. لا يوجد أي التزام.
                </p>
                <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                >
                    تواصل معنا الآن
                </Link>
            </div>
        </section>
    );
};

export default CtaBanner;