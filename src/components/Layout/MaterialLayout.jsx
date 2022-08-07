import React from 'react';

import { theme, useStyle } from './styles';
import { CssBaseline, Paper, ThemeProvider } from '@mui/material';

export default function MaterialLayout(props) {
  const { children } = props;
  const classes = useStyle();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root} style={{ width: '80%' }}>
        <Paper className={classes.paper}>{children}</Paper>
      </div>
    </ThemeProvider>
  );
}
