/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
  experimental: {
     turbo: {
       resolveAlias: {
         canvas: './empty-module.ts',
       },
     },
   },
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev'
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com'
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net'
      },
      {
        protocol: 'https',
        hostname: 'e-cdns-images.dzcdn.net'
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com'
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, { dev, isServer }) {
    config.experiments = {
      asyncWebAssembly: true,
      syncWebAssembly: true,
      layers: true,
      topLevelAwait: true,
    };
    
    if (!dev && !isServer) {
      config.cache = false;
    }
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    config.module.rules.push({
      test: /\.LICENSE$/,
      use: 'ignore-loader'
    });
 
    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?js/,
      type: 'asset/resource',
      generator: {
        filename: 'static/worker/[hash][ext][query]'
      }
    });
    
    if (!isServer) {
      config.output.environment = { ...config.output.environment, asyncFunction: true };
      config.resolve.fallback.worker_threads = false;
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        stream: false,
        crypto: false
      };
    }
    return config;
  },
});
module.exports = nextConfig;

