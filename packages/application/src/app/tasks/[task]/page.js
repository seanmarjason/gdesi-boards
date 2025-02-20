'use client'

import { use } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import AppTheme from '../../shared-theme/AppTheme';
import AppNavbar from '../../components/AppNavbar';
import SideMenu from '../../components/SideMenu';
import Header from '../../components/Header';
import { TaskForm } from './components/TaskForm';

import { tasks } from '../../../data/tasks';

const xThemeComponents = {
};

// TODO: Move to new file containing interface with database
const getTaskData = (taskId) => {
    return tasks.find(taskRecord => 
        taskRecord.id == taskId.toLowerCase()
    )
}

export default function Tasks({ props, params }) {

    const { task } = use(params)

    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
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
                        {/* Main content */}
                        <Header navigation={['Boards', 'Tasks', `${task}`]}/>

                        <TaskForm task={getTaskData(task)} />

                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    )
}