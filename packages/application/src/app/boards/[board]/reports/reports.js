'use client'

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import Header from '../../../../components/Header';

import { DataGrid } from '@mui/x-data-grid';

import { getDate, getEndOfWeek, getLastWeek, getNextWeek } from "../../../utils/getDate";

export default function Reports({ boardId, reportDate }) {
    const router = useRouter()

    const [selectedReportDate, setSelectedReportDate] = useState(reportDate ?? getDate())
    const [teamActivity, setTeamActivity] = useState()

    const reportWeekEndDate = getEndOfWeek(selectedReportDate)

    useEffect(() => {
        async function fetchData() {
            const params = new URLSearchParams();
            params.append("date", reportWeekEndDate);
            const res = await fetch(`/api/boards/${boardId}/activity?${params}`)
            const data = await res.json()
            setTeamActivity(data)
        }
        fetchData()
    }, [])

    if (!selectedReportDate) {
        return (
            <Typography element="h1" variant="h6">
                Loading...
            </Typography>
        )
    }
    
    const columns = [
        { field: 'id', headerName: 'Id', width: 90 },
        { field: 'userid', headerName: 'User Id', width: 150 },
        { field: 'name', headerName: 'User Name', width: 150 },
        { field: 'rating', headerName: 'Rating', width: 150 },
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'count', headerName: 'Total', width: 90 }, // TODO: Remove
        { field: 'completed', headerName: 'Completed', width: 90 },
        { field: 'started', headerName: 'Started', width: 90 },
        { field: 'due', headerName: 'Due Next', width: 90 },
    ]

    const rows = teamActivity

    const handleEvent = (params) => {
        router.push(`/boards/${boardId}/check-ins/${params.id}`)
    };

    return (
            <Box sx={{ display: 'flex' }}>
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

                        <Grid container spacing={5} sx={{ width: '100%' }}>
                            <Grid container >
                            <Link href={`/boards/${boardId}/reports/${getLastWeek(selectedReportDate)}`}>{"< "}Previous Week</Link>
                            <Typography>
                                Team Check-ins for week ending {reportWeekEndDate}
                            </Typography>
                            <Link href={`/boards/${boardId}/reports/${getNextWeek(selectedReportDate)}`}>Next Week{" >"}</Link>
                            </Grid>
                        </Grid>

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