import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI - Next.js App Router example in JavaScript
        </Typography>
        <Link href="/about" color="secondary" component={NextLink}>
          Go to the about page
        </Link>
        <Link href="/marketing-page" color="secondary" component={NextLink}>
          Go to the marketing page
        </Link>
        <Link href="/sign-up" color="secondary" component={NextLink}>
          Go to the sign-up page
        </Link>
        <Link href="/sign-in" color="secondary" component={NextLink}>
          Go to the sign-in page
        </Link>
        <Link href="/dashboard" color="secondary" component={NextLink}>
          Go to the dashboard page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
