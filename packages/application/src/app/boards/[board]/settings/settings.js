'use client'

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Header from '../../../../components/Header';

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

export default function BoardSettings({ boardId }) {
  const router = useRouter()

  const [board, setBoard] = useState()

  const [users, setUsers] = useState([])


  useEffect(() => {
      async function fetchData() {
            const boardResponse = await fetch(`/api/boards/${boardId}`)
            const boardData = await boardResponse.json()
            setBoard(boardData)

            const usersResponse = await fetch(`/api/boards/new/users`)
            const usersData = await usersResponse.json()
            setUsers(usersData)

        }
        fetchData()
    }, [])


    const handleBoardDataChange = (event) => {
        const { name, value } = event.target
        setBoard({
            ...board,
            [name]: value,
        })
    }

    const handleUserChange = (event) => {
        const { value } = event.target
        setBoard({
            ...board,
            users: value.map(user => user.id),
        })
    }

  const updateBoard = async () => {
    async function saveData() {
      const res = await fetch(`/api/boards/${boardId}`, {
        method: 'POST',
        body: JSON.stringify(board)
      })
      const newBoardId = await res.json()
      return newBoardId;
    }
    await saveData()
    router.push(`/boards`)
  }

  if (board) {

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
                <Header />

                <form>

                <Typography variant="h1" gutterBottom>
                  Settings
                </Typography>     

                <br />

                <InputLabel id="board-name-label">Name</InputLabel>
                <TextField
                    id="board-name"
                    name="name"
                    value={board.name}
                    fullWidth
                    onChange={(event) => {
                        handleBoardDataChange(event)
                    }}
                />

                <InputLabel id="manager-label">Manager</InputLabel>
                <Select
                  id="manager"
                  fullWidth
                  name="manager"
                  value={board.manager}
                  onChange={(event) => handleBoardDataChange(event)}
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
                  name="users"
                  value={users.filter(user => board.users.includes(user.id))}
                  onChange={handleUserChange}
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
                <Button onClick={() => updateBoard()} variant="contained" color="secondary">Save</Button>

              </form>

            </Stack>
        </Box>
    )
  }
}