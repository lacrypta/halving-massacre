import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { AppProvider } from '../../context/AppProvider';

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
  const t = useTranslations();

  return (
    <html lang={locale}>
      <head>
        <link rel="shortcut icon" href="/images/favicon.ico" />

        {/*  */}
        <meta name="author" content="La Crypta" />
        <meta name="description" content={t('HEADER_DESC')} />
        <meta name="robots" content="index,follow" />

        {/* Facebook */}
        <meta property="og:title" content="Halving Massacre | LaWallet.io" />
        <meta property="og:description" content={t('HEADER_DESC')} />
        <meta property="og:locale" content={`${locale}_${locale.toLocaleUpperCase()}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/social/facebook-1200x630.jpg" />
        <meta property="og:url" content="https://lacrypta.ar/" />

        {/* Twitter */}
        <meta name="twitter:title" content="Halving Massacre | LaWallet.io" />
        <meta name="twitter:description" content={t('HEADER_DESC')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/images/social/twitter-600x330.jpg" />
        <meta name="twitter:url" content="https://lacrypta.ar/" />
      </head>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={inter.className}>
          <AppProvider>{children}</AppProvider>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
