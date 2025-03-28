import { useState, useEffect } from "react";

import { useRouter } from 'next/navigation'

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


export default function CheckInForm({ boardId }) {
    const router = useRouter()    

    const [submitDate, setSubmitDate] = useState(dayjs())
    const [rating, setRating] = useState(0)
    const [thisWeekTasks, setThisWeekTasks] = useState([])
    const [comments, setComments] = useState('')

    useEffect(() => {
        async function fetchThisWeekTasks(date) {
          const res = await fetch(`/api/boards/${boardId}/tasks?date=${date}`)
          const data = await res.json()
          setThisWeekTasks(data)
        }
        const d = new Date(); // TODO: Update to fetch this week
        fetchThisWeekTasks(d.toISOString())
      }, [])

    const submitCheckIn = () => {
        async function saveData() {
            const res = await fetch(`/api/boards/${boardId}/check-ins`, {
              method: 'POST',
              body: JSON.stringify({
                data: {
                    submitDate,
                    rating,
                    tasks: {
                        tasksCompleted: thisWeekTasks.tasksCompleted.map(task => task.id),
                        tasksStarted: thisWeekTasks.tasksStarted.map(task => task.id),
                        tasksDueNext: thisWeekTasks.tasksDueNext.map(task => task.id)
                    },
                    comments    
                }
              })
            })
          }
          saveData()
        router.push(`/boards/${boardId}/check-ins`)
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

                <Button variant="contained" color="secondary" onClick={() => { submitCheckIn() } }>
                Submit Check-in
                </Button>
            </form>

        </Box>


    )

}