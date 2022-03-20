const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const getPublicPath = configType => (configType === 'PRODUCTION' ? '/storybook/' : '/')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  features: {
    emotionAlias: false,
  },
  framework: '@storybook/react',
  webpackFinal: (config, { configType }) => {
    config.module.rules = [
      ...config.module.rules,
      {
        include: /node_modules/,
        test: /\.mjs$/,
        type: 'javascript/auto',
      },
    ]
    config.resolve.plugins = [...config.resolve.plugins, new TsconfigPathsPlugin()]

    config.output.publicPath = getPublicPath(configType)

    return config
  },
  managerWebpack: (config, { configType }) => {
    config.output.publicPath = getPublicPath(configType)

    return config
  },
}
