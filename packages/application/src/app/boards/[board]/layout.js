import * as React from 'react';

import { auth } from '../../auth';

import Box from '@mui/material/Box';
import SideMenu from '../../../components/SideMenu';
import AppNavbar from '../../../components/AppNavbar';

import Unauthenticated from '../unauthenticated';

export default async function BoardsLayout({children, params}) {
  const session = await auth();

  const { board } = await params

  if (!session) {
    return <Unauthenticated />
  }
  
  return (
      <Box sx={{ display: 'flex' }}>
        <SideMenu user={session.user} boardId={board} showMenuContent={board}/>
        <AppNavbar />
          {children}
      </Box>
  );
}
