import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

import { Column } from './Column';

const columns = [
  {
    id: 1,
    title: 'To Do',
    cards: [
      {
        id: 'ABC-123',
        title: 'Roadmap for project delivery',
        type: 'Document',
        assignee: ''
      },
      {
        id: 'ABC-456',
        title: 'Project Resourcing',
        type: 'Document',
        assignee: ''
      }
    ]
  },
  {
    id: 2,
    title: 'Doing',
    cards: [
      {
        id: 'XYZ-456',
        title: 'Project Strategy',
        type: 'Document',
        assignee: 'Bob Dylan'
      }
    ]
  },
  {
    id: 3,
    title: 'Done',
    cards: []
  },
]

export default function MainGrid() {
  console.log("Columns:", columns)
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* columns */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Your Team's Work
      </Typography>

      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
          {columns.map((column, index) =>
            <Column
              key={index}
              column={column}
            />
          )}

      </Grid>


    </Box>
  );
}
