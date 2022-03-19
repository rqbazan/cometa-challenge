import * as React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
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
  priceAmount: '1000',
  priceCurrency: '$',
}

export const ZeroPrice = Template.bind({})

ZeroPrice.args = {
  priceAmount: '0',
  priceCurrency: '$',
}
