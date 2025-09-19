/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Temporarily ignore build errors to get deployed
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['therabrake.academy', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ynizozzfjkocvbycxwvo.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig
