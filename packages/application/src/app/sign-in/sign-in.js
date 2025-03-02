'use client'

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';

import { ThemeProvider } from '@mui/material/styles';

import AppAppBar from '../../components/menu/AppAppBar';

import SignInCard from './components/SignInCard';
import Content from './components/Content';

import { theme } from '../../shared-theme/AppTheme';


export default function SignInSide(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
            marginTop: 'max(80px - var(--template-frame-height, 0px), 0px)',
            minHeight: '100%',
          },
        ]}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
        >
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
            <Content />
            <SignInCard />
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
