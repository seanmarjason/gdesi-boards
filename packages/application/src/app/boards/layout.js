import * as React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
