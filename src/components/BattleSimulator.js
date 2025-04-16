import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

// Animation keyframes
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  60% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
`;

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Styled components
const BattleArena = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.4)}, ${alpha(theme.palette.secondary.light, 0.4)})`,
  borderRadius: '50%',
  width: '300px',
  height: '300px',
  margin: '0 auto',
  position: 'relative',
  border: `4px solid ${theme.palette.primary.main}`,
  overflow: 'hidden',
  boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.6)}`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    borderRadius: '50%',
    border: `2px dashed ${theme.palette.secondary.main}`,
  },
}));

const BeybladeImage = styled('img')(({ theme, isSpinning }) => ({
  width: '60px',
  height: '60px',
  position: 'absolute',
  borderRadius: '50%',
  animation: isSpinning ? `${spinAnimation} 0.5s linear infinite` : 'none',
  border: `2px solid ${theme.palette.primary.main}`,
  boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.6)}`,
}));

const Player1Beyblade = styled(BeybladeImage)(({ theme, position }) => ({
  top: position.top,
  left: position.left,
  zIndex: 2,
}));

const Player2Beyblade = styled(BeybladeImage)(({ theme, position }) => ({
  top: position.top,
  right: position.right,
  zIndex: 2,
}));

const BattleStatBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  marginBottom: theme.spacing(1),
}));

const BattleLog = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxHeight: '200px',
  overflowY: 'auto',
  marginTop: theme.spacing(2),
  background: alpha(theme.palette.background.paper, 0.8),
}));

const BattleEvent = styled(Typography)(({ theme, isImportant }) => ({
  padding: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  fontWeight: isImportant ? 'bold' : 'normal',
  color: isImportant ? theme.palette.primary.main : theme.palette.text.primary,
  background: isImportant ? alpha(theme.palette.primary.light, 0.2) : 'transparent',
  animation: isImportant ? `${pulseAnimation} 1s ease-in-out` : 'none',
}));

const VictoryContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: alpha(theme.palette.background.paper, 0.8),
  zIndex: 10,
  animation: `${pulseAnimation} 1s infinite`,
}));

