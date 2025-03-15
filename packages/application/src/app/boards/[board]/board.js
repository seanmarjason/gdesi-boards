'use client'

import { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Header from '../../../components/Header';
import MainGrid from '../../../components/MainGrid';

export default function Board({ boardId }) {

    const [board, setBoard] = useState()

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/boards/${boardId}`)
            const data = await res.json()
            setBoard(data)
        }
        fetchData()
    }, [])

    if (!board || Object.keys(board).length == 0) {
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

            <MainGrid data={board.columns}/>

        </Stack>
        </Box>
    )
}