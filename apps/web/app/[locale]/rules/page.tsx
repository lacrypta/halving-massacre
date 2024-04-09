'use client';

import { useLocale } from 'next-intl';
import Rules_ES from './components/ES/Rules_ES';
import Rules_EN from './components/EN/Rules_EN';

export default function Page(): JSX.Element {
  const locale = useLocale();

  return locale === 'es' ? <Rules_ES /> : <Rules_EN />;
}
