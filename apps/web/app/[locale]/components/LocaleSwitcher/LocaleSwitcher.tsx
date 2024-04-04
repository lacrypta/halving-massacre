import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { locales } from '../../../../config';

export default function LocaleSwitcher() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale}>
      {locales.map((lang) => (
        <option key={lang} value={lang}>
          {`language: ${t(lang)}`}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
