'use client'

import { useState } from "react";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import { ThemeProvider } from '@mui/material/styles';

import AppNavbar from '../../components/AppNavbar';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import { theme } from '../../shared-theme/AppTheme';

import CheckInRecord from "./components/CheckInRecord";
import CheckInForm from "./components/CheckInForm";

export default function CheckIn({ checkIns }) {

    const [pastCheckIn, setPastCheckIn] = useState('')

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
            //   backgroundColor: theme.vars
            //     ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            //     : alpha(theme.palette.background.default, 1),
            //   height: '100vh'
            })}
            >
            <Stack
                spacing={2}
                sx={
                 {
                    mx: 3,
                    pb: 5,
                    mt: { xs: 8, md: 0 },
                    height: '100%'
                }
                }
            >
                <Header />

                <Grid container spacing={1}>

                    {/* FORM ELEMENT */}
                    <Grid size={10}>
                        {/* <div>Form</div> */}
                        { 
                            pastCheckIn
                            ? <CheckInRecord checkIn={ pastCheckIn }/>
                            : <CheckInForm />
                        }
                    </Grid>


                    {/* LIST ELEMENT */}
                    <Grid size={2}>
                        <div>List</div>
                    </Grid>

                </Grid>

                {/* <MainGrid data={board.columns}/> */}

            </Stack>
            </Box>
        </Box>
        </ThemeProvider>

    )
}