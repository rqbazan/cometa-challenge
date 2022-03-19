import GlobalStyles from '@mui/material/GlobalStyles'

export const globalStyles = (
  <GlobalStyles
    styles={props => ({
      '::-webkit-scrollbar': {
        display: 'none',
      },
    })}
  />
)
