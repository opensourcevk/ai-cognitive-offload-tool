import React from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Hero() {
  return (
    <Box sx={{ bgcolor: '#f4f7fa', py: 8, textAlign: 'center' }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          Find Your Dream Tech Job
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          With Visa Sponsorship, Relocation Package & Remote Work Opportunities
        </Typography>

        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', mt: 4, borderRadius: 2 }} elevation={3}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, ml: 1 }} />
          <TextField
            fullWidth
            placeholder="Job title, keyword or company"
            variant="standard"
            InputProps={{ disableUnderline: true }}
          />
          <Button variant="contained" color="primary" sx={{ ml: 2, px: 4, py: 1.5 }}>
            Search
          </Button>
        </Paper>

        <Grid container spacing={4} sx={{ mt: 6 }} justifyContent="center">
          <Grid size={{ xs: 4, sm: 3 }}>
            <Typography variant="h5" fontWeight="bold" color="primary.main">10,757+</Typography>
            <Typography variant="body2" color="text.secondary">Total Jobs</Typography>
          </Grid>
          <Grid size={{ xs: 4, sm: 3 }}>
            <Typography variant="h5" fontWeight="bold" color="primary.main">4,447+</Typography>
            <Typography variant="body2" color="text.secondary">Companies</Typography>
          </Grid>
          <Grid size={{ xs: 4, sm: 3 }}>
            <Typography variant="h5" fontWeight="bold" color="primary.main">50+</Typography>
            <Typography variant="body2" color="text.secondary">Countries</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
