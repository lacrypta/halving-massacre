import { useLocale } from 'next-intl';
import { locales } from '../../../../config';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale}>
      {locales.map((lang) => (
        <option key={lang} value={lang}>
          {`language: ${lang}`}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
