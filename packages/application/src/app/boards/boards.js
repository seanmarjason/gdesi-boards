'use client'

import * as React from 'react';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { ThemeProvider } from '@material-ui/core/styles';

import AppNavbar from '../components/AppNavbar';
import Header from '../components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from '../components/SideMenu';
import { theme } from '../shared-theme/AppTheme';

import { board } from '../../data/boards';

const xThemeComponents = {
};


export default function Boards() {
    return (
        
    <ThemeProvider
        theme={theme}
        >

        <CssBaseline enableColorScheme />
        <Box sx={{ display: 'flex' }}>
            <SideMenu />
            <AppNavbar />
            {/* Main content */}
            <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                : alpha(theme.palette.background.default, 1),
              height: '100vh'
            })}
            >
            <Stack
                spacing={2}
                sx={{
                alignItems: 'center',
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 },
                height: '100%'
                }}
            >
                <Header />

                <MainGrid data={board.columns}/>

            </Stack>
            </Box>
        </Box>
        </ThemeProvider>

    )
}