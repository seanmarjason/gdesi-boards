import * as React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// TOOO: Fix theme issues caused by passing functions through theme
// import { theme } from '../../shared-theme/AppTheme';
import theme from '@/theme';

export default function BoardsLayout(props) {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {props.children}
      </ThemeProvider>
  );
}
