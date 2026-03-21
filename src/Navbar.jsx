import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Link } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position="static" color="inherit" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.main', mr: 4 }}>
          Jaabz
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          <Link href="#" color="text.primary" underline="none" sx={{ fontWeight: 500 }}>
            Home
          </Link>
          <Link href="#" color="text.primary" underline="none" sx={{ fontWeight: 500 }}>
            Jobs
          </Link>
          <Link href="#" color="text.primary" underline="none" sx={{ fontWeight: 500 }}>
            Visa Sponsorship
          </Link>
          <Link href="#" color="text.primary" underline="none" sx={{ fontWeight: 500 }}>
            Relocation
          </Link>
          <Link href="#" color="text.primary" underline="none" sx={{ fontWeight: 500 }}>
            Remote
          </Link>
          <Link href="#" color="text.primary" underline="none" sx={{ fontWeight: 500 }}>
            Countries
          </Link>
          <Link href="#" color="text.primary" underline="none" sx={{ fontWeight: 500 }}>
            Companies
          </Link>
          <Link href="#" color="text.primary" underline="none" sx={{ fontWeight: 500 }}>
            Blog
          </Link>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit">Sign In</Button>
          <Button variant="contained" color="primary" disableElevation>
            Post Job Free
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
