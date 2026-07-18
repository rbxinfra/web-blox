import {
  join,
  dirname
} from 'path';
import {
  fileURLToPath
} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('@storybook/react-vite').StorybookConfig} */
export default {
  stories: [
    "../stories/Introduction.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-designs", "storybook-addon-profiler"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: false,
  },
  docs: {
    autodocs: 'tag'
  },
  features: {
    interactions: false,
    actions: false
  },
  async viteFinal(config) {
    return {
      ...config,

      build: {
        ...config.build,
        rolldownOptions: {
          ...config.build.rolldownOptions,
          output: {
            ...config.build.rolldownOptions.output,

            codeSplitting: {
              minSize: 20000,
              groups: [{
                  name: 'vendor',
                  test: /node_modules/,
                },
                {
                  name: 'stories',
                  test: /stories/,
                }
              ],
            }
          }
        }
      },

      define: {
        ...config.define,
        'global': 'window',
        'process.env': {},
        'Buffer': '[]',
      },
      resolve: {
        ...config.resolve,
        tsconfigPaths: true,
        alias: [{
            find: '@rbx/ui',
            replacement: join(__dirname, '../packages/ui/src/index.ts')
          },
          {
            find: '@rbx/design-foundations',
            replacement: join(__dirname, '../packages/design-foundations/src/index.ts')
          },

          {
            find: /^@emotion\/server(\/.*)?$/,
            replacement: 'virtual:mock-emotion-server'
          },

          ...(Array.isArray(config.resolve?.alias) ? config.resolve.alias : [])
        ]
      },
      plugins: [
        ...(config.plugins || []),
        {
          name: 'mock-emotion-server-plugin',
          resolveId(id) {
            if (id === 'virtual:mock-emotion-server') {
              return id;
            }
          },
          load(id) {
            if (id === 'virtual:mock-emotion-server') {
              return `
                export default function() { return {}; };
                export function createEmotionServer() { return {}; };
                const createInstance = () => ({});
                export { createInstance };
              `;
            }
          }
        }
      ],
      esbuild: {
        ...config.esbuild,
        jsx: 'automatic',
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        entries: [
          join(__dirname, '../packages/ui/src/**/*.{ts,tsx}'),
          join(__dirname, '../packages/design-foundations/src/**/*.{ts,tsx}'),

          join(__dirname, '../stories/**/*.{js,jsx,ts,tsx,mdx}')
        ],
        exclude: [
          ...(config.optimizeDeps?.exclude || []),

          '@rbx/ui',
          '@rbx/design-foundations'
        ],
        include: [
          ...(config.optimizeDeps?.include || []),

          'react',
          'react-dom',
          'react/jsx-runtime',
          '@emotion/react',
          '@emotion/styled'
        ],
      }
    };
  },
};