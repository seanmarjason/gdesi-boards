import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { usePathname } from 'next/navigation'

import { Draggable } from '@hello-pangea/dnd';

export const TaskCard = ({card, index}) => {
    const pathname = usePathname()

    const handleTaskClick = (event) => {
        // event.preventDefault()
    }

    return(
        <Draggable
            draggableId={`${card.id}`}
            index={index}
        >
            {(provided, snapshot) => 
                <Card sx={{ minWidth: 275 }} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <CardContent>
                                <Typography gutterBottom sx={{ fontSize: 14 }}>
                                    <Link href={`${pathname}/tasks/${card.id}`} underline="none" onClick={handleTaskClick}>
                                        {card.id}
                                    </Link>
                                </Typography>
                                <Typography variant="h5" component="div">
                                {card.title}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                {card.type}
                                </Typography>
                                <Typography variant="body2">
                                {card.assignee}
                                <br />
                                </Typography>
                            </CardContent>
                </Card>
            }
        </Draggable>
    )
}