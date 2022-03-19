const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const getPublicPath = configType => (configType === 'PRODUCTION' ? '/storybook/' : '/')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  webpackFinal: (config, { configType }) => {
    config.resolve.plugins = [...config.resolve.plugins, new TsconfigPathsPlugin()]

    config.output.publicPath = getPublicPath(configType)

    return config
  },
  managerWebpack: (config, { configType }) => {
    config.output.publicPath = getPublicPath(configType)

    return config
  },
}
