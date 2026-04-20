/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@midnight-ntwrk/compact-runtime',
    '@midnight-ntwrk/dapp-connector-api',
    '@midnight-ntwrk/ledger',
    '@midnight-ntwrk/midnight-js-contracts',
    '@midnight-ntwrk/midnight-js-types',
    '@midnight-ntwrk/midnight-js-utils'
  ],
  webpack: (config) => {
    config.experiments = { 
      ...config.experiments, 
      topLevelAwait: true,
      asyncWebAssembly: true,
      layers: true
    };
    return config;
  },
}

module.exports = nextConfig
