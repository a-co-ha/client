/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: `/:path*`,
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination:
  //         '',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;

/**
        destination: `https://port-0-acoha-server-r8xoo2mles75ad6.sel3.cloudtype.app/:path*`,
 * NEXT_PUBLIC_APP_GITHUB_OAUTH_CLIENT_ID=fbf3b38d2be970ce980e
NEXT_PUBLIC_APP_GITHUB_OAUTH_CLIENT_SECRET=133722732852765e1d61d47ee83aedb182ce43f9
NEXT_PUBLIC_APP_GITHUB_OAUTH_REDIRECT_URL=http://localhost:3000/callback
 */
