import * as React from 'react'
import { styled } from '@mui/material/styles'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { CollapsibleFees } from './index'

export default {
  title: 'components/CollapsibleFees',
  component: CollapsibleFees,
} as ComponentMeta<typeof CollapsibleFees>

const ListItem = styled('div')`
  height: 40px;
  border: 1px dashed black;
  background: #efefef;
`

const Template: ComponentStory<typeof CollapsibleFees> = args => (
  <CollapsibleFees {...args}>
    <ListItem />
    <ListItem />
    <ListItem />
  </CollapsibleFees>
)

export const DefaultView = Template.bind({})

DefaultView.args = {
  title: 'Cuotas pagadas',
}

export const WithSubtitle = Template.bind({})

WithSubtitle.args = {
  title: 'Cuotas pagadas',
  subtitle: 'Puedes seleccionar mas de uno',
  initialIsExpanded: true,
}

export const Expanded = Template.bind({})

Expanded.args = {
  ...DefaultView.args,
  initialIsExpanded: true,
}
