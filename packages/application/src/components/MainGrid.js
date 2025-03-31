'use client'

import { useState } from 'react';

import NextLink from 'next/link';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';

import { DragDropContext } from '@hello-pangea/dnd';

import { Column } from './Column';

export default function MainGrid({ data, updateCardStatus, boardId }) {

  const [columns, setColumns] = useState(data)

  let activeColumn = ''
  let activeCard = ''

  const handleColumnChange = (value) => {
    activeColumn = value.column
    activeCard = value.card
  };

  const handleOnDragEnd = () => {
    // Get card details
    const cards = columns.flatMap( column => column.cards)
    const activeCardDetails = cards.find(card => card.id == activeCard)

    updateCardStatus(activeCard, columns[activeColumn - 1].title).then(
      // Move card
      setColumns(columns.map(column => { 
        // // remove card from old column
        column.cards = column.cards.filter(card => card.id != activeCard)
        // add card to new column
        if (column.id === activeColumn) {
          return {
              ...column,
              cards: [
                activeCardDetails,
                ...column.cards
              ] 
            };
        }
        return column;
        })
      )
    )
  }

  return (
    <Box sx={{
      width: '100%'
    }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Your Team's Work
      </Typography>

      <Button component={NextLink} href={`/boards/${boardId}/tasks/new`} variant="contained" color="secondary">
        Create New Task
      </Button>

      <DragDropContext
        onDragEnd={
          handleOnDragEnd
        }
      >

        <Container
          fixed
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            overflowX: 'scroll'
          }}
        >
            {
            columns ?
              columns.map((column, index) =>
                <Column
                  key={index}
                  column={column}
                  handleColumnChange={handleColumnChange}
                />
              )
              : <div></div>
            }
        </Container>

      </DragDropContext>


    </Box>
  );
}
