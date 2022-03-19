import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { AppProvider } from '~/provider'

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone5',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  Story => (
    <AppProvider>
      <Story />
    </AppProvider>
  ),
]
