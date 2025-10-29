const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/vue-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    // 确保 PostCSS 配置被正确应用
    const postcssLoader = {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          config: path.resolve(__dirname, '../postcss.config.js'),
        },
      },
    };

    // 找到处理 CSS 的规则并添加 postcss-loader
    config.module.rules.forEach((rule) => {
      if (rule.test && rule.test.toString().includes('css')) {
        // 确保 use 是数组
        if (Array.isArray(rule.use)) {
          // 检查是否已经有 postcss-loader
          const hasPostCSSLoader = rule.use.some(
            (loader) => loader.loader && loader.loader.includes('postcss-loader')
          );
          if (!hasPostCSSLoader) {
            // 在 css-loader 之后添加 postcss-loader
            const cssLoaderIndex = rule.use.findIndex(
              (loader) => loader.loader && loader.loader.includes('css-loader')
            );
            if (cssLoaderIndex !== -1) {
              rule.use.splice(cssLoaderIndex + 1, 0, postcssLoader);
            }
          }
        }
      }
    });

    return config;
  },
};
