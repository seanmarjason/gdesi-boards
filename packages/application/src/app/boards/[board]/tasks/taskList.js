'use client'

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Header from '../../../../components/Header';

import { DataGrid } from '@mui/x-data-grid';


export default function TaskList({ boardId }) {
    const router = useRouter()    

    const [taskData, setTaskData] = useState()

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/boards/${boardId}/tasks`)
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

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'type', headerName: 'Type', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'deadline', headerName: 'Deadline', width: 150 },
    ]

    const rows = taskData

    const handleEvent = (params) => {
        router.push(`/boards/${boardId}/tasks/${params.id}`)
    };

    return (
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
                <Header navigation={['Tasks']}/>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 20,
                        },
                    },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    onRowClick={handleEvent}
                    sx={{ width: '70%' }}
                />
            </Stack>
        </Box>
    )
}