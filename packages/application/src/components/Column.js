import Typography from '@mui/material/Typography';
import { Stack, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { Droppable } from '@hello-pangea/dnd';

import { TaskCard } from '../components/TaskCard';

export const Column = ({ column, handleColumnChange }) => {

    return (
        <Droppable
            droppableId={`${column.id}`}
        >
        {(provided, snapshot) => 
        <div
            ref={provided.innerRef}
            {...provided.droppableProps}
        >

            {   snapshot.isDraggingOver 
                && handleColumnChange({
                    column: column.id, 
                    card: snapshot.draggingOverWith 
                })
            }

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
                                    key={`${column.id}-${index}`}
                                    provided={provided}
                                    card={card}
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
