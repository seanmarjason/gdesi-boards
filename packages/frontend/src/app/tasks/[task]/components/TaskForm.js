import { useState } from "react";

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { taskTypeMenuItems } from '../../../../data/tasks';
import { taskAssigneeMenuItems } from '../../../../data/tasks';

export const TaskForm = ({ task }) => {

    const [title, setTitle]  = useState(task.title)
    const [type, setType]  = useState(task.type)
    const [assignee, setAssignee]  = useState(task.assignee)
    const [description, setDescription]  = useState(task.description)
    const [links, setLinks]  = useState(task.links)
    const [comments, setComments]  = useState(task.comments)

    const [showLinkModal, setShowLinkModal] = useState(false)
    const [linkModalDetails, setLinkModalDetails] = useState('')

    return (
        <div>
            <Typography variant="h1" gutterBottom>
                {task.id}
            </Typography>

            <form>

            <p>{task.status}</p>
            <p>{task.deadline}</p>
            <p>{task.estimate}</p>

                <InputLabel id="task-title-label">Title</InputLabel>
                <TextField
                    id="task-title"
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value)
                    }}
                />

                <InputLabel id="select-type-label">Type</InputLabel>
                <Select
                    labelId="select-type-label"
                    id="select-type"
                    value={type}
                    label="Type"
                    onChange={(event) => {
                        setType(event.target.value)
                    }}
                >
                    {taskTypeMenuItems.map((item, index) => 
                        <MenuItem value={item} key={`select-type-${index}`}>{item}</MenuItem>
                    )}
                </Select>

                <InputLabel id="select-assignee-label">Assignee</InputLabel>
                <Select
                    labelId="select-assignee-label"
                    id="select-assignee"
                    value={assignee}
                    label="Assignee"
                    onChange={(event) => {
                        setAssignee(event.target.value)
                    }}
                >
                    {taskAssigneeMenuItems.map((item, index) => 
                        <MenuItem value={item} key={`select-assignee-${index}`}>{item}</MenuItem>
                    )}
                </Select>

                <InputLabel id="task-description-label">Description</InputLabel>
                <TextField
                    fullWidth
                    multiline
                    // minRows={4} //TODO: Fix styling causing multiline to not expand
                    id="task-description"
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value)
                    }}
                />
                
                <InputLabel id="task-links-label">Links</InputLabel>
                { links.length > 0 ?
                    (links.map((link, index) => 
                        <Chip
                            key={`link-${index}`}
                            label={link.name}
                            avatar={<Avatar>{(Array.from(link.name)[0])?.toUpperCase()}</Avatar>}
                            onClick={() => {
                                setShowLinkModal(true)
                                setLinkModalDetails(link)
                            }}
                        />
                    ))
                    : <p>nil</p>
                }

                {   showLinkModal &&
                        <Dialog
                            open={showLinkModal}
                            onClose={() => setShowLinkModal(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <DialogTitle id="alert-dialog-title">{linkModalDetails.name}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <Link href={linkModalDetails.url} target="_blank">
                                        {linkModalDetails.url}
                                    </Link>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setShowLinkModal(false)} autoFocus>Ok</Button>
                            </DialogActions>
                        </Dialog>
                }
                
                <InputLabel id="task-comments-label">Comments</InputLabel>
                { comments.length > 0 ?
                    (comments.map((comment, index) => 
                        <Card
                            sx={{ minWidth: 275 }}
                            key={`comment-${index}`}
                        >
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }}>
                                    {comment.author}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                    Created: {comment.dateCreated} Modified: {comment.dateModified}
                                </Typography>
                                <Typography variant="body2">
                                    {comment.comment}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                    : <p>nil</p>
                }

            </form>

        </div>
    )
}