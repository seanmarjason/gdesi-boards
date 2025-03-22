'use client'

import { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Unauthorised(props) {

    return (
        <>
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
                Not authorised to access this page
            </Typography>

            </Stack>
            </Box>
        </Box>
        </>
    )
}