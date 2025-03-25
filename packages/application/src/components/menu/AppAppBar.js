import { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import GdesiIcon from '../GdesiIcon';

import { signIn, signOut } from 'next-auth/react';


export default function AppAppBar({ user='' }) {  
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
          <Link href="/" color="secondary" component={NextLink}>
            <GdesiIcon />
          </Link>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small">
                About
              </Button>
              <Button variant="text" color="info" size="small">
                Products
              </Button>
              <Button variant="text" color="info" size="small">
                Blog
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button component={NextLink} href="/boards" variant="contained" color="error">
              BOARDS
            </Button>
            <p>|</p>

            { 
              user 
              ? <>
                  <Button onClick={() => signOut({ callbackUrl: '/' })} variant="contained" color="primary">
                    Sign out
                  </Button>  
                </>
              : <>
                  <Button component={NextLink} href="/sign-up" variant="contained" color="primary">
                    Register
                  </Button>
                  <Button onClick={() => signIn()} variant="contained" color="secondary">
                    Sign in
                  </Button>
                </>
            }
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem>About</MenuItem>
                <MenuItem>Products</MenuItem>
                <MenuItem>Blog</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button component={NextLink} href="/sign-up" variant="contained" color="primary">
                    Register
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button onClick={() => signIn()} variant="contained" color="secondary">
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
