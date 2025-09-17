module.exports = {
  images: {
    domains: ['ynizozzfjkocvbycxwvo.supabase.co'],
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
}
