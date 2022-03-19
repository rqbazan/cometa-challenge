import * as React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FloatingButton } from './index'

export default {
  title: 'components/FloatingButton',
  component: FloatingButton,
  argTypes: {
    children: {
      type: 'string',
    },
  },
} as ComponentMeta<typeof FloatingButton>

export const DefaultView: ComponentStory<typeof FloatingButton> = args => {
  return <FloatingButton {...args} />
}

DefaultView.args = {
  children: 'Click me',
}

DefaultView.parameters = {
  controls: { include: ['children'] },
}
