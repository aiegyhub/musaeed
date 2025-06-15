import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// دالة وصف الخدمة (تبقى كما هي)
export async function generateServiceDescription(serviceNameAr: string, cityNameAr: string): Promise<string> {
    try {
        const prompt = `اكتب وصف خدمة احترافي بتنسيق HTML لخدمة '${serviceNameAr}' في مدينة '${cityNameAr}'. يجب أن يكون المحتوى غنياً بالكلمات المفتاحية ومقنعاً، مع عنوان H2، فقرات قصيرة، قائمة نقطية <ul>، ودعوة واضحة للاتصال.`;
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("AI description generation failed:", error);
        return `<h2>خدمة ${serviceNameAr} الموثوقة في ${cityNameAr}</h2><p>اتصل بنا الآن للحصول على أفضل خدمة.</p>`;
    }
}

// دالة الأسئلة الشائعة (تبقى كما هي)
export async function generateServiceFAQ(serviceNameAr: string, cityNameAr: string): Promise<{ question: string; answer: string; }[]> {
    try {
        const prompt = `
          أنشئ 4 أسئلة شائعة وإجاباتها حول خدمة '${serviceNameAr}' في مدينة '${cityNameAr}'. 
          يجب أن يكون الناتج بصيغة JSON array of objects فقط لا غير، كل object يحتوي على "question" و "answer".
          مثال: [{"question": "ما هي التكلفة؟", "answer": "تعتمد التكلفة على..."}]
        `;
        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```json|```/g, "").trim();
        return JSON.parse(text);
    } catch (error) {
        console.error("AI FAQ generation failed:", error);
        return [{ question: `ما هي أسعار خدمة ${serviceNameAr}؟`, answer: "تختلف الأسعار حسب حجم العمل. اتصل بنا للحصول على عرض سعر دقيق ومجاني." }];
    }
}

// --- دالة جديدة: توليد مناطق التغطية ---
export async function generateCoverageAreas(cityNameAr: string): Promise<string[]> {
    try {
        const prompt = `
            اذكر لي 12 من أشهر وأهم الأحياء السكنية والتجارية في مدينة '${cityNameAr}'.
            أريد الناتج فقط بصيغة JSON array of strings. لا تقم بإضافة أي نص إضافي أو مقدمات.
            مثال: ["حي العليا", "حي النرجس", "حي الملقا"]
        `;
        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```json|```/g, "").trim();
        return JSON.parse(text);
    } catch (error) {
        console.error("AI coverage areas generation failed:", error);
        // في حالة الفشل، نرجع مصفوفة فارغة
        return [];
    }
}