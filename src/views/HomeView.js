import React from 'react';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';

export default function HomeView() {
  return (
    <div className="container">
      <Paper className="paper">
        <h1>Главная</h1>
      </Paper>
    </div>
    // <Box textAlign="center" fontSize="h6.fontSize" color="primary.main">
    //   Главная
    // </Box>
  );
}
