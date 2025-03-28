'use client'

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';


import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SummarizeIcon from '@mui/icons-material/Summarize';

export default function MenuContent({ role=null, boardId=null }) {

  const mainListItems = [
    { text: 'Board', link: `/boards/${boardId}`, icon: <DashboardIcon />, roles: ['user', 'manager', 'admin'] },
    { text: 'Tasks', link: `/boards/${boardId}/tasks`, icon: <TaskIcon />, roles: ['user', 'manager', 'admin'] },
    { text: 'Check Ins', link: `/boards/${boardId}/check-ins`, icon: <ChecklistIcon />, roles: ['user', 'manager', 'admin'] },
    { text: 'Reports', link: `/boards/${boardId}/reports`, icon: <SummarizeIcon />, roles: ['manager', 'admin'] },
  ];

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems
          .filter(item => item.roles.includes(role))
          .map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <Link href={item.link}>
                <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            </ListItem>
        ))}
      </List>
    </Stack>
  );
}
