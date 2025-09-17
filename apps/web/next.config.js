/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ynizozzfjkocvbycxwvo.supabase.co'],
  },
  swcMinify: false,
  generateBuildId: async () => {
    return 'build-' + Date.now()
  }
}

module.exports = nextConfig
