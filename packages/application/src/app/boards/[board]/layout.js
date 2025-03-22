import * as React from 'react';

import { auth } from '../../auth';

import SideMenu from '../../../components/SideMenu';
import AppNavbar from '../../../components/AppNavbar';

import Grid from '@mui/material/Grid2';

export default async function BoardsLayout({children, params}) {
  const session = await auth();
  const { board } = await params

  return (
      <Grid container >
        <Grid size={2}>
          <SideMenu user={session?.user} boardId={board} showMenuContent={board}/>
          <AppNavbar />
        </Grid>
        <Grid size={8}>
          {children}
        </Grid>
      </Grid>
  );
}
