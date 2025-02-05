import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

export const TaskCard = ({id, title, type, assignee}) => {

    return(
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined" sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {id}
                    </Typography>
                    <Typography variant="h5" component="div">
                    {title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    {type}
                    </Typography>
                    <Typography variant="body2">
                    {assignee}
                    <br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">More</Button>
                </CardActions>
            </Card>
        </Box>
    )
}