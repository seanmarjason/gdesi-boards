'use client'

import { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import Header from '../../../../components/Header';
import CheckInRecord from "../../../../components/CheckInRecord";
import CheckInForm from "../../../../components/CheckInForm";


export default function CheckIn({ pastCheckInId='', boardId=null }) {

    const [checkIns, setCheckIns] = useState([])
    const [selectedCheckIn, setSelectedCheckIn] = useState('')

    useEffect(() => {
        async function fetchData() {
            const checkInsResponse = await fetch('/api/check-ins')
            const checkInsData = await checkInsResponse.json()
            setCheckIns(checkInsData)
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            if (pastCheckInId) {
                const params = new URLSearchParams();
                params.append("id", pastCheckInId);
                const selectedCheckInResponse = await fetch(`/api/check-ins?${params}`)
                const selectedCheckInData = await selectedCheckInResponse.json()
                
                setSelectedCheckIn(selectedCheckInData)
            }
        }
        fetchData()
    }, [])

    if (!checkIns || Object.keys(checkIns).length == 0) {
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
                sx={
                 {
                    mx: 3,
                    pb: 5,
                    mt: { xs: 8, md: 0 },
                    height: '100%'
                }
                }
            >
                <Header navigation={['Check-Ins']}/>

                <Grid container spacing={1}>

                    {/* FORM ELEMENT */}
                    <Grid size={8}>
                        { 
                            selectedCheckIn
                            ? <CheckInRecord checkIn={ selectedCheckIn }/>
                            : <CheckInForm />
                        }
                    </Grid>


                    {/* LIST ELEMENT */}
                    <Grid size={4}>
                            <List component="nav" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {
                                <ListItem>
                                    <ListItemButton
                                        selected={!selectedCheckIn}
                                        onClick={(event) => console.log(`Click`)}
                                    >
                                        <ListItemText primary={"New"} secondary={"Rating:"} />
                                    </ListItemButton>
                                </ListItem>
                            }
                            {
                                checkIns.data.map((checkIn, index) => {
                                    return (
                                        <ListItem key={index}>
                                            <ListItemButton
                                                selected={selectedCheckIn && checkIn.id == selectedCheckIn.id}
                                                onClick={(event) => console.log(`Click`)}
                                            >
                                                <Link href={`/boards/${boardId}/check-ins/${checkIn.id}`} >
                                                    <ListItemText primary={checkIn.date} secondary={`Rating: ${checkIn.rating}`} />
                                                </Link>
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })
                            }
                            </List>
                    </Grid>

                </Grid>

            </Stack>
            </Box>
    )
}