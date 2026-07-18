import type { NextConfig } from "next";
import { resolve } from "path";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: '.static',

  /* config options here */
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  bundlePagesRouterDependencies: true,
  turbopack: {
    root: resolve('../../'),
    resolveAlias: {
      "@emotion/react": "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js",
      "@emotion/styled": "./node_modules/@emotion/styled/dist/emotion-styled.browser.esm.js",
      "@emotion/cache": "./node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js",
      "@emotion/serialize": "./node_modules/@emotion/serialize/dist/emotion-serialize.browser.esm.js",
      "@emotion/utils": "./node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js",
      "@emotion/weak-memoize": "./node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.browser.esm.js",
      "@emotion/server": "./node_modules/@emotion/server/dist/emotion-server.browser.esm.js",
    },
  },

  env: {
    robloxSiteDomain: process.env.robloxSiteDomain,
    assetPathPrefix: process.env.assetPathPrefix
  }

};

export default nextConfig;
