import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // يشمل كل شيء ما عدا الصفحة الرئيسية `/`
    '/((?!api|trpc|_next|_vercel|.*\\..*|$).*)',
  ]
};