const BattleSimulator = ({ players, onBattleComplete }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleEnded, setBattleEnded] = useState(false);
  const [winner, setWinner] = useState(null);
  const [battleLogs, setBattleLogs] = useState([]);
  const [player1Stats, setPlayer1Stats] = useState({ stamina: 100, attack: 0, defense: 0 });
  const [player2Stats, setPlayer2Stats] = useState({ stamina: 100, attack: 0, defense: 0 });
  const [player1Position, setPlayer1Position] = useState({ top: '50%', left: '20%' });
  const [player2Position, setPlayer2Position] = useState({ top: '50%', right: '20%' });
  const [collisionCount, setCollisionCount] = useState(0);

  const handleOpen = () => {
    setOpen(true);
    resetBattle();
  };

  const handleClose = () => {
    setOpen(false);
    setBattleStarted(false);
    setBattleEnded(false);
  };

  const resetBattle = () => {
    setBattleStarted(false);
    setBattleEnded(false);
    setWinner(null);
    setBattleLogs([]);
    setPlayer1Stats({ stamina: 100, attack: 0, defense: 0 });
    setPlayer2Stats({ stamina: 100, attack: 0, defense: 0 });
    setPlayer1Position({ top: '50%', left: '20%' });
    setPlayer2Position({ top: '50%', right: '20%' });
    setCollisionCount(0);
  };

  const startBattle = () => {
    if (!player1 || !player2) {
      addLog('Please select both players first!', true);
      return;
    }

    resetBattle();
    setBattleStarted(true);

    // Initialize Beyblade stats based on player performance
    const p1 = players.find(p => p.id === player1);
    const p2 = players.find(p => p.id === player2);

    // Calculate stats based on player performance
    const p1Attack = Math.min(80, Math.max(30, (p1?.gf || 0) * 10));
    const p1Defense = Math.min(80, Math.max(30, 100 - ((p1?.ga || 0) * 10)));
    
    const p2Attack = Math.min(80, Math.max(30, (p2?.gf || 0) * 10));
    const p2Defense = Math.min(80, Math.max(30, 100 - ((p2?.ga || 0) * 10)));

    setPlayer1Stats({ 
      stamina: 100, 
      attack: p1Attack, 
      defense: p1Defense 
    });
    
    setPlayer2Stats({ 
      stamina: 100, 
      attack: p2Attack, 
      defense: p2Defense 
    });

    // Intro logs
    addLog(`Battle beginning: ${p1?.name} vs ${p2?.name}!`, true);
    addLog(`${p1?.name}'s Beyblade enters the arena!`);
    addLog(`${p2?.name}'s Beyblade enters the arena!`);
    addLog('Let it rip!', true);
  };

  const addLog = (message, isImportant = false) => {
    setBattleLogs(prevLogs => [...prevLogs, { message, isImportant, time: new Date() }]);
  };

  // Simulate battle progress
  useEffect(() => {
    if (!battleStarted || battleEnded) return;

    const p1 = players.find(p => p.id === player1);
    const p2 = players.find(p => p.id === player2);
    
    if (!p1 || !p2) return;

    // Main battle simulation loop
    const battleInterval = setInterval(() => {
      // Move beyblades randomly
      setPlayer1Position(prev => ({
        top: `${Math.max(10, Math.min(90, parseInt(prev.top) + (Math.random() * 20 - 10)))}%`,
        left: `${Math.max(10, Math.min(70, parseInt(prev.left) + (Math.random() * 20 - 10)))}%`
      }));
      
      setPlayer2Position(prev => ({
        top: `${Math.max(10, Math.min(90, parseInt(prev.top) + (Math.random() * 20 - 10)))}%`,
        right: `${Math.max(10, Math.min(70, parseInt(prev.right) + (Math.random() * 20 - 10)))}%`
      }));

      // Reduce stamina over time
      setPlayer1Stats(prev => ({
        ...prev,
        stamina: Math.max(0, prev.stamina - (Math.random() * 1.5))
      }));
      
      setPlayer2Stats(prev => ({
        ...prev,
        stamina: Math.max(0, prev.stamina - (Math.random() * 1.5))
      }));

      // Simulate collisions randomly
      if (Math.random() < 0.2) {
        setCollisionCount(prev => prev + 1);
        
        // Determine collision winner based on attack vs defense
        const p1EffectiveAttack = (player1Stats.attack * (player1Stats.stamina / 100));
        const p2EffectiveDefense = (player2Stats.defense * (player2Stats.stamina / 100));
        
        const p2EffectiveAttack = (player2Stats.attack * (player2Stats.stamina / 100));
        const p1EffectiveDefense = (player1Stats.defense * (player1Stats.stamina / 100));
        
        const p1Damage = Math.max(1, p1EffectiveAttack - p2EffectiveDefense/2) * (Math.random() * 0.5 + 0.75);
        const p2Damage = Math.max(1, p2EffectiveAttack - p1EffectiveDefense/2) * (Math.random() * 0.5 + 0.75);
        
        // Apply damage
        setPlayer1Stats(prev => ({
          ...prev,
          stamina: Math.max(0, prev.stamina - p2Damage)
        }));
        
        setPlayer2Stats(prev => ({
          ...prev,
          stamina: Math.max(0, prev.stamina - p1Damage)
        }));
        
        // Log battle events
        if (collisionCount % 3 === 0) {
          if (p1Damage > p2Damage) {
            addLog(`${p1?.name}'s Beyblade hits with a powerful strike!`);
          } else if (p2Damage > p1Damage) {
            addLog(`${p2?.name}'s Beyblade counters with force!`);
          } else {
            addLog('The Beyblades clash with equal power!');
          }
        }
        
        // Add dramatic commentary occasionally
        if (collisionCount === 5) {
          addLog('The battle is heating up!', true);
        }
        
        if (player1Stats.stamina < 30 && player1Stats.stamina > 25) {
          addLog(`${p1?.name}'s Beyblade is wobbling!`, true);
        }
        
        if (player2Stats.stamina < 30 && player2Stats.stamina > 25) {
          addLog(`${p2?.name}'s Beyblade is losing spin!`, true);
        }
      }
      
      // Check for battle end
      if (player1Stats.stamina <= 0 || player2Stats.stamina <= 0) {
        clearInterval(battleInterval);
        setBattleEnded(true);
        
        if (player1Stats.stamina <= 0 && player2Stats.stamina <= 0) {
          // Draw
          setWinner('draw');
          addLog('Both Beyblades stopped at the same time! It\'s a draw!', true);
        } else if (player1Stats.stamina <= 0) {
          // Player 2 wins
          setWinner(p2);
          addLog(`${p1?.name}'s Beyblade has stopped spinning!`, true);
          addLog(`${p2?.name} wins the battle!`, true);
        } else {
          // Player 1 wins
          setWinner(p1);
          addLog(`${p2?.name}'s Beyblade has stopped spinning!`, true);
          addLog(`${p1?.name} wins the battle!`, true);
        }
        
        // Notify parent component of battle result
        if (onBattleComplete) {
          onBattleComplete({
            player1Id: p1.id,
            player2Id: p2.id,
            winner: winner === 'draw' ? null : winner?.id,
            isDraw: winner === 'draw'
          });
        }
      }
    }, 500);
    
    return () => clearInterval(battleInterval);
  }, [battleStarted, battleEnded, player1, player2, player1Stats, player2Stats, collisionCount, players, winner, onBattleComplete]);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SportsEsportsIcon />}
        onClick={handleOpen}
        fullWidth
        sx={{ mb: 2 }}
      >
        Battle Simulator
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle color="primary">
          Beyblade Battle Simulator
        </DialogTitle>
        <Divider />
        <DialogContent>
          {!battleStarted ? (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Select players for battle
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Player 1</InputLabel>
                    <Select
                      value={player1}
                      onChange={(e) => setPlayer1(e.target.value)}
                      label="Player 1"
                    >
                      {players.map(player => (
                        <MenuItem 
                          key={player.id} 
                          value={player.id}
                          disabled={player.id === player2}
                        >
                          {player.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Player 2</InputLabel>
                    <Select
                      value={player2}
                      onChange={(e) => setPlayer2(e.target.value)}
                      label="Player 2"
                    >
                      {players.map(player => (
                        <MenuItem 
                          key={player.id} 
                          value={player.id}
                          disabled={player.id === player1}
                        >
                          {player.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={startBattle}
                  disabled={!player1 || !player2}
                >
                  Start Battle!
                </Button>
              </Box>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {/* Battle Arena and Beyblades */}
              <Grid item xs={12} md={6}>
                <Box sx={{ position: 'relative' }}>
                  <BattleArena>
                    {/* Player 1 Beyblade */}
                    <Player1Beyblade 
                      src={players.find(p => p.id === player1)?.image || 'https://via.placeholder.com/60'}
                      alt="Player 1 Beyblade"
                      isSpinning={!battleEnded || (battleEnded && winner && winner.id === player1)}
                      position={player1Position}
                    />
                    
                    {/* Player 2 Beyblade */}
                    <Player2Beyblade 
                      src={players.find(p => p.id === player2)?.image || 'https://via.placeholder.com/60'}
                      alt="Player 2 Beyblade"
                      isSpinning={!battleEnded || (battleEnded && winner && winner.id === player2)}
                      position={player2Position}
                    />
                    
                    {/* Victory overlay */}
                    {battleEnded && (
                      <VictoryContainer>
                        <Typography variant="h4" color="primary" gutterBottom>
                          {winner === 'draw' ? 'DRAW!' : `${winner?.name} WINS!`}
                        </Typography>
                        {winner && winner !== 'draw' && (
                          <img 
                            src={winner.image || 'https://via.placeholder.com/100'} 
                            alt={winner.name}
                            width="100"
                            height="100"
                            style={{ borderRadius: '50%', border: `3px solid ${theme.palette.primary.main}` }}
                          />
                        )}
                      </VictoryContainer>
                    )}
                  </BattleArena>
                </Box>
              </Grid>
              
              {/* Battle Stats and Log */}
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  {/* Player 1 Stats */}
                  <Card>
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                        <img 
                          src={players.find(p => p.id === player1)?.image || 'https://via.placeholder.com/40'} 
                          alt="Player 1"
                          width="40"
                          height="40"
                          style={{ borderRadius: '50%' }}
                        />
                        <Typography variant="h6">
                          {players.find(p => p.id === player1)?.name || 'Player 1'}
                        </Typography>
                      </Stack>
                      
                      <Typography variant="body2" gutterBottom>
                        Stamina
                      </Typography>
                      <BattleStatBar 
                        variant="determinate" 
                        value={player1Stats.stamina} 
                        color={player1Stats.stamina < 30 ? "error" : "primary"}
                      />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" gutterBottom>
                            Attack: {Math.round(player1Stats.attack)}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" gutterBottom>
                            Defense: {Math.round(player1Stats.defense)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  
                  {/* Player 2 Stats */}
                  <Card>
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                        <img 
                          src={players.find(p => p.id === player2)?.image || 'https://via.placeholder.com/40'} 
                          alt="Player 2"
                          width="40"
                          height="40"
                          style={{ borderRadius: '50%' }}
                        />
                        <Typography variant="h6">
                          {players.find(p => p.id === player2)?.name || 'Player 2'}
                        </Typography>
                      </Stack>
                      
                      <Typography variant="body2" gutterBottom>
                        Stamina
                      </Typography>
                      <BattleStatBar 
                        variant="determinate" 
                        value={player2Stats.stamina} 
                        color={player2Stats.stamina < 30 ? "error" : "secondary"}
                      />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" gutterBottom>
                            Attack: {Math.round(player2Stats.attack)}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" gutterBottom>
                            Defense: {Math.round(player2Stats.defense)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  
                  {/* Battle Log */}
                  <BattleLog>
                    <Typography variant="subtitle1" gutterBottom>
                      Battle Log
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {battleLogs.map((log, index) => (
                        <BattleEvent 
                          key={index} 
                          variant="body2"
                          isImportant={log.isImportant}
                        >
                          {log.message}
                        </BattleEvent>
                      ))}
                    </Box>
                  </BattleLog>
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <Divider />
        <DialogActions>
          {battleStarted && !battleEnded ? (
            <Button 
              variant="outlined" 
              color="secondary"
              onClick={() => setBattleEnded(true)}
            >
              End Battle
            </Button>
          ) : battleEnded ? (
            <Button
              variant="contained"
              color="primary"
              onClick={resetBattle}
            >
              New Battle
            </Button>
          ) : null}
          <Button onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BattleSimulator; 