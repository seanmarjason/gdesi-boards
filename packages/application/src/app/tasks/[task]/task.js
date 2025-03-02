'use client'

import { useState, useEffect } from "react";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { theme } from '../../../shared-theme/AppTheme';

import AppNavbar from '../../../components/AppNavbar';
import SideMenu from '../../../components/SideMenu';
import Header from '../../../components/Header';
import { TaskForm } from './components/TaskForm';

export default function Task({ task }) {

    const [taskData, setTaskData] = useState()

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/tasks?task-id=${task}`)
            const data = await res.json()
            setTaskData(data)
        }
        fetchData()
    }, [])

    if (!taskData || Object.keys(taskData).length == 0) {
        return (
            <Typography element="h1" variant="h6">
                Loading...
            </Typography>
        )
    }

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
                        <Header navigation={['Tasks', `${taskData.id}`]}/>

                        <TaskForm task={ taskData } />

                    </Stack>
                </Box>
            </Box>
        </ThemeProvider>
    )
}