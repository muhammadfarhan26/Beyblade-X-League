import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Fab,
  alpha,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import PlayerList from './PlayerList';
import BattleSimulator from './BattleSimulator';
import BeybladeCustomizer from './BeybladeCustomizer';
import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';

const BeybladeLeague = () => {
  const theme = useTheme();
  const [players, setPlayers] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  
  useEffect(() => {
    // Load data from localStorage
    const savedPlayers = JSON.parse(localStorage.getItem('beybladePlayers')) || [];
    const savedSchedule = JSON.parse(localStorage.getItem('beybladeSchedule')) || [];
    setPlayers(savedPlayers);
    setSchedule(savedSchedule);
    
    // Show a welcome message for first-time users
    if (savedPlayers.length === 0) {
      setShowHelp(true);
    }
  }, []);
  
  const handleBattleComplete = (battleResult) => {
    // You could implement logic to record battle results here
    setSnackbar({
      open: true,
      message: battleResult.isDraw 
        ? 'Battle ended in a draw!' 
        : `${players.find(p => p.id === battleResult.winner)?.name} won the battle!`,
      severity: 'success'
    });
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Quick Start Guide for new users */}
      {showHelp && (
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            mb: 4, 
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.2)}, ${alpha(theme.palette.secondary.light, 0.2)})`,
            border: `1px solid ${theme.palette.primary.main}`,
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Welcome to Beyblade X League!
          </Typography>
          <Typography variant="body1" paragraph>
            This application helps you manage your Beyblade tournament, track player statistics, and simulate battles.
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={4}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    1. Add Players
                  </Typography>
                  <Typography variant="body2">
                    Start by adding players using the "Add Player" button. Upload Beyblade images for each player.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    2. Generate Schedule
                  </Typography>
                  <Typography variant="body2">
                    Create a match schedule for all players using the "Generate Schedule" button in the Schedule tab.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    3. Record Results
                  </Typography>
                  <Typography variant="body2">
                    Record match results and watch as the player rankings update automatically.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowHelp(false)}
            >
              Got it!
            </Button>
          </Box>
        </Paper>
      )}
      
      {/* Featured content area */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ height: '100%' }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Beyblade X League
              </Typography>
              <Typography variant="body1" paragraph>
                Welcome to the ultimate Beyblade tournament administration system (BTAS). Track player stats, customize Beyblades, and simulate epic battles!
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
                <BattleSimulator 
                  players={players} 
                  onBattleComplete={handleBattleComplete} 
                />
              </Stack>
              
              <Typography variant="h6" gutterBottom>
                Latest League Updates
              </Typography>
              <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                <Typography variant="body2" paragraph>
                  The Beyblade X League is a tournament where players compete with their personalized Beyblades. Each match awards points based on wins, draws, and losses. The player with the most points at the end of the season is crowned champion!
                </Typography>
                <Typography variant="body2">
                  New Feature: Battle Simulator!
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              height="200"
              image="https://media1.giphy.com/media/howrt5MNuvEkOWNUji/giphy.gif?cid=6c09b9528m4zhghfmtrag8iwxiklxr90e75k8kcsnoj0zn70&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
              alt="Beyblade"
            />
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Beyblade Stats
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" gutterBottom display="flex" justifyContent="space-between">
                    <span>Total Players</span>
                    <span>{players.length}</span>
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" gutterBottom display="flex" justifyContent="space-between">
                    <span>Matches Played</span>
                    <span>{schedule.filter(match => match.completed).length}</span>
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" gutterBottom display="flex" justifyContent="space-between">
                    <span>Matches Remaining</span>
                    <span>{schedule.filter(match => !match.completed).length}</span>
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" gutterBottom display="flex" justifyContent="space-between">
                    <span>Top Ranked Player</span>
                    <span>
                      {players
                        .sort((a, b) => b.points - a.points)
                        .slice(0, 1)
                        .map(p => p.name)[0] || 'N/A'}
                    </span>
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Main content */}
      <PlayerList />
      
      {/* Help button */}
      <Fab
        color="secondary"
        aria-label="help"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setShowHelp(true)}
      >
        <HelpIcon />
      </Fab>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BeybladeLeague; 