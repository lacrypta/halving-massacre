import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    EMERGENCY_LOCK_SERVER: 'false',
    EMERGENCY_LOCK_SERVER_DISCLAIMER: 'Fixing bugs. Be right back',
    EMERGENCY_LOCK_TICKET: 'false',
    EMERGENCY_LOCK_POWER: 'false',
  },
};

export default withNextIntl(nextConfig);
