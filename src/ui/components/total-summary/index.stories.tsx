import * as React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Money } from '~/entities/money'
import { TotalSummary } from './index'

export default {
  title: 'components/TotalSummary',
  component: TotalSummary,
} as ComponentMeta<typeof TotalSummary>

const Template: ComponentStory<typeof TotalSummary> = args => {
  return <TotalSummary {...args} />
}

export const DefaultView = Template.bind({})

DefaultView.args = {
  value: new Money('1000', 'MXN'),
}

export const ZeroPrice = Template.bind({})

ZeroPrice.args = {
  value: new Money('0', 'MXN'),
}
