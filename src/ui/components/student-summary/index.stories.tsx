import * as React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { StudentSummary } from './index'

export default {
  title: 'components/StudentSummary',
  component: StudentSummary,
} as ComponentMeta<typeof StudentSummary>

export const DefaultView: ComponentStory<typeof StudentSummary> = args => {
  return <StudentSummary {...args} />
}

DefaultView.args = {
  cohort: '4to de primaria',
  firstName: 'Mateo',
  lastName: 'Creamer',
}
