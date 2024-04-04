import { type Pathnames } from 'next-intl/navigation';

export const locales = ['es', 'en'];

export const pathnames = {
  '/': '/',
  '/profile/[id]': '/profile/[id]',
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
