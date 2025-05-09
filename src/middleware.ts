import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
    // قراءة رأس CF-IPCountry المرسل من Cloudflare
    const country = request.headers.get('cf-ipcountry')?.toUpperCase();

    console.log('🌍 Country from Cloudflare:', country);

    // الدول العربية التي نريد تحديد اللغة لها
    const arabCountries = ['TR', 'EG', 'SA', 'AE', 'SD', 'SY'];
    let locale: 'ar' | 'en' = 'en';

    // إذا كانت الدولة من الدول العربية، نحدد اللغة العربية
    if (country && arabCountries.includes(country)) {
        locale = 'ar';
    }

    const url = request.nextUrl.clone();
    const pathname = url.pathname;

    // إذا لم يكن المسار يحتوي على لغة، نوجهه إلى اللغة المحددة
    if (!routing.locales.some((loc) => pathname.startsWith(`/${loc}`))) {
        url.pathname = `/${locale}${pathname}`;
        return NextResponse.redirect(url);
    }

    // إذا كان المسار يحتوي على اللغة المطلوبة، نتابع
    return createMiddleware(routing)(request);
}

export const config = {
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
