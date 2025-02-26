import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


export default function CheckInTaskCard({task, index}) {
    return (  
        <Card sx={{ minWidth: 275, maxWidth: 400 }} key={index}>
        <CardContent>
            <Typography gutterBottom sx={{ fontSize: 14 }}>
                <Link href={`/tasks/${task.id}`} underline="none" >
                    {task.id}
                </Link>
            </Typography>
            <Typography variant="h5" component="div">
            {task.title}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            {task.type}
            </Typography>
        </CardContent>
        </Card>
    )
}
