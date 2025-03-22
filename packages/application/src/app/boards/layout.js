import * as React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { auth } from '../auth';
import Unauthenticated from './unauthenticated';

// TOOO: Fix theme issues caused by passing functions through theme
// import { theme } from '../../shared-theme/AppTheme';
import theme from '@/theme';

export default async function BoardsLayout({children}) {
  const session = await auth();

  if (!session) {
    return <Unauthenticated />
  }
  
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
            {children}
      </ThemeProvider>
  );
}
