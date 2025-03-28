import { useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';

import NextLink from 'next/link';

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
import CardContent from '@mui/material/CardContent';

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { taskTypeMenuItems } from '../data/tasks';

export const TaskForm = ({ task, boardId, users, currentUser, saveTask, checkComment }) => {

    const emptyLink = {name: '', type: '', url: ''}
    const emptyComment = {author: '', dateCreated: '', comment: ''}

    const [deadline, setDeadline] = useState(task?.deadline ? dayjs(task?.deadline) : dayjs().add(7, 'day'));

    const [title, setTitle]  = useState(task?.title ?? '')
    const [type, setType]  = useState(task?.type ?? '')
    const [assignee, setAssignee]  = useState(task?.assignee ?? '')
    const [description, setDescription]  = useState(task?.description ?? '')
    const [links, setLinks]  = useState(task?.links ?? [])
    const [comments, setComments]  = useState(task?.comments ?? [])

    const [showLinkModal, setShowLinkModal] = useState(false)
    const [linkModalDetails, setLinkModalDetails] = useState(emptyLink)
    const [editLink, setEditLink] = useState(false)

    const [newComment, setNewComment] = useState(emptyComment)
    const [showCommentLoading, setShowCommentLoading] = useState(false)

    const statusColours = {
        'To Do': '',
        'Doing': 'primary',
        'Done': 'success',
    }

    const saveLinkDetails = (newLink) => {
        let nextLinks;

        // check if newLink id in links
        if (links.some(link => link.id == newLink.id)) {
            // if yes, update links
            nextLinks = links.map(link => link.id == newLink.id ? newLink : link)
        }
        else {
            // if no, add newLink to links
            nextLinks = [
                ...links,
                newLink
            ]
        }

        setLinks(nextLinks)
        setEditLink(false)
        setLinkModalDetails(emptyLink)
    }

    const saveComment = async (comment) => {
        const date = new Date(Date.now()).toISOString()

        setComments([
            ...comments,
            {
                ...comment,
                author: currentUser,
                dateCreated: date,
            },
        ])

        setNewComment(emptyComment)

        setShowCommentLoading(true)
        const commentEvaluation = await checkComment(comment.comment)

        setComments([
            ...comments,
            {
                ...comment,
                author: currentUser,
                dateCreated: date,
            },
            {
                author: 'BOT', 
                dateCreated: date, 
                comment: commentEvaluation
            }
        ])
        setShowCommentLoading(false)
    }

    return (
        <div>
            <Typography variant="h1" gutterBottom>
                {task?.id ?? 'New Task'}
            </Typography>

            <form>

                <Chip label={task?.status ?? 'To Do'} color={statusColours[task?.status]} variant="outlined" />
                
                <br />

                <InputLabel id="task-deadline-label">Deadline</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                    <DatePicker 
                        value={deadline}
                        disablePast
                        onAccept={(value) => setDeadline(value)}
                    />
                </LocalizationProvider>

                <InputLabel id="task-title-label">Title</InputLabel>
                <TextField
                    id="task-title"
                    value={title}
                    fullWidth
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
                    {users.map((user, index) => 
                        <MenuItem value={user.id} key={`select-assignee-${index}`}>{user.name}</MenuItem>
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

                <Chip
                    key={`link-new`}
                    label={'New'}
                    avatar={<Avatar>+</Avatar>}
                    onClick={() => {
                        setShowLinkModal(true)
                        setEditLink(true)
                        setLinkModalDetails(emptyLink)
                    }}
                />

                {   showLinkModal &&

                        <Dialog
                            open={showLinkModal}
                            onClose={() => setShowLinkModal(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >

                        {
                            editLink ?
                             <div>                            
                                <DialogTitle id="alert-dialog-title">New</DialogTitle>
                                    <InputLabel id="link-title-label">Name</InputLabel>
                                    <TextField
                                        id="link-name"
                                        value={linkModalDetails.name}
                                        onChange={(event) => {
                                            setLinkModalDetails({
                                                ...linkModalDetails,
                                                name: event.target.value,
                                            })
                                        }}
                                    />
                                    <InputLabel id="link-type-label">Type</InputLabel>
                                    <TextField
                                        id="link-type"
                                        value={linkModalDetails.type}
                                        onChange={(event) => {
                                            setLinkModalDetails({
                                                ...linkModalDetails,
                                                type: event.target.value,
                                            })
                                        }}
                                    />
                                    <InputLabel id="link-type-label">Url</InputLabel>
                                    <TextField
                                        id="link-url"
                                        value={linkModalDetails.url}
                                        onChange={(event) => {
                                            setLinkModalDetails({
                                                ...linkModalDetails,
                                                url: event.target.value,
                                            })
                                        }}
                                    />
                                    <DialogActions>
                                        <Button 
                                            onClick={() => {
                                                setShowLinkModal(false) 
                                                saveLinkDetails({
                                                    ...linkModalDetails,
                                                    id: linkModalDetails.id || `${task.id}_link-${links.length + 1}`
                                                }
                                            )}
                                            }
                                            autoFocus
                                        >
                                        Save
                                        </Button>
                                    </DialogActions>
                            </div>
                            :
                            <div>                            
                                <DialogTitle id="alert-dialog-title">{linkModalDetails.name}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        {linkModalDetails.type}
                                        <br />
                                        <Link href={linkModalDetails.url} target="_blank">
                                            {linkModalDetails.url}
                                        </Link>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setEditLink(true)}>Edit</Button>
                                    <Button onClick={() => setShowLinkModal(false)} autoFocus>Ok</Button>
                                </DialogActions>
                            </div>
                        }
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
                                    Created: {comment.dateCreated}
                                </Typography>
                                <Typography variant="body2">
                                    {comment.comment}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                    : <p>nil</p>
                }

                { showCommentLoading && 
                    <Card
                        sx={{ minWidth: 275 }}
                        key={`comment-loading`}
                    >
                        <CardContent>
                            <Typography variant="body2">
                                Loading ...
                            </Typography>
                        </CardContent>
                    </Card>
                }

                <InputLabel id="new-comment-label">Add New Comment</InputLabel>
                    <TextField
                        id="new-comment"
                        value={newComment.comment}
                        onChange={(event) => {
                            setNewComment({
                                ...newComment,
                                comment: event.target.value,
                            })
                        }}
                    />
                    <Button onClick={() => saveComment(newComment)}>Add</Button>

            <br />
            <br />


            <Button component={NextLink} href={`/boards/${boardId}`} variant="contained" color="error">Cancel</Button>
            <Button 
                variant="contained" 
                color="secondary"
                onClick={() => saveTask({
                    deadline,
                    title,
                    type,
                    assignee,
                    description,
                    links,
                    comments,
                })} 
            >
                Save
            </Button>

            </form>

        </div>
    )
}