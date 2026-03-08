# دليل بناء تطبيق Easy Quraan للأندرويد

## المتطلبات الأساسية

1. **Android Studio** - قم بتحميله من [هنا](https://developer.android.com/studio)
2. **Java Development Kit (JDK)** - الإصدار 17 أو أحدث
3. **Node.js** - مثبت بالفعل

## خطوات بناء ملف APK

### 1. تحديث المشروع
```bash
npm run android:build
```

### 2. فتح المشروع في Android Studio
```bash
npm run android:open
```

### 3. بناء APK من Android Studio

#### الطريقة الأولى: Debug APK (للتجربة السريعة)
1. في Android Studio، اذهب إلى: `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
2. انتظر حتى ينتهي البناء
3. ستجد الملف في: `android/app/build/outputs/apk/debug/app-debug.apk`

#### الطريقة الثانية: Release APK (للنشر)
1. في Android Studio، اذهب إلى: `Build` → `Generate Signed Bundle / APK`
2. اختر `APK`
3. أنشئ keystore جديد أو استخدم موجود
4. املأ البيانات المطلوبة
5. اختر `release` build variant
6. ستجد الملف في: `android/app/build/outputs/apk/release/app-release.apk`

### 4. بناء APK من سطر الأوامر

#### Debug APK
```bash
cd android
./gradlew assembleDebug
```

#### Release APK (بدون توقيع)
```bash
cd android
./gradlew assembleRelease
```

## الأوامر المتاحة

- `npm run android:sync` - مزامنة التغييرات مع مشروع الأندرويد
- `npm run android:open` - فتح المشروع في Android Studio
- `npm run android:build` - بناء المشروع ومزامنته
- `npm run android:run` - تشغيل التطبيق على جهاز متصل

## ملاحظات مهمة

1. تأكد من تثبيت Android SDK من خلال Android Studio
2. قم بإعداد متغيرات البيئة:
   - `ANDROID_HOME` يجب أن يشير إلى مجلد Android SDK
   - `JAVA_HOME` يجب أن يشير إلى مجلد JDK

3. لتشغيل التطبيق على جهاز حقيقي:
   - فعّل وضع المطور على الهاتف
   - فعّل USB Debugging
   - وصّل الهاتف بالكمبيوتر

4. لتشغيل التطبيق على محاكي:
   - أنشئ AVD (Android Virtual Device) من Android Studio
   - شغّل المحاكي قبل تشغيل الأمر `npm run android:run`

## حل المشاكل الشائعة

### مشكلة: Gradle build failed
**الحل:** تأكد من تثبيت JDK 17 وإعداد JAVA_HOME بشكل صحيح

### مشكلة: SDK not found
**الحل:** افتح Android Studio وثبت Android SDK من SDK Manager

### مشكلة: Device not found
**الحل:** تأكد من تفعيل USB Debugging على الهاتف أو تشغيل المحاكي

## معلومات التطبيق

- **اسم التطبيق:** Easy Quraan
- **Package ID:** com.easyquraan.app
- **الإصدار:** 0.0.0
