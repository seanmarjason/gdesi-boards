import { Stack, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TaskCard } from './TaskCard'

export const Column = ({column}) => {
    return(
        <Box sx={{ minWidth: '25%' }}>
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
    );
}
