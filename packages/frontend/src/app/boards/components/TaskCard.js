import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

import { Draggable } from '@hello-pangea/dnd';

export const TaskCard = ({innerRef, id, title, type, assignee, provided}) => {
    return(
        // <Draggable
        //     draggableId={`draggable-${index}`}
        //     index={index}
        // >
        // {(provided, snapshot) => 
            // <div
            //     ref={provided.innerRef}
            // >
            <Card sx={{ minWidth: 275 }} ref={innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            # {id}
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
                </CardActionArea>
                {/* <CardActions>
                    <Button size="small">Back</Button>
                    <Button size="small">Forward</Button>
                </CardActions> */}
            </Card>
            // </div>
        // }
        // </Draggable>
    )
}