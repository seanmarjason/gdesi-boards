'use client'

import * as React from 'react';
import NextLink from 'next/link';

import Avatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Select, { selectClasses } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';


const ListItemAvatar = MuiListItemAvatar

export default function SelectContent({ boardId=null}) {
  const [company, setCompany] = React.useState('');

  const handleChange = (event) => {
    setCompany(event.target.value);
  };

  return (
    <Select
      labelId="company-select"
      id="company-simple-select"
      value={company}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Select company' }}
      fullWidth
      sx={{
        maxHeight: 56,
        width: 215,
        '&.MuiList-root': {
          p: '8px',
        },
        [`& .${selectClasses.select}`]: {
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          pl: 1,
        },
      }}
    >
      <MenuItem value="">
        <ListItemAvatar>
          <Avatar alt={boardId}>
            <DevicesRoundedIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={boardId} />
      </MenuItem>
      <Divider sx={{ mx: -1 }} />

      { boardId && 
        <MenuItem value={40} component={NextLink} href={`/boards/${boardId}/settings`}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Board Settings" />
        </MenuItem>
      }

      <MenuItem value={40} component={NextLink} href="/boards">
        <ListItemIcon>
          <FilterNoneIcon />
        </ListItemIcon>
        <ListItemText primary="Switch Boards" />
      </MenuItem>

      <MenuItem value={40} component={NextLink} href="/boards/new">
        <ListItemIcon>
          <AddRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Add a board" />
      </MenuItem>
    </Select>
  );
}
