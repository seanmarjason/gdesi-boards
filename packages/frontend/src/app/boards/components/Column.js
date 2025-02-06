import Typography from '@mui/material/Typography';
import { Stack, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { TaskCard } from './TaskCard'

export const Column = ({column}) => {
    return(
        <Paper 
            elevation={0} 
            variant="outlined"
            square
            sx={{ padding: 2, margin: 2 }}
        >
            <Box sx={{ minWidth: 300, height: '100%' }}>
                <Stack spacing={2}>
                    <Typography variant="h5" component="div">
                        {column.title}
                    </Typography>
                    { column.cards.map((card, index) => {
                        return (
                            <TaskCard
                                key={index}
                                id={card.id}
                                title={card.title}
                                type={card.type}
                                assignee={card.assignee}
                            />
                        )
                    })
                    }
                </Stack>
            </Box>
        </Paper>
    );
}
