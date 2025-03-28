'use client'

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Header from '../../../../components/Header';
import { TaskForm } from '../../../../components/TaskForm';

export default function Task({ task, boardId, userName }) {
    const router = useRouter()    

    const [taskData, setTaskData] = useState()
    const [users, setUsers] = useState([])

    console.log(userName)

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/boards/${boardId}/tasks?task-id=${task}`)
            const data = await res.json()
            setTaskData(data)
        }

        async function fetchUsers() {
            const res = await fetch(`/api/boards/${boardId}/users`)
            const data = await res.json()
            setUsers(data)
        }

        if (task) {
            fetchData()
        }
        fetchUsers()
    }, [])

    const saveTask = async (taskData) => {
        async function saveData() {
          const res = await fetch(`/api/boards/${boardId}/tasks`, {
            method: 'POST',
            body: JSON.stringify({
                type: 'new',
                data: taskData
            })
          })
        }
        saveData()
        router.push(`/boards/${boardId}`)
    }

    const checkComment = async (message) => {
        async function check() {
          const res = await fetch(`/api/boards/openai`, {
            method: 'POST',
            body: JSON.stringify({
                message
            })
          })
          const response = await res.json()
          return response;
        }
        const commentResponse = await check()
        return commentResponse;
    }

    if (task && (!taskData || Object.keys(taskData).length == 0)) {
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
                sx={{
                alignItems: 'center',
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 },
                height: '100%'
                }}
            >
                {/* Main content */}
                <Header navigation={['Tasks', `${taskData ? taskData.id : 'New'}`]}/>

                <TaskForm task={ taskData } boardId={ boardId } users={ users } currentUser={ userName } saveTask={ saveTask } checkComment={ checkComment }/>

            </Stack>
        </Box>
    )
}