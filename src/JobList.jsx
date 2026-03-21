import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Chip, Box, Avatar, Grid, Button, CircularProgress } from '@mui/material';
import { fetchLinkedInJobs } from './api/linkedin';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadJobs = async () => {
      try {
        const linkedInJobs = await fetchLinkedInJobs();
        if (mounted) {
          setJobs(linkedInJobs);
        }
      } catch (error) {
        console.error("Failed to fetch jobs from LinkedIn API", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, textAlign: 'left' }}>
        Find Your Perfect Job
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid size={{ xs: 12 }} key={job.id}>
            <Card variant="outlined" sx={{ borderRadius: 3, display: 'flex', alignItems: 'flex-start', p: 2, '&:hover': { boxShadow: 3 } }}>

              <Avatar variant="rounded" sx={{ width: 64, height: 64, mr: 3, bgcolor: 'primary.light' }}>
                {job.company.substring(0, 2).toUpperCase()}
              </Avatar>

              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                  {job.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, mb: 2, color: 'text.secondary', typography: 'body2' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <span style={{ fontWeight: 500, color: '#333' }}>{job.company}</span>
                  </Box>
                  <span>•</span>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOnOutlinedIcon fontSize="small" />
                    {job.location}
                  </Box>
                  <span>•</span>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <WorkOutlineOutlinedIcon fontSize="small" />
                    {job.type}
                  </Box>
                  <span>•</span>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeOutlinedIcon fontSize="small" />
                    {job.postedAt}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {job.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" sx={{ bgcolor: 'rgba(25, 118, 210, 0.08)', color: 'primary.main', fontWeight: 500 }} />
                  ))}
                  <Chip label={job.experience} size="small" variant="outlined" sx={{ fontWeight: 500 }} />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '100%' }}>
                <Button size="small" variant="text" sx={{ minWidth: 0, p: 1, color: 'text.secondary' }}>
                   <StarBorderIcon />
                </Button>
                <Button variant="contained" color="primary" sx={{ mt: 3, borderRadius: 2 }}>
                  Apply
                </Button>
              </Box>

            </Card>
          </Grid>
        ))}
      </Grid>
      )}

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="outlined" color="primary" size="large">
          View All Jobs
        </Button>
      </Box>
    </Container>
  );
}
