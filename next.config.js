// next.config.js
module.exports = {
    distDir: 'build',
    reactStrictMode: true,
    experimental: {
      appDir: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
  };