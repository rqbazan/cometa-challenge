import * as React from 'react'
import Typography from '@mui/material/Typography'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { MainLayout } from './index'

export default {
  title: 'layouts/MainLayout',
  component: MainLayout,
} as ComponentMeta<typeof MainLayout>

export const DefaultView: ComponentStory<typeof MainLayout> = () => {
  return (
    <MainLayout>
      {Array.from({ length: 100 }).map((_, index) => (
        <Typography key={index}>Number: {index + 1}</Typography>
      ))}
    </MainLayout>
  )
}
