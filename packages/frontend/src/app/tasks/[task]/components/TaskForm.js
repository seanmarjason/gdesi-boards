import { useState } from "react";

import TextField from '@mui/material/TextField';

export const TaskForm = ({ task }) => {

    // const { title, setTitle } = useState(task.title)

    return (
        <div>
            <p>{task.id}</p>
            {/* <TextField
                id="outlined-controlled"
                label="Controlled"
                value={title}
                onChange={(event) => {
                    setTitle(event.target.value);
                }
            }
            /> */}
            <p>{task.title}</p>
            <p>{task.type}</p>
            <p>{task.assignee}</p>
            <p>{task.description}</p>
            <p>{JSON.stringify(task.links)}</p>
            <p>{JSON.stringify(task.comments)}</p>
            <p>{task.status}</p>
            <p>{task.deadline}</p>
            <p>{task.estimate}</p>
        </div>
    )
}