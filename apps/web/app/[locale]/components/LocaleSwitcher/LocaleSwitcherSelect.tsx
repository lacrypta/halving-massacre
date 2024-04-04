'use client';

import clsx from 'clsx';
import { useTransition, type ChangeEvent, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  defaultValue: string;
};

export default function LocaleSwitcherSelect({ children, defaultValue }: Props) {
  const [isPending, startTransition] = useTransition();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      const expire = new Date(Date.now() + 86400 * 365 * 1000).toUTCString();
      document.cookie = `localeTranslation=${nextLocale}; expires=${expire}; path=/`;
      window.location.reload();
    });
  }

  return (
    <label className={clsx('relative text-gray-400', isPending && 'transition-opacity [&:disabled]:opacity-30')}>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  );
}
