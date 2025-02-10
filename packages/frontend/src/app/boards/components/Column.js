import Typography from '@mui/material/Typography';
import { Stack, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { Droppable, Draggable } from '@hello-pangea/dnd';

import { TaskCard } from './TaskCard'

export const Column = ({column}) => {
    return(
        <Droppable
            droppableId={`droppable-${column.id}`}
        >
        {(provided, snapshot) => 
        <div
            ref={provided.innerRef}
            {...provided.droppableProps}
        >
            <Paper 
                elevation={0} 
                variant="outlined"
                square
                sx={{
                    padding: 2, 
                    margin: 2, 
                    height: '95%' 
                }}
            >
                <Box sx={{
                        minWidth: 300, 
                     }}>
                    <Stack
                        spacing={2}
                        key={column.id}
                    >
                        <Typography variant="h5" component="div">
                            {column.title}
                        </Typography>
                        {provided.placeholder}
                        { column.cards.map((card, index) => {
                            return (
                                <TaskCard
                                    provided={provided}
                                    columnId={column.id}
                                    card={card}
                                    key={`${column.id}-${index}`}
                                    index={index}
                                />
                            )
                        })
                        }
                    </Stack>
                </Box>
            </Paper>
        </div>
        }
        </Droppable>
    );
}
