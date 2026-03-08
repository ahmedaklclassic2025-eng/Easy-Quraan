# تطبيق Easy Quraan للأندرويد

## ✅ تم بناء التطبيق بنجاح!

تم تحويل المشروع إلى تطبيق أندرويد باستخدام Capacitor وبناء ملف APK بنجاح.

### 📱 ملفات APK المتاحة

#### النسخة الأحدث (v1.1) - مع دعم المساحة الآمنة ✨
- **الملف:** `Easy-Quraan-v1.1-SafeArea.apk`
- **الحجم:** 4.3 ميجابايت
- **النوع:** Debug APK (للتجربة والاختبار)
- **الميزات الجديدة:**
  - ✅ دعم كامل للمساحة الآمنة (Safe Area)
  - ✅ لا يتداخل مع شريط الحالة العلوي
  - ✅ لا يتداخل مع شريط التنقل السفلي
  - ✅ عرض مثالي على جميع الهواتف
  - ✅ دعم الشاشات ذات النوتش (Notch)
  - ✅ شريط حالة شفاف مع تباين مناسب

#### النسخة السابقة (v1.0)
- **الملف:** `Easy-Quraan-v1.0-debug.apk`
- **الحجم:** 4.3 ميجابايت

### 🚀 تثبيت التطبيق

1. انقل ملف `Easy-Quraan-v1.1-SafeArea.apk` إلى هاتفك الأندرويد
2. افتح الملف على الهاتف
3. اسمح بتثبيت التطبيقات من مصادر غير معروفة (إذا طُلب منك)
4. اضغط على "تثبيت"

### 🔧 الأوامر المتاحة

```bash
# بناء المشروع ومزامنته مع الأندرويد
npm run android:build

# فتح المشروع في Android Studio
npm run android:open

# مزامنة التغييرات فقط
npm run android:sync

# تشغيل التطبيق على جهاز متصل
npm run android:run
```

### 📝 بناء APK يدوياً

إذا أردت بناء APK مرة أخرى:

```bash
cd android
$env:JAVA_HOME="C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot"
./gradlew assembleDebug
```

ستجد الملف في: `android/app/build/outputs/apk/debug/app-debug.apk`

### 🏗️ بناء Release APK (للنشر)

لبناء نسخة Release موقعة:

1. افتح Android Studio
2. اذهب إلى: `Build` → `Generate Signed Bundle / APK`
3. اختر `APK`
4. أنشئ keystore جديد أو استخدم موجود
5. املأ البيانات المطلوبة
6. اختر `release` build variant

### 📋 معلومات التطبيق

- **اسم التطبيق:** Easy Quraan
- **Package ID:** com.easyquraan.app
- **الإصدار:** 1.0
- **Version Code:** 1
- **Min SDK:** 24 (Android 7.0)
- **Target SDK:** 36

### 🔄 تحديث التطبيق

بعد تعديل الكود:

1. قم ببناء المشروع: `npm run build`
2. مزامنة مع الأندرويد: `npm run android:sync`
3. بناء APK جديد: `cd android && ./gradlew assembleDebug`

### ⚙️ المتطلبات

- Node.js
- JDK 17 (مثبت في: `C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot`)
- Android Studio (اختياري، للتطوير المتقدم)

### 📚 الملفات المهمة

- `capacitor.config.ts` - إعدادات Capacitor
- `android/` - مشروع الأندرويد الكامل
- `ANDROID_BUILD.md` - دليل مفصل للبناء
- `Easy-Quraan-v1.0-debug.apk` - ملف APK الجاهز

### 🎯 الميزات

- قراءة القرآن الكريم
- البحث في الآيات
- التفسير
- حفظ موضع القراءة
- الوضع الليلي/النهاري
- واجهة عربية سهلة الاستخدام

---

تم البناء بنجاح! 🎉
