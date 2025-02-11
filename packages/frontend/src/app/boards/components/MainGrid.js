import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

import { DragDropContext } from '@hello-pangea/dnd';

import { Column } from './Column';

export default function MainGrid({ data={} }) {

  const [columns, setColumns] = useState(data)

  const handleColumnChange = (event) => {
    // setColumns(event.target.value);
  };

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
                handleColumnChange={handleColumnChange}
              />
            )}
        </Container>

      </DragDropContext>


    </Box>
  );
}
