'use client'

import { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';

import Header from '../../components/Header';

export default function Boards() {

    const [boards, setBoards] = useState()

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/boards')
            const data = await res.json()
            setBoards(data)
        }
        fetchData()
    }, [])

    if (!boards || Object.keys(boards).length == 0) {
        return (
            <Typography element="h1" variant="h6">
                Loading...
            </Typography>
        )
    }

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
            <Header />

            <Typography element="h2" variant="h6">List Boards to Select</Typography>

            { boards.map((board, index) => 
                <Card sx={{ minWidth: 275 }} key={index}>
                <CardContent>
                    <Typography gutterBottom sx={{ fontSize: 14 }}>
                        <Link href={`/boards/${board.id}`} underline="none">
                            {board.id}
                        </Link>
                    </Typography>
                    <Typography variant="h5" component="div">
                    {board.name}
                    </Typography>
                </CardContent>
                </Card>
            )}

            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        <Link href={`/boards/new`} underline="none">
                            + Add New Board
                        </Link>
                    </Typography>
                </CardContent>
                </Card>

        </Stack>
        </Box>
    )
}