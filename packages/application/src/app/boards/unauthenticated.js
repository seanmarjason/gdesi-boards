'use client'

import { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AppAppBar from "../../components/menu/AppAppBar";

export default function Unauthenticated(props) {

    return (
        <>
        <AppAppBar />
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
                justifyContent: 'center',
                mx: 3,
                pb: 5,
                mt: 10,
                height: '100%'
                }}
            >
            <Typography element="h1" variant="h6">
                Sign in or Register an account to access this resource
            </Typography>

            </Stack>
            </Box>
        </Box>
        </>
    )
}