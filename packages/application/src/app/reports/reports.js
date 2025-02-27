'use client'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../../shared-theme/AppTheme';

import AppNavbar from '../../components/AppNavbar';
import SideMenu from '../../components/SideMenu';
import Header from '../../components/Header';


export default function TaskList({ }) {

    return (
        <ThemeProvider
            theme={theme}
        >
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        // backgroundColor: theme.vars
                        // ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                        // : alpha(theme.palette.background.default, 1),
                        // height: '100vh'
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
                        {/* Main content */}
                        <Header navigation={['Boards', 'Reports']}/>

                        {/* INSERT STUFF HERE */}

                    </Stack>
                </Box>
            </Box>
        </ThemeProvider>
    )
}