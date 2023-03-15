/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: `/:path*`,
  //       destination: 'http://localhost:3002/:path*',
  //     },
  //   ];
  // },
};
module.exports = nextConfig;

/**
 * source: `/api/:path*`,
  destination: `https://port-0-acoha-server-r8xoo2mles75ad6.sel3.cloudtype.app/api/:path*`,
 */
