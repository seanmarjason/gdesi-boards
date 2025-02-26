import Typography from '@mui/material/Typography';

export default function CheckInRecord({ checkIn }) {
    return (
        <Typography variant="h2" gutterBottom>
            Check in from {checkIn.date}
        </Typography>
    )
}
