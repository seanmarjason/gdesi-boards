import * as React from 'react';

import { auth } from '../../auth';

import SideMenu from '../../../components/SideMenu';

import Unauthorised from '../unauthorised';

import Grid from '@mui/material/Grid2';

export default async function BoardsLayout({children, params}) {
  const session = await auth();
  const { board } = await params

  if (!session?.user?.boards.includes(parseInt(board))) {
    return (
      <Unauthorised />
    )
  }

  const role = session?.user?.manager.includes(parseInt(board)) ? 'manager' : 'user'

  return (
      <Grid container >
        <Grid size={2}>
          <SideMenu user={{...session?.user, role}} boardId={board} showMenuContent={board}/>
        </Grid>
        <Grid size={8}>
          {children}
        </Grid>
      </Grid>
  );
}
