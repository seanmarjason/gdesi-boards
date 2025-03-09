'use client'

import { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AppNavbar from '../../../../../components/AppNavbar';
import SideMenu from '../../../../../components/SideMenu';
import Header from '../../../../../components/Header';
import { TaskForm } from '../../../../../components/TaskForm';

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
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
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
    )
}