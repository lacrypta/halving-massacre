import createMiddleware from 'next-intl/middleware';
import { defaultLocale, localePrefix, locales } from './translations/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|manifest.json|sw.js|workbox-*.js|_next/static|emotes/|images/).*)'],
};
