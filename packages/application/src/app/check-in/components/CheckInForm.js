import { useState, useEffect } from "react";

import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Rating from '@mui/material/Rating';
import CheckInTaskCard from "./CheckInTaskCard";


export default function CheckInForm() {

    const [submitDate, setSubmitDate] = useState(dayjs())
    const [rating, setRating] = useState(0)
    const [thisWeekTasks, setThisWeekTasks] = useState([])

    useEffect(() => {
        async function fetchThisWeekTasks() {
          const res = await fetch('/api/activity?this-week')
          const data = await res.json()
          setThisWeekTasks(data)
        }
        fetchThisWeekTasks()
      }, [])

    return (
        <div>
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
                {                    
                    thisWeekTasks 
                        ? thisWeekTasks.tasksCompleted?.map((task, index) => {
                            return (
                                <CheckInTaskCard task={task} index={index} key={index}/>
                            )
                        })
                        : <p>nil</p>
                }

                <InputLabel id="checkin-tasksStarted-label">Tasks Started</InputLabel>
                {                    
                    thisWeekTasks 
                        ? thisWeekTasks.tasksStarted?.map((task, index) => {
                            return (
                                <CheckInTaskCard task={task} index={index} key={index}/>
                            )
                        })
                        : <p>nil</p>
                }

                <InputLabel id="checkin-tasksIntroduced-label">Tasks Introduced</InputLabel>
                {                    
                    thisWeekTasks 
                        ? thisWeekTasks.tasksIntroduced?.map((task, index) => {
                            return (
                                <CheckInTaskCard task={task} index={index} key={index}/>
                            )
                        })
                        : <p>nil</p>
                }

                <InputLabel id="checkin-tasksNotProgressed-label">Tasks Not Progressed</InputLabel>
                {                    
                    thisWeekTasks 
                        ? thisWeekTasks.tasksNotProgressed?.map((task, index) => {
                            return (
                                <CheckInTaskCard task={task} index={index} key={index}/>
                            )
                        })
                        : <p>nil</p>
                }
            
            </form>

        </div>


    )

}