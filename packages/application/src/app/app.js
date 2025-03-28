'use client'

import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { ThemeProvider } from '@mui/material/styles';


import AppAppBar from '../components/AppAppBar';
import { theme } from '../shared-theme/AppTheme';

import Hero from '../components/Hero';
import Highlights from '../components/Highlights';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function App({ session }) {
  return (
    <ThemeProvider
        theme={theme}
    >
        <CssBaseline enableColorScheme />
        <AppAppBar user={ session?.user?.email }/>
        <Hero />
        <div>
            <Features />
            <Divider />
            <Divider />
            <Highlights />
            <Divider />
            <Divider />
            <FAQ />
            <Divider />
            <Footer />
        </div>
    </ThemeProvider>
  );
}
