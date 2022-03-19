import * as React from 'react'
import Typography from '@mui/material/Typography'
import { MainLayout } from './index'

export default {
  title: 'layouts/MainLayout',
  component: MainLayout,
}

export const DefaultView = () => {
  return (
    <MainLayout>
      {Array.from({ length: 100 }).map((_, index) => (
        <Typography key={index}>Number: {index + 1}</Typography>
      ))}
    </MainLayout>
  )
}
