import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

import { DragDropContext } from '@hello-pangea/dnd';

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

  const handleOnDragEnd = (event) => {
    // const coordinates = getCoordinates<TCard>(event, board)
    // if (!coordinates.source) return

    // isAColumnMove(event.type)
    //   ? isMovingAColumnToAnotherPosition(coordinates) &&
    //     onColumnDragEnd({ ...coordinates, subject: board.columns[coordinates.source.fromPosition] })
    //   : isMovingACardToAnotherPosition(coordinates) &&
    //     onCardDragEnd({ ...coordinates, subject: getCard<TCard>(board, coordinates.source) })
  }

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: { sm: '100%', md: '1700px' },
      height: '100%',
      }}
    >
      {/* columns */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Your Team's Work
      </Typography>

      <DragDropContext
        onDragEnd={handleOnDragEnd}
      >

        <Container
          fixed
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            overflowX: 'scroll'
            // 'overflow-x': 'scroll'
          }}
        >
            {columns.map((column, index) =>
              <Column
                key={index}
                column={column}
              />
            )}
        </Container>

      </DragDropContext>


    </Box>
  );
}
