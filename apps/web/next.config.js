/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.lawallet.io',
        port: '',
        pathname: '/img/domains/**',
      },
    ],
  },
};
