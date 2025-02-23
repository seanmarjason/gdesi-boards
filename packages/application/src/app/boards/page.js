import * as React from 'react';
import Boards from './boards';

import { board } from '../../data/boards';

export default async function Dashboard(props) {
  // const data = await fetch('/api/boards')
  // const board = data.json()

  // console.log("Board:", board)

  return (
    <Boards board={ board } />
  );
}
