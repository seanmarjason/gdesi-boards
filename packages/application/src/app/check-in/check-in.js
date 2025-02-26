'use client'

import { useState } from "react";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Grid from '@mui/material/Grid2';
import { ThemeProvider } from '@mui/material/styles';

import AppNavbar from '../../components/AppNavbar';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import { theme } from '../../shared-theme/AppTheme';

import CheckInRecord from "./components/CheckInRecord";
import CheckInForm from "./components/CheckInForm";
import { Card } from "@mui/material";

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
                    <Grid size={8}>
                        {/* <div>Form</div> */}
                        { 
                            pastCheckIn
                            ? <CheckInRecord checkIn={ pastCheckIn }/>
                            : <CheckInForm />
                        }
                    </Grid>


                    {/* LIST ELEMENT */}
                    <Grid size={4}>
                        {/* <div>List</div> */}
                            { console.log("CHECKINS", checkIns)}
                            <List component="nav" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {
                                !pastCheckIn && 
                                <ListItem>
                                    <ListItemButton
                                        selected
                                        onClick={(event) => console.log(`Click`)}
                                    >
                                        <ListItemText primary={"New"} secondary={"Rating:"} />
                                    </ListItemButton>
                                </ListItem>
                            }
                            {
                                checkIns.data.map((checkIn, index) => {
                                    return (
                                        <ListItem>
                                            <ListItemButton
                                                // selected
                                                onClick={(event) => console.log(`Click`)}
                                            >
                                                <ListItemText primary={checkIn.date} secondary={`Rating: ${checkIn.rating}`} />
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })
                            }
                            </List>
                    </Grid>

                </Grid>

                {/* <MainGrid data={board.columns}/> */}

            </Stack>
            </Box>
        </Box>
        </ThemeProvider>

    )
}