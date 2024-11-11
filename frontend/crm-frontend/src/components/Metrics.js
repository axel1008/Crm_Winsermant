import React from 'react';
import { Box, Typography } from '@mui/material';

const Metrics = () => {
  return (
    <Box display="flex" justifyContent="space-between" mt={3}>
      <Box>
        <Typography variant="h6">2</Typography>
        <Typography>Open Projects</Typography>
      </Box>
      <Box>
        <Typography variant="h6">9</Typography>
        <Typography>Projects Completed</Typography>
      </Box>
      <Box>
        <Typography variant="h6">958.17</Typography>
        <Typography>Total de Horas Trabajadas</Typography>
      </Box>
      <Box>
        <Typography variant="h6">3,028.95</Typography>
        <Typography>Total de Horas del Proyecto</Typography>
      </Box>
    </Box>
  );
};

export default Metrics;
