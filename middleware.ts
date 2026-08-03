import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// ۱. تعریف تمامی مسیرهایی که کاربران مهمان باید به آن‌ها دسترسی داشته باشند
const isPublicRoute = createRouteMatcher([
  "/",
  "/shop(.*)",          // تمام صفحات فروشگاه، دسته‌بندی‌ها و فیلترها
  "/cart",             // صفحه سبد خرید
  "/product(.*)",      // صفحات جزئیات محصول
  "/api/products(.*)", // API خواندن محصولات
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/inngest(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // ۲. فقط در صورتی که مسیر عمومی نبود، کاربر را مجبور به ورود کن
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // تنظیمات استاندارد Next.js برای نادیده گرفتن فایل‌های استاتیک
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|webp|png|jpg|jpeg|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};