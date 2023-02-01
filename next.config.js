/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `https://github.com/login/oauth/access_token/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
