import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box } from '@mui/material';
import PlayerList from './components/PlayerList';
import AddPlayer from './components/AddPlayer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <h1 style={{ textAlign: 'center', color: '#1976d2' }}></h1>
          <AddPlayer />
          <PlayerList />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 