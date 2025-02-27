import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SummarizeIcon from '@mui/icons-material/Summarize';


const mainListItems = [
  { text: 'Boards', link: '/boards', icon: <DashboardIcon /> },
  { text: 'Tasks', link: '/tasks', icon: <TaskIcon /> },
  { text: 'Check Ins', link: '/check-ins', icon: <ChecklistIcon /> },
  { text: 'Reports', link: '/reports', icon: <SummarizeIcon /> },
];

// const secondaryListItems = [
//   { text: 'Settings', icon: <SettingsRoundedIcon /> },
//   { text: 'About', icon: <InfoRoundedIcon /> },
//   { text: 'Feedback', icon: <HelpRoundedIcon /> },
// ];


// TODO: Fix React Hydration error caused by Box
export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
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
      {/* <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Stack>
  );
}
