---
layout: ../../layouts/LayoutBlogPost.astro
title: "develop laravel package"
description: "الأساسيات: مقدمة عن مفهوم المكتبة في Laravel، وأهميتها، ومكوناتها الأساسية"
pubDate: 2025-01-03
category: "intro"
---

<div dir="rtl">



بالتأكيد، سأقوم بتلخيص المقالات الخمسة حول إنشاء مكتبة Laravel، مع التركيز على النقاط الرئيسية وترتيبها بشكل منطقي ومختصر، مع استخدام تنسيق Markdown والكود Markdown عند الحاجة:

**1. أساسيات إنشاء مكتبة Laravel (https://www.laravelpackage.com/01-the-basics/)**

*   **مفهوم المكتبة:** المكتبة في Laravel هي حزمة قابلة لإعادة الاستخدام، تحتوي على وظائف محددة لتلبية حاجة معينة. يمكن استخدامها في مشاريع Laravel متعددة.
*   **لماذا ننشئ مكتبة؟** لتجنب تكرار الكود، تسهيل الصيانة، وتحسين تنظيم المشروع.
*   **المكونات الأساسية:** تتضمن المكتبة عادةً: كود PHP (Classes, Traits, Interfaces)، ملفات تهيئة (Configurations)، ملفات ترجمة (Translations)، ملفات عرض (Views)، وأوامر Artisan (Commands).
*   **التنظيم:** يُفضل تنظيم الكود داخل مجلد `src` في جذر المكتبة، مع أسماء مجالات (namespaces) مناسبة.
*   **إضافة المكتبة:** يتم إضافة المكتبة كاعتمادية عبر composer.

**2. تجهيز بيئة التطوير (https://www.laravelpackage.com/02-development-environment/)**

*   **إنشاء المجلد:** يتم إنشاء مجلد جديد للمكتبة خارج مشروع Laravel.
*   **تهيئة Composer:** استخدام `composer init` لإنشاء ملف `composer.json` وتحديد تفاصيل المكتبة (اسم، وصف، ترخيص، إلخ).
*   **إنشاء ملفات src:** داخل المجلد الجديد، يتم إنشاء مجلد `src` لوضع كود PHP الخاص بالمكتبة.
*   **تعريف المجال (Namespace):** تحديد مجال اسم للمكتبة داخل ملف `composer.json`. مثال:
    ```json
    {
        "autoload": {
            "psr-4": {
                "VendorName\\PackageName\\": "src/"
            }
        }
    }
    ```
*   **تحديث الـ Autoloader:** تنفيذ الأمر `composer dump-autoload` لتحديث ملفات التحميل التلقائي.
*   **إضافة المكتبة إلى مشروع Laravel:** إضافة المكتبة كاعتمادية في مشروع Laravel باستخدام `composer require vendor-name/package-name`.

**3. موفّرو الخدمات (Service Providers) (https://www.laravelpackage.com/03-service-providers/)**

*   **دور موفر الخدمة:** موفر الخدمة هو نقطة الدخول الرئيسية للمكتبة في Laravel. يقوم بتسجيل الخدمات والملفات الضرورية (مثل: ملفات التهيئة، ملفات العرض، إلخ).
*   **إنشاء موفر خدمة:** يتم إنشاء موفر الخدمة باستخدام أمر Artisan:
    ```bash
    php artisan make:provider VendorName\PackageName\PackageServiceProvider
    ```
*   **تسجيل الخدمات:** داخل موفر الخدمة، يتم تعريف الخدمات التي تقدمها المكتبة باستخدام  <span dir="ltr">`register()`</span>. على سبيل المثال:
    ```php
    public function register()
    {
        $this->app->bind('package-service', function () {
            return new \VendorName\PackageName\MyService();
        });
    }
    ```
*   **تسجيل ملفات التهيئة:** لتسجيل ملفات التهيئة، يتم استخدام `mergeConfigFrom()`.
    ```php
    public function boot()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/package.php', 'package');
    }
    ```
*   **تسجيل المجلدات:** يمكن تسجيل المجلدات التي تحتوي على ملفات العرض والترجمات باستخدام `loadViewsFrom()` و `loadTranslationsFrom()` على التوالي.
*   **تفعيل موفر الخدمة:** يتم تفعيل موفر الخدمة في ملف `config/app.php` ضمن قسم `providers`.

**4. الاختبارات (Testing) (https://www.laravelpackage.com/04-testing/)**

*   **أهمية الاختبارات:** تضمن الاختبارات عمل المكتبة بشكل صحيح وتساعد في اكتشاف الأخطاء مبكرًا.
*   **إعداد الاختبارات:** يتم إنشاء مجلد `tests` في جذر المكتبة. يتم استخدام PHPUnit لكتابة الاختبارات.
*   **كتابة الاختبارات:** يجب كتابة اختبارات لكل وظيفة أو جزء رئيسي في المكتبة.
*   **تشغيل الاختبارات:** يتم تشغيل الاختبارات باستخدام الأمر:
    ```bash
    ./vendor/bin/phpunit
    ```
*   **أمثلة:** اختبار وحدة (Unit Test) لاختبار وظيفة معينة في المكتبة:
    ```php
    <?php
    namespace VendorName\PackageName\Tests;

    use PHPUnit\Framework\TestCase;
    use VendorName\PackageName\MyService;

    class MyServiceTest extends TestCase
    {
        public function testMyServiceFunction()
        {
            $service = new MyService();
            $result = $service->myFunction('test');
            $this->assertEquals('test modified', $result);
        }
    }
    ```

**5. الواجهات (Facades) (https://www.laravelpackage.com/05-facades/)**

*   **مفهوم الواجهة:** الواجهات توفر طريقة سهلة ومختصرة للوصول إلى خدمات المكتبة.
*   **إنشاء واجهة:** يتم إنشاء واجهة عبر امتداد فئة `Facade`.
    ```php
    <?php
    namespace VendorName\PackageName\Facades;
    use Illuminate\Support\Facades\Facade;
    class MyPackage extends Facade
    {
        protected static function getFacadeAccessor()
        {
            return 'package-service';
        }
    }
    ```
*   **تسجيل الواجهة:** يتم تسجيل الواجهة في موفر الخدمة.
    ```php
    public function boot()
    {
        $this->app->alias('VendorName\PackageName\Facades\MyPackage', 'MyPackage');
    }
    ```
*   **استخدام الواجهة:** يمكن استخدام الواجهة للوصول إلى خدمات المكتبة بسهولة:
    ```php
    MyPackage::myFunction('test');
    ```
*   **مزايا الواجهات:** تجعل الكود أكثر وضوحًا وقابلية للقراءة.

هذا تلخيص مفصل ومنظم للمقالات الخمسة، مع توضيح النقاط الأساسية والأكواد الهامة. أتمنى أن يكون هذا مفيدًا لك!
</div>
