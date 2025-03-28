'use client'

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

import { useSession } from "next-auth/react"

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Header from '../../../components/Header';

import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import NextLink from 'next/link';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function NewBoard() {
  const router = useRouter()
  const { data: session, status, update: updateSession } = useSession()

  const [name, setName]  = useState('')
  const [manager, setManager] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers]  = useState([])

  console.log("selectedUsers", selectedUsers)

  useEffect(() => {
    async function fetchData() {
        const res = await fetch(`/api/boards/new/users`)
        const data = await res.json()
        setUsers(data)
    }
    fetchData()
  }, [])

  const handleManagerChange = (event) => {
    setManager(event.target.value);
  };

  const handleUserChange = (event) => {
    setSelectedUsers(event.target.value);
  };

  const createBoard = async () => {
    async function saveData() {
      const res = await fetch('/api/boards', {
        method: 'POST',
        body: JSON.stringify({
          name,
          manager,
          users: selectedUsers.map(user => user.id)
        })
      })
      const newBoardId = await res.json()
      return newBoardId;
    }
    const boardId = await saveData()
    await updateSession({ boards: [...session.user.boards, boardId] })
    router.push(`/boards`)
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
                <Header navigation={['Boards']}/>

                <form>

                <Typography variant="h1" gutterBottom>
                  Create New Board
                </Typography>     

                <br />

                <InputLabel id="board-name-label">Name</InputLabel>
                <TextField
                    id="board-name"
                    value={name}
                    fullWidth
                    onChange={(event) => {
                        setName(event.target.value)
                    }}
                />

                <InputLabel id="manager-label">Manager</InputLabel>
                <Select
                  id="manager"
                  fullWidth
                  value={manager}
                  onChange={(event) => handleManagerChange(event)}
                >
                  {users.length > 0 && users.map((user) => (
                    <MenuItem
                      key={user.name}
                      value={user.id}
                    >
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>

                <InputLabel id="users-label">Users</InputLabel>
                <Select
                  id="users"
                  multiple
                  fullWidth
                  value={selectedUsers}
                  onChange={(event) => handleUserChange(event)}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value, index) => (
                        <Chip key={`${index}-${value.id}`} label={value.name} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {users.length > 0 && users.map((user) => (
                    <MenuItem
                      key={user.name}
                      value={{name: user.name, id: user.id}}
                    >
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>

                <Button component={NextLink} href="/boards" variant="contained" color="error">Cancel</Button>
                <Button onClick={() => createBoard()} variant="contained" color="secondary">Create</Button>

              </form>

            </Stack>
        </Box>
    )
}