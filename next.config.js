/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  // async rewrites() {
  //   return [
  //     {
  //       source: `/api/:path*`,
  //       destination: 'https://port-0-acoha-server-r8xoo2mles75ad6.sel3.cloudtype.app/:path*',
  //     },
  //   ];
  // },
};
module.exports = nextConfig;

/**
  destination: `https://port-0-acoha-server-r8xoo2mles75ad6.sel3.cloudtype.app/:path*`,
 */
