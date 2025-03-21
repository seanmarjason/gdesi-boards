import { useState, useEffect } from "react";

import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import CheckInTaskCard from "../components/CheckInTaskCard";


export default function CheckInForm() {

    const [submitDate, setSubmitDate] = useState(dayjs())
    const [rating, setRating] = useState(0)
    const [thisWeekTasks, setThisWeekTasks] = useState([])
    const [comments, setComments] = useState('')

    useEffect(() => {
        async function fetchThisWeekTasks() {
          const res = await fetch('/api/activity?this-week')
          const data = await res.json()
          setThisWeekTasks(data)
        }
        fetchThisWeekTasks()
      }, [])

    const submitCheckIn = () => {
        console.log("Submit")
    }

    return (
        <Box
            component="main"
            sx={(theme) => ({
                flexGrow: 1,
            })}
        >
        <Typography variant="h2" gutterBottom>
            Complete your check in
        </Typography>

            <form>

                <InputLabel id="checkin-date-label">Submit Date</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                    <DatePicker 
                        id="checkin-date"
                        value={submitDate}
                        disablePast
                        disabled
                        onAccept={(value) => setSubmitDate(value)}
                        />
                </LocalizationProvider>

                <InputLabel id="checkin-rating-label">Rating</InputLabel>
                <Rating
                    name="checkin-rating"
                    value={rating}
                    onChange={(event) => {
                        setRating(event.target.value);
                    }}
                />

                <Typography variant="h3">
                    This Week
                </Typography>

                <InputLabel id="checkin-tasksCompleted-label">Tasks Completed</InputLabel>
                <Stack direction="row" spacing={2}>
                {                    
                    thisWeekTasks && thisWeekTasks.tasksCompleted?.length > 0
                        ? thisWeekTasks.tasksCompleted?.map((task, index) => {
                            return (
                                <CheckInTaskCard task={task} index={index} key={index}/>
                            )
                        })
                        : <p>nil</p>
                    }
                </Stack>

                <InputLabel id="checkin-tasksStarted-label">Tasks Started</InputLabel>
                <Stack direction="row" spacing={2}>
                {                    
                    thisWeekTasks && thisWeekTasks.tasksStarted?.length > 0
                        ? thisWeekTasks.tasksStarted?.map((task, index) => {
                            return (
                                <CheckInTaskCard task={task} index={index} key={index}/>
                            )
                        })
                        : <p>nil</p>
                }
                </Stack>

                <Typography variant="h3">
                    Next Week
                </Typography>

                <InputLabel id="checkin-tasksDue-label">Tasks Due</InputLabel>
                <Stack direction="row" spacing={2}>
                {                    
                    thisWeekTasks && thisWeekTasks.tasksDueNext?.length > 0
                        ? thisWeekTasks.tasksDueNext?.map((task, index) => {
                            return (
                                <CheckInTaskCard task={task} index={index} key={index}/>
                            )
                        })
                        : <p>nil</p>
                }
                </Stack>


                <InputLabel id="checkin-comments-label">Comments</InputLabel>
                <TextField
                    fullWidth
                    multiline
                    // minRows={4} //TODO: Fix styling causing multiline to not expand
                    id="checkin-comments"
                    value={comments}
                    onChange={(event) => {
                        setComments(event.target.value)
                    }}
                />

                <Button variant="contained" color="secondary" onClick={() => { submitCheckIn()} }>
                Submit Check-in
                </Button>
            
            </form>

        </Box>


    )

}