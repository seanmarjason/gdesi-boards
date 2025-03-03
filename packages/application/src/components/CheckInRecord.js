import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import CheckInTaskCard from "./CheckInTaskCard";


export default function CheckInRecord({ checkIn }) {
    return (
        <div>

            <Typography variant="h2" gutterBottom>
                Check in from {checkIn.date}
            </Typography>

            <Typography variant="body1"> Rating:</Typography>
            <Rating
                name="checkin-rating"
                value={checkIn.rating}
                readOnly
            />

            <Typography variant="h3"> This Week</Typography>

            <Typography variant="body1"> Tasks Completed</Typography>
            <Stack direction="row" spacing={2}>
            {                    
                checkIn && checkIn.tasksCompleted?.length > 0
                    ? checkIn.tasksCompleted?.map((task, index) => {
                        return (
                            <CheckInTaskCard task={task} index={index} key={index}/>
                        )
                    })
                    : <p>nil</p>
                }
            </Stack>

            <Typography variant="body1"> Tasks Started</Typography>
            <Stack direction="row" spacing={2}>
            {                    
                checkIn && checkIn.tasksStarted?.length > 0
                    ? checkIn.tasksStarted?.map((task, index) => {
                        return (
                            <CheckInTaskCard task={task} index={index} key={index}/>
                        )
                    })
                    : <p>nil</p>
            }
            </Stack>

            <Typography variant="body1">Tasks Introduced</Typography>
            <Stack direction="row" spacing={2}>
            {                    
                checkIn && checkIn.tasksIntroduced?.length > 0
                    ? checkIn.tasksIntroduced?.map((task, index) => {
                        return (
                            <CheckInTaskCard task={task} index={index} key={index}/>
                        )
                    })
                    : <p>nil</p>
            }
            </Stack>

            <Typography variant="body1">Tasks Not Progressed</Typography>
            <Stack direction="row" spacing={2}>
            {                    
                checkIn && checkIn.tasksNotProgressed?.length > 0
                    ? checkIn.tasksNotProgressed?.map((task, index) => {
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

            <Typography variant="body1">Tasks Due</Typography>
            <Stack direction="row" spacing={2}>
            {                    
                checkIn && checkIn.tasksDueNext?.length > 0
                    ? checkIn.tasksDueNext?.map((task, index) => {
                        return (
                            <CheckInTaskCard task={task} index={index} key={index}/>
                        )
                    })
                    : <p>nil</p>
            }
            </Stack>

            <Typography variant="body1">Comments</Typography>
            {/* <TextField
                fullWidth
                multiline
                // minRows={4} //TODO: Fix styling causing multiline to not expand
                id="checkin-comments"
                value={comments}
                onChange={(event) => {
                    setComments(event.target.value)
                }}
            /> */}


        </div>
    )
}
