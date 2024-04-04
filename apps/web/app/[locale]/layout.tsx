import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export const metadata: Metadata = {
  title: 'Halving Massacre | LaWallet.io',
  description: 'Lightning Network Halving Game',
};

export default function RootLayout({ children, params: { locale } }: Readonly<LayoutProps>) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={inter.className}>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
