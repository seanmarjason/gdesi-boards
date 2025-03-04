import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

import { signOut } from 'next-auth/react';

import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';

import Search from './Search';

export default function Header({ navigation }) {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs nav={navigation}/>
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <Button onClick={() => signOut()} variant="contained" color="primary">
            Sign out
        </Button>
      </Stack>
    </Stack>
  );
}
