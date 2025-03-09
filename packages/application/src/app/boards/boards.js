'use client'

import { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';

import AppNavbar from '../../components/AppNavbar';
import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';

export default function Boards({ user }) {

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
        <Box sx={{ display: 'flex' }}>
            <SideMenu user={user} boardName={''} showMenuContent={false}/>
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

            </Stack>
            </Box>
        </Box>
    )
}