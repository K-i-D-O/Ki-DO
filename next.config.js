/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  'react-dates',
  '@fullcalendar/core',
]);
module.exports = withTM({
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ['tailwindcss'],
  },
});
