'use client'

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppAppBar from '../components/menu/AppAppBar';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../shared-theme/AppTheme';

import Hero from '../components/Hero';
import LogoCollection from '../components/LogoCollection';
import Highlights from '../components/Highlights';
import Pricing from '../components/Pricing';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function App(props) {
  return (
    <ThemeProvider
        theme={theme}
    >
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Hero />
        <div>
            <LogoCollection />
            <Features />
            <Divider />
            <Testimonials />
            <Divider />
            <Highlights />
            <Divider />
            <Pricing />
            <Divider />
            <FAQ />
            <Divider />
            <Footer />
        </div>
    </ThemeProvider>
  );
}
