// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { ipRangesByCountry } from './lib/ipRanges';
import ipaddr from 'ipaddr.js';

function getClientIp(request: NextRequest): string | null {
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }

    // كخيار احتياطي فقط إذا كنت تستخدم Proxy داخلي
    const realIp = request.headers.get('x-real-ip');
    if (realIp) {
        return realIp;
    }

    return null;
}

function isIpInCountry(ip: string, cidrList: string[]): boolean {
    try {
        const parsedIp = ipaddr.parse(ip);

        return cidrList.some((cidr) => {
            const [range, bits] = cidr.split('/');
            if (!range || !bits) return false;
            const cidrAddr = ipaddr.parse(range);

            // `match()` only works if both IPs are same kind (v4 or v6)
            if (parsedIp.kind() !== cidrAddr.kind()) return false;

            return parsedIp.match(cidrAddr, parseInt(bits));
        });
    } catch (e) {
        console.error('Invalid IP or CIDR:', e);
        return false;
    }
}

export default function middleware(request: NextRequest) {
    const ip = getClientIp(request) || '';
    console.log('📡 User IP:', ip);
    let locale: 'ar' | 'en' = 'en';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_countryCode, cidrs] of Object.entries(ipRangesByCountry)) {
        if (isIpInCountry(ip, cidrs)) {
            locale = 'ar';
            break;
        }
    }

    const url = request.nextUrl.clone();
    const pathname = url.pathname;

    if (!routing.locales.some((loc) => pathname.startsWith(`/${loc}`))) {
        url.pathname = `/${locale}${pathname}`;
        return NextResponse.redirect(url);
    }

    return createMiddleware(routing)(request);
}

export const config = {
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
