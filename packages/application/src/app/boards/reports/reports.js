'use client'

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AppNavbar from '../../../components/AppNavbar';
import SideMenu from '../../../components/SideMenu';
import Header from '../../../components/Header';

import { DataGrid } from '@mui/x-data-grid';


export default function Reports(props) {
    const router = useRouter()

    const [teamActivity, setTeamActivity] = useState()

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/activity?team')
            const data = await res.json()
            setTeamActivity(data)
        }
        fetchData()
    }, [])

    if (!teamActivity || Object.keys(teamActivity).length == 0) {
        return (
            <Typography element="h1" variant="h6">
                Loading...
            </Typography>
        )
    }
    
    const columns = [
        { field: 'id', headerName: 'Id', width: 90 },
        { field: 'name', headerName: 'Name', width: 90 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'rating', headerName: 'Rating', width: 150 },
    ]

    const rows = teamActivity

    const handleEvent = (params) => {
        router.push(`/boards/check-ins/${params.id}`)
    };

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
                        <Header navigation={['Boards', 'Reports']}/>

                        <Box sx={{ width: '100%' }}>
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
                            />
                        </Box>

                    </Stack>
                </Box>
            </Box>
    )
}