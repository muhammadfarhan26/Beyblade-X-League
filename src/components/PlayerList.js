import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
  Container,
  Stack,
  Chip,
  Divider,
  Fade,
  Zoom,
} from '@mui/material';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import AwayIcon from '@mui/icons-material/DirectionsRun';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { keyframes } from '@mui/system';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import RefreshIcon from '@mui/icons-material/Refresh';
import Autocomplete from '@mui/material/Autocomplete';

// Custom styled components
const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '& .MuiTableCell-head': {
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

// Add styled component for image upload
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const PlayerImage = styled('img')(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginRight: theme.spacing(1),
  border: `2px solid ${theme.palette.primary.main}`,
}));

const SchedulePlayerCell = styled(TableCell)(({ theme }) => ({
  '& .MuiStack-root': {
    alignItems: 'center',
  },
}));

// Add celebration animation keyframes
const confettiAnimation = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
`;

const winnerAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Add styled components for celebration
const Confetti = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '10px',
  height: '10px',
  backgroundColor: theme.palette.primary.main,
  animation: `${confettiAnimation} 1s ease-out forwards`,
}));

const WinnerText = styled(Typography)(({ theme }) => ({
  animation: `${winnerAnimation} 1s ease-in-out infinite`,
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));

const CelebrationOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1300,
}));

// Add new keyframes for 3D spinning animation
const spinAnimation = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg) rotateX(30deg);
  }
  100% {
    transform: perspective(1000px) rotateY(360deg) rotateX(30deg);
  }
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const glowAnimation = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 15px rgba(0, 123, 255, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 30px rgba(0, 123, 255, 0.8));
  }
`;

// Add styled components for Beyblade animation
const BeybladeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  perspective: '1000px',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const BeybladeImage = styled('img')(({ theme }) => ({
  width: '500px',
  height: '300px',
  animation: `
    ${spinAnimation} 3s linear infinite,
    ${floatAnimation} 4s ease-in-out infinite,
    ${glowAnimation} 2s ease-in-out infinite
  `,
  transformStyle: 'preserve-3d',
}));

// Add sponsored image URL
const BEYBLADE_IMAGES = {
  logo: 'https://preview.redd.it/mixed-the-beyblade-x-logo-with-elements-of-ddr-a20s-logo-v0-oc40vm0udsjc1.jpeg?auto=webp&s=1bd5b01b088978dc352629c7e0c949e206482552',
  background: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc7p4LxwL67h5_tHQv6v1N7T5hAP7l1GkHEQ&s',
  trophy: 'https://res.cloudinary.com/teepublic/image/private/s--0AM6a7KX--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_000000,e_outline:48/co_000000,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1695484627/production/designs/50954535_0.jpg',
  arena: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Takara_Tomy_Logo.png/1200px-Takara_Tomy_Logo.png',
  sponsored: 'https://cleanshop77.ru/upload/iblock/16c/pdytitxetbmsi1rgvm69ln5vbfw1upf1.jpg', // Template for sponsored by image
  beyblade3d: 'https://media1.giphy.com/media/howrt5MNuvEkOWNUji/giphy.gif?cid=6c09b9528m4zhghfmtrag8iwxiklxr90e75k8kcsnoj0zn70&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s',
};

// Add styled components for images
const BackgroundImage = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url(${BEYBLADE_IMAGES.background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  opacity: 0.1,
  zIndex: -1,
  filter: 'blur(2px)',
}));

const LogoImage = styled('img')(({ theme }) => ({
  height: '40px',
  marginRight: theme.spacing(2),
  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
}));

const TrophyIcon = styled('img')(({ theme }) => ({
  width: '24px',
  height: '24px',
  marginRight: theme.spacing(1),
  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
}));

const ArenaIcon = styled('img')(({ theme }) => ({
  width: '24px',
  height: '24px',
  marginRight: theme.spacing(1),
  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
}));

// Add styled component for footer
const Footer = styled('footer')(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  borderTop: `1px solid ${theme.palette.divider}`,
  zIndex: 1000,
}));

const SponsoredImage = styled('img')(({ theme }) => ({
  height: '40px',
  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

// Add new styled components for rules section
const RulesContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.85)})`,
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  margin: theme.spacing(4, 0),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

const RuleItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  background: alpha(theme.palette.primary.main, 0.05),
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.1),
    transform: 'translateX(10px)',
  },
}));

const RuleNumber = styled(Box)(({ theme }) => ({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  fontWeight: 'bold',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
}));

const RuleText = styled(Typography)(({ theme }) => ({
  flex: 1,
  color: theme.palette.text.primary,
  '& strong': {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

const RulesTitle = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  fontSize: '2rem',
}));

const MatchDialog = ({ open, onClose, match, players, onSave }) => {
  const [player1Score, setPlayer1Score] = useState(match?.player1Score || 0);
  const [player2Score, setPlayer2Score] = useState(match?.player2Score || 0);
  const [result, setResult] = useState(match?.result || '');

  // Auto-calculate result based on scores
  useEffect(() => {
    if (player1Score > player2Score) {
      setResult('win');
    } else if (player1Score < player2Score) {
      setResult('loss');
    } else {
      setResult('draw');
    }
  }, [player1Score, player2Score]);

  const handleSave = () => {
    onSave({
      ...match,
      player1Score,
      player2Score,
      result,
      completed: true
    });
    onClose();
  };

  const player1 = players.find(p => p.id === match?.player1);
  const player2 = players.find(p => p.id === match?.player2);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle color="primary">
        Record Match Result
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="h6" align="center">
            {player1?.name} vs {player2?.name}
          </Typography>
        </Box>
        <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Match Result (Auto-determined)
          </Typography>
          <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
            {result === 'win' ? `${player1?.name} Wins` :
             result === 'loss' ? `${player2?.name} Wins` :
             'Draw'}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label={`${player1?.name} Score`}
              type="number"
              fullWidth
              value={player1Score}
              onChange={(e) => {
                const value = Math.min(9, Math.max(0, parseInt(e.target.value) || 0));
                setPlayer1Score(value);
              }}
              inputProps={{ min: 0, max: 9 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={`${player2?.name} Score`}
              type="number"
              fullWidth
              value={player2Score}
              onChange={(e) => {
                const value = Math.min(9, Math.max(0, parseInt(e.target.value) || 0));
                setPlayer2Score(value);
              }}
              inputProps={{ min: 0, max: 9 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const PlayerList = () => {
  const theme = useTheme();
  const [players, setPlayers] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [openMatchDialog, setOpenMatchDialog] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matchResult, setMatchResult] = useState('win');
  const [player1Score, setPlayer1Score] = useState(3);
  const [player2Score, setPlayer2Score] = useState(0);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [isFirstAttempt, setIsFirstAttempt] = useState(true);
  const [actionType, setActionType] = useState(null);
  const [actionData, setActionData] = useState(null);
  const [openAddPlayerDialog, setOpenAddPlayerDialog] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [playerImage, setPlayerImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [winner, setWinner] = useState(null);
  const [openEditPlayerDialog, setOpenEditPlayerDialog] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [editPlayerName, setEditPlayerName] = useState('');
  const [editPlayerImage, setEditPlayerImage] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [searchHome, setSearchHome] = useState('');
  const [searchAway, setSearchAway] = useState('');
  const [searchAny, setSearchAny] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem('beybladePlayers')) || [];
    const savedSchedule = JSON.parse(localStorage.getItem('beybladeSchedule')) || [];
    setPlayers(savedPlayers);
    setSchedule(savedSchedule);
  }, []);

  const calculateRankings = () => {
    // Reset all player stats
    const updatedPlayers = players.map(player => ({
      ...player,
      wins: 0,
      losses: 0,
      draws: 0,
      points: 0,
      gf: 0,
      ga: 0,
      gamesPlayed: 0,
    }));

    // Calculate stats from completed matches
    schedule.forEach(match => {
      if (match.completed) {
        const player1 = updatedPlayers.find(p => p.id === match.player1);
        const player2 = updatedPlayers.find(p => p.id === match.player2);

        if (player1 && player2) {
          // Update games played
          player1.gamesPlayed += 1;
          player2.gamesPlayed += 1;

          // Update goals for/against
          player1.gf += match.player1Score;
          player1.ga += match.player2Score;
          player2.gf += match.player2Score;
          player2.ga += match.player1Score;

          // Update wins/losses/draws and points
          if (match.result === 'win') {
            player1.wins += 1;
            player2.losses += 1;
            player1.points += 3;
          } else if (match.result === 'draw') {
            player1.draws += 1;
            player2.draws += 1;
            player1.points += 1;
            player2.points += 1;
          } else {
            player1.losses += 1;
            player2.wins += 1;
            player2.points += 3;
          }
        }
      }
    });

    setPlayers(updatedPlayers);
    localStorage.setItem('beybladePlayers', JSON.stringify(updatedPlayers));
  };

  const handleOpenMatchDialog = (match) => {
    setSelectedMatch(match);
    if (match.completed) {
      setMatchResult(match.result);
      setPlayer1Score(match.player1Score);
      setPlayer2Score(match.player2Score);
    } else {
      // Auto-detect winner based on scores
      if (player1Score > player2Score) {
        setMatchResult('win');
      } else if (player1Score < player2Score) {
        setMatchResult('loss');
      } else {
        setMatchResult('draw');
      }
      setPlayer1Score(3);
      setPlayer2Score(0);
    }
    setOpenMatchDialog(true);
  };

  const handleCloseMatchDialog = () => {
    setOpenMatchDialog(false);
    setSelectedMatch(null);
  };

  const updateMatchResult = () => {
    if (!selectedMatch) return;

    // First, revert the previous match result if this is an edit
    if (selectedMatch.completed) {
      const revertedPlayers = players.map(player => {
        if (player.id === selectedMatch.player1 || player.id === selectedMatch.player2) {
          const isPlayer1 = player.id === selectedMatch.player1;
          let points = 0;
          let wins = 0;
          let losses = 0;
          let draws = 0;
          let gf = 0;
          let ga = 0;

          if (selectedMatch.result === 'win') {
            points = isPlayer1 ? -3 : 0;
            wins = isPlayer1 ? -1 : 0;
            losses = isPlayer1 ? 0 : -1;
            gf = isPlayer1 ? -selectedMatch.player1Score : -selectedMatch.player2Score;
            ga = isPlayer1 ? selectedMatch.player2Score : selectedMatch.player1Score;
          } else if (selectedMatch.result === 'draw') {
            points = -1;
            draws = -1;
            gf = isPlayer1 ? -selectedMatch.player1Score : -selectedMatch.player2Score;
            ga = isPlayer1 ? selectedMatch.player2Score : selectedMatch.player1Score;
          } else {
            points = isPlayer1 ? 0 : -3;
            wins = isPlayer1 ? 0 : -1;
            losses = isPlayer1 ? -1 : 0;
            gf = isPlayer1 ? -selectedMatch.player1Score : -selectedMatch.player2Score;
            ga = isPlayer1 ? selectedMatch.player2Score : selectedMatch.player1Score;
          }

          return {
            ...player,
            wins: player.wins + wins,
            losses: player.losses + losses,
            draws: (player.draws || 0) + draws,
            points: player.points + points,
            gamesPlayed: player.gamesPlayed - 1,
            gf: (player.gf || 0) + gf,
            ga: (player.ga || 0) + ga,
          };
        }
        return player;
      });
      setPlayers(revertedPlayers);
    }

    // Update the specific match in the schedule
    const updatedSchedule = schedule.map(match => {
      if (match.id === selectedMatch.id) {
        return {
          ...match,
          completed: true,
          result: matchResult,
          player1Score,
          player2Score,
        };
      }
      return match;
    });

    // Update the players involved in this specific match
    const updatedPlayers = players.map(player => {
      if (player.id === selectedMatch.player1 || player.id === selectedMatch.player2) {
        const isPlayer1 = player.id === selectedMatch.player1;
        let points = 0;
        let wins = 0;
        let losses = 0;
        let draws = 0;
        let gf = 0;
        let ga = 0;

        if (matchResult === 'win') {
          points = isPlayer1 ? 3 : 0;
          wins = isPlayer1 ? 1 : 0;
          losses = isPlayer1 ? 0 : 1;
          gf = isPlayer1 ? player1Score : player2Score;
          ga = isPlayer1 ? -player2Score : -player1Score;
        } else if (matchResult === 'draw') {
          points = 1;
          draws = 1;
          gf = isPlayer1 ? player1Score : player2Score;
          ga = isPlayer1 ? -player2Score : -player1Score;
        } else {
          points = isPlayer1 ? 0 : 3;
          wins = isPlayer1 ? 0 : 1;
          losses = isPlayer1 ? 1 : 0;
          gf = isPlayer1 ? player1Score : player2Score;
          ga = isPlayer1 ? -player2Score : -player1Score;
        }

        return {
          ...player,
          wins: player.wins + wins,
          losses: player.losses + losses,
          draws: (player.draws || 0) + draws,
          points: player.points + points,
          gamesPlayed: player.gamesPlayed + 1,
          gf: (player.gf || 0) + gf,
          ga: (player.ga || 0) + ga,
        };
      }
      return player;
    });

    setSchedule(updatedSchedule);
    setPlayers(updatedPlayers);
    localStorage.setItem('beybladeSchedule', JSON.stringify(updatedSchedule));
    localStorage.setItem('beybladePlayers', JSON.stringify(updatedPlayers));
    handleCloseMatchDialog();
  };

  const handleOpenConfirmation = (type, data = null) => {
    setActionType(type);
    setActionData(data);
    setOpenConfirmationDialog(true);
    setPassword('');
    setIsFirstAttempt(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmationDialog(false);
    setPassword('');
    setIsFirstAttempt(true);
  };

  const handleConfirmAction = () => {
    if (isFirstAttempt) {
      setIsFirstAttempt(false);
      setPassword('');
      return;
    }

    if (actionType === 'reset') {
      resetAllStats();
    } else if (actionType === 'delete') {
      deletePlayer(actionData);
    } else if (actionType === 'generate') {
      generateSchedule();
    } else if (actionType === 'deleteAll') {
      deleteAllPlayers();
    }
    handleCloseConfirmation();
  };

  const resetAllStats = () => {
    const resetPlayers = players.map(player => ({
      ...player,
      wins: 0,
      losses: 0,
      draws: 0,
      points: 0,
      gf: 0,
      ga: 0,
      gamesPlayed: 0,
    }));

    const resetSchedule = schedule.map(match => ({
      ...match,
      completed: false,
      result: null,
      player1Score: 0,
      player2Score: 0,
    }));

    setPlayers(resetPlayers);
    setSchedule(resetSchedule);
    localStorage.setItem('beybladePlayers', JSON.stringify(resetPlayers));
    localStorage.setItem('beybladeSchedule', JSON.stringify(resetSchedule));
  };

  const deletePlayer = (playerId) => {
    const updatedPlayers = players.filter(p => p.id !== playerId);
    setPlayers(updatedPlayers);
    localStorage.setItem('beybladePlayers', JSON.stringify(updatedPlayers));

    const updatedSchedule = schedule.filter(match => 
      match.player1 !== playerId && match.player2 !== playerId
    );
    setSchedule(updatedSchedule);
    localStorage.setItem('beybladeSchedule', JSON.stringify(updatedSchedule));
  };

  const generateSchedule = () => {
    if (players.length < 2) {
      alert('Need at least 2 players to generate a schedule');
      return;
    }

    const newSchedule = [];
    const playerIds = players.map(p => p.id);
    let matchIdCounter = Date.now();
    
    // Generate all possible matches
    for (let i = 0; i < playerIds.length; i++) {
      for (let j = i + 1; j < playerIds.length; j++) {
        // Add two matches for each pair - one home and one away
        newSchedule.push({
          id: matchIdCounter++,
          player1: playerIds[i],
          player2: playerIds[j],
          completed: false,
          result: null,
          player1Score: null,
          player2Score: null,
          isHome: true, // First match is home for player1
        });
        newSchedule.push({
          id: matchIdCounter++,
          player1: playerIds[j],
          player2: playerIds[i],
          completed: false,
          result: null,
          player1Score: null,
          player2Score: null,
          isHome: true, // Second match is home for player2
        });
      }
    }

    // Fisher-Yates shuffle algorithm to randomize the schedule
    for (let i = newSchedule.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newSchedule[i], newSchedule[j]] = [newSchedule[j], newSchedule[i]];
    }

    setSchedule(newSchedule);
    localStorage.setItem('beybladeSchedule', JSON.stringify(newSchedule));
  };

  const deleteAllPlayers = () => {
    setPlayers([]);
    setSchedule([]);
    localStorage.setItem('beybladePlayers', JSON.stringify([]));
    localStorage.setItem('beybladeSchedule', JSON.stringify([]));
  };

  const getRankColor = (index) => {
    const colors = [
      'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
      'linear-gradient(45deg, #C0C0C0 30%, #A9A9A9 90%)',
      'linear-gradient(45deg, #CD7F32 30%, #8B4513 90%)',
    ];
    return index < 3 ? colors[index] : 'inherit';
  };

  const getPlayerName = (id) => {
    const player = players.find(p => p.id === id);
    return player ? player.name : 'Unknown';
  };

  const getWinner = (match) => {
    if (!match.completed) return null;
    if (match.result === 'draw') return null;
    return match.result === 'win' ? match.player1 : match.player2;
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  const handleOpenAddPlayer = () => {
    setOpenAddPlayerDialog(true);
    setNewPlayerName('');
  };

  const handleCloseAddPlayer = () => {
    setOpenAddPlayerDialog(false);
    setNewPlayerName('');
    setPlayerImage(null);
    setImagePreview(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPlayerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer = {
        id: Date.now(),
        name: newPlayerName.trim(),
        image: imagePreview,
        wins: 0,
        losses: 0,
        draws: 0,
        points: 0,
        lastPoints: 0,
        gamesPlayed: 0,
      };
      const updatedPlayers = [...players, newPlayer];
      setPlayers(updatedPlayers);
      localStorage.setItem('beybladePlayers', JSON.stringify(updatedPlayers));
      handleCloseAddPlayer();
      setPlayerImage(null);
      setImagePreview(null);
    }
  };

  // Add function to check if all matches are completed
  const checkAllMatchesCompleted = () => {
    const allCompleted = schedule.every(match => match.completed);
    if (allCompleted && schedule.length > 0) {
      // Find the overall winner based on points and score
      const sortedPlayers = [...players].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        const bScore = (b.gf || 0) + (b.ga || 0);
        const aScore = (a.gf || 0) + (a.ga || 0);
        return bScore - aScore;
      });
      setWinner(sortedPlayers[0]);
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 5000); // Hide celebration after 5 seconds
    }
  };

  // Update useEffect to check for completion
  useEffect(() => {
    checkAllMatchesCompleted();
  }, [schedule, players]);

  const handleOpenEditPlayer = (player) => {
    setEditingPlayer(player);
    setEditPlayerName(player.name);
    setEditPlayerImage(null);
    setEditImagePreview(player.image);
    setOpenEditPlayerDialog(true);
  };

  const handleCloseEditPlayer = () => {
    setOpenEditPlayerDialog(false);
    setEditingPlayer(null);
    setEditPlayerName('');
    setEditPlayerImage(null);
    setEditImagePreview(null);
  };

  const handleEditImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setEditPlayerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditPlayer = () => {
    if (editingPlayer && editPlayerName.trim()) {
      const updatedPlayers = players.map(player => {
        if (player.id === editingPlayer.id) {
          return {
            ...player,
            name: editPlayerName.trim(),
            image: editImagePreview || player.image,
          };
        }
        return player;
      });
      setPlayers(updatedPlayers);
      localStorage.setItem('beybladePlayers', JSON.stringify(updatedPlayers));
      handleCloseEditPlayer();
    }
  };

  const handleExportData = () => {
    const data = {
      players: JSON.parse(localStorage.getItem('beybladePlayers')) || [],
      schedule: JSON.parse(localStorage.getItem('beybladeSchedule')) || []
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'beyblade_league_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.players && data.schedule) {
            localStorage.setItem('beybladePlayers', JSON.stringify(data.players));
            localStorage.setItem('beybladeSchedule', JSON.stringify(data.schedule));
            setPlayers(data.players);
            setSchedule(data.schedule);
            alert('Data imported successfully!');
          } else {
            alert('Invalid data format. Please check the file.');
          }
        } catch (error) {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', pb: 10 }}>
      <BackgroundImage />
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        <Card elevation={3} sx={{ mb: 4, background: 'rgba(255, 255, 255, 0.9)' }}>
          <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 3,
              borderBottom: 1, 
              borderColor: 'divider',
              pb: 2
            }}>
              <LogoImage src={BEYBLADE_IMAGES.logo} alt="Beyblade X League" />
              <Typography variant="h4" component="h1" sx={{ 
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Beyblade X League
              </Typography>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <StyledTabs 
                  value={currentTab} 
                  onChange={(e, newValue) => setCurrentTab(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                >
                  <StyledTab label="Rankings" icon={<EmojiEventsIcon />} />
                  <StyledTab label="Schedule" icon={<EventIcon />} />
                </StyledTabs>
                <StyledButton
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleOpenAddPlayer}
                  sx={{ ml: 2 }}
                >
                  Add Player
                </StyledButton>
              </Stack>
            </Box>

            <TabPanel value={currentTab} index={0}>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                justifyContent="space-between" 
                alignItems={{ xs: 'stretch', sm: 'center' }} 
                spacing={2}
                mb={3}
              >
                <Typography variant="h5" component="h2" color="primary">
                  Player Rankings
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<RefreshIcon />}
                    onClick={calculateRankings}
                    sx={{ minWidth: '120px' }}
                  >
                    Refresh
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DownloadIcon />}
                    onClick={handleExportData}
                    sx={{ minWidth: '120px' }}
                  >
                    Export
                  </Button>
                  <Button
                    component="label"
                    variant="contained"
                    color="primary"
                    startIcon={<UploadIcon />}
                    sx={{ minWidth: '120px' }}
                  >
                    Import
                    <input
                      type="file"
                      hidden
                      accept=".json"
                      onChange={handleImportData}
                    />
                  </Button>
                  <StyledButton
                    variant="contained"
                    color="error"
                    startIcon={<RestartAltIcon />}
                    onClick={() => handleOpenConfirmation('reset')}
                    fullWidth={{ xs: true, sm: false }}
                  >
                    Reset All Stats & Schedule
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleOpenConfirmation('deleteAll')}
                    fullWidth={{ xs: true, sm: false }}
                    disabled={players.length === 0}
                  >
                    Delete All Players
                  </StyledButton>
                </Stack>
              </Stack>
              <TableContainer 
                component={Paper} 
                elevation={2}
                sx={{ 
                  maxWidth: '100%',
                  overflowX: 'auto',
                  '& .MuiTableCell-root': {
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1.5 },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }
                }}
              >
                <Table size="small">
                  <StyledTableHead>
                    <TableRow>
                      <TableCell>Rank</TableCell>
                      <TableCell>Player</TableCell>
                      <TableCell align="right">GP</TableCell>
                      <TableCell align="right">W</TableCell>
                      <TableCell align="right">D</TableCell>
                      <TableCell align="right">L</TableCell>
                      <TableCell align="right">GF</TableCell>
                      <TableCell align="right">GA</TableCell>
                      <TableCell align="right">Score</TableCell>
                      <TableCell align="right">Pts</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {[...players]
                      .sort((a, b) => {
                        // First sort by points
                        if (b.points !== a.points) {
                          return b.points - a.points;
                        }
                        
                        // If points are equal, sort by total score (GF + GA)
                        const aScore = (a.gf || 0) + (a.ga || 0);
                        const bScore = (b.gf || 0) + (b.ga || 0);
                        
                        return bScore - aScore;
                      })
                      .map((player, index) => {
                        const totalScore = (player.gf || 0) + (player.ga || 0);
                        return (
                          <StyledTableRow 
                            key={player.id}
                            sx={{ 
                              background: getRankColor(index),
                            }}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <Stack direction="row" alignItems="center">
                                {player.image ? (
                                  <PlayerImage src={player.image} alt={player.name} />
                                ) : (
                                  <EmojiEventsIcon sx={{ mr: 1 }} />
                                )}
                                <Typography variant="body2" fontWeight="bold">
                                  {player.name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="right">{player.gamesPlayed || 0}</TableCell>
                            <TableCell align="right">{player.wins}</TableCell>
                            <TableCell align="right">{player.draws || 0}</TableCell>
                            <TableCell align="right">{player.losses}</TableCell>
                            <TableCell align="right" sx={{ color: 'success.main' }}>+{player.gf || 0}</TableCell>
                            <TableCell align="right" sx={{ color: 'error.main' }}>{player.ga || 0}</TableCell>
                            <TableCell align="right" sx={{ 
                              color: totalScore > 0 ? 'success.main' : totalScore < 0 ? 'error.main' : 'text.primary',
                              fontWeight: 'bold'
                            }}>
                              {totalScore > 0 ? '+' : ''}{totalScore}
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>{player.points}</TableCell>
                            <TableCell align="right">
                              <Stack direction="row" spacing={1} justifyContent="flex-end">
                                <IconButton
                                  color="primary"
                                  onClick={() => handleOpenEditPlayer(player)}
                                  size="small"
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                  color="error"
                                  onClick={() => handleOpenConfirmation('delete', player.id)}
                                  size="small"
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>

              <BeybladeContainer>
                <BeybladeImage 
                  src={BEYBLADE_IMAGES.beyblade3d}
                  alt="3D Beyblade"
                />
              </BeybladeContainer>

              <RulesContainer>
                <RulesTitle variant="h4">League Rules</RulesTitle>
                <RuleItem>
                  <RuleNumber>1</RuleNumber>
                  <RuleText>
                    Each player use <strong>1 Beyblade only</strong> until the end of league (inc Blade, Bit, and Rachet)
                  </RuleText>
                </RuleItem>
                <RuleItem>
                  <RuleNumber>2</RuleNumber>
                  <RuleText>
                    Point for win the game is <strong>7 pt</strong>, if both player draw until end of battle, than it will be considered as draw
                  </RuleText>
                </RuleItem>
                <RuleItem>
                  <RuleNumber>3</RuleNumber>
                  <RuleText>
                    Point system is <strong>Win = 3 pts</strong>, <strong>Draw = 1 pts</strong>, <strong>Lose = 0 pts</strong>
                  </RuleText>
                </RuleItem>
                <RuleItem>
                  <RuleNumber>4</RuleNumber>
                  <RuleText>
                    Battle Arena will be held at <strong>Budapest</strong>, league will be start at <strong>15/04/25 - 17:00 WIB</strong>
                  </RuleText>
                </RuleItem>
                <RuleItem>
                  <RuleNumber>5</RuleNumber>
                  <RuleText>
                    Match will have <strong>Home and Away system</strong>, to determine the Home and away, the Home side is the bey stadium facing the room door, and away side is the bey stadium that facing shelf, the extreme line will facing window
                  </RuleText>
                </RuleItem>
              </RulesContainer>
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                justifyContent="space-between" 
                alignItems={{ xs: 'stretch', sm: 'center' }} 
                spacing={2}
                mb={3}
              >
                <Typography variant="h5" component="h2" color="primary">
                  Match Schedule
                </Typography>
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  <Autocomplete
                    value={searchAny}
                    onChange={(event, newValue) => {
                      setSearchAny(newValue);
                      if (newValue) {
                        setSearchHome('');
                        setSearchAway('');
                      }
                    }}
                    inputValue={searchAny}
                    onInputChange={(event, newInputValue) => {
                      setSearchAny(newInputValue);
                    }}
                    options={players.map(player => player.name)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search Any Player"
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: 200 }}
                      />
                    )}
                  />
                  <Autocomplete
                    value={searchHome}
                    onChange={(event, newValue) => {
                      setSearchHome(newValue);
                      if (newValue) {
                        setSearchAny('');
                      }
                    }}
                    inputValue={searchHome}
                    onInputChange={(event, newInputValue) => {
                      setSearchHome(newInputValue);
                    }}
                    options={players.map(player => player.name)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search Home Player"
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: 200 }}
                      />
                    )}
                  />
                  <Autocomplete
                    value={searchAway}
                    onChange={(event, newValue) => {
                      setSearchAway(newValue);
                      if (newValue) {
                        setSearchAny('');
                      }
                    }}
                    inputValue={searchAway}
                    onInputChange={(event, newInputValue) => {
                      setSearchAway(newInputValue);
                    }}
                    options={players.map(player => player.name)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search Away Player"
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: 200 }}
                      />
                    )}
                  />
                  <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="all">All Matches</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    startIcon={<EventIcon />}
                    onClick={() => handleOpenConfirmation('generate')}
                    fullWidth={{ xs: true, sm: false }}
                  >
                    Generate Schedule
                  </StyledButton>
                </Stack>
              </Stack>
              <TableContainer 
                component={Paper} 
                elevation={2}
                sx={{ 
                  maxWidth: '100%',
                  overflowX: 'auto',
                  '& .MuiTableCell-root': {
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 0.5, sm: 1.5 },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }
                }}
              >
                <Table size="small">
                  <StyledTableHead>
                    <TableRow>
                      <TableCell>Match</TableCell>
                      <TableCell>Home</TableCell>
                      <TableCell>Away</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </StyledTableHead>
                  <TableBody>
                    {schedule
                      .filter(match => {
                        // Filter by status first
                        if (statusFilter !== 'all') {
                          if (statusFilter === 'pending' && match.completed) return false;
                          if (statusFilter === 'completed' && !match.completed) return false;
                        }

                        // Then filter by player search
                        if (!searchHome && !searchAway && !searchAny) return true;
                        
                        const homePlayer = players.find(p => p.id === match.player1);
                        const awayPlayer = players.find(p => p.id === match.player2);
                        
                        if (searchAny) {
                          return (
                            homePlayer?.name.toLowerCase().includes(searchAny.toLowerCase()) ||
                            awayPlayer?.name.toLowerCase().includes(searchAny.toLowerCase())
                          );
                        }
                        
                        return (
                          (!searchHome || homePlayer?.name.toLowerCase().includes(searchHome.toLowerCase())) &&
                          (!searchAway || awayPlayer?.name.toLowerCase().includes(searchAway.toLowerCase()))
                        );
                      })
                      .map((match) => {
                        const winnerId = getWinner(match);
                        return (
                          <StyledTableRow key={match.id}>
                            <TableCell>M{match.id}</TableCell>
                            <SchedulePlayerCell>
                              <Stack direction="row" alignItems="center" spacing={0.5}>
                                {players.find(p => p.id === match.player1)?.image ? (
                                  <PlayerImage 
                                    src={players.find(p => p.id === match.player1)?.image} 
                                    alt={getPlayerName(match.player1)} 
                                  />
                                ) : (
                                  <EmojiEventsIcon sx={{ mr: 1 }} />
                                )}
                                <Typography 
                                  variant="body2"
                                  color={winnerId === match.player1 ? 'primary' : 'text.primary'}
                                  fontWeight={winnerId === match.player1 ? 'bold' : 'normal'}
                                >
                                  {getPlayerName(match.player1)}
                                </Typography>
                                {match.isHome && (
                                  <Chip
                                    icon={<HomeIcon />}
                                    label="H"
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ minWidth: '24px', height: '24px' }}
                                  />
                                )}
                              </Stack>
                            </SchedulePlayerCell>
                            <SchedulePlayerCell>
                              <Stack direction="row" alignItems="center" spacing={0.5}>
                                {players.find(p => p.id === match.player2)?.image ? (
                                  <PlayerImage 
                                    src={players.find(p => p.id === match.player2)?.image} 
                                    alt={getPlayerName(match.player2)} 
                                  />
                                ) : (
                                  <EmojiEventsIcon sx={{ mr: 1 }} />
                                )}
                                <Typography 
                                  variant="body2"
                                  color={winnerId === match.player2 ? 'primary' : 'text.primary'}
                                  fontWeight={winnerId === match.player2 ? 'bold' : 'normal'}
                                >
                                  {getPlayerName(match.player2)}
                                </Typography>
                                {!match.isHome && (
                                  <Chip
                                    icon={<AwayIcon />}
                                    label="A"
                                    size="small"
                                    color="secondary"
                                    variant="outlined"
                                    sx={{ minWidth: '24px', height: '24px' }}
                                  />
                                )}
                              </Stack>
                            </SchedulePlayerCell>
                            <TableCell>
                              <Chip
                                label={match.completed ? 'Done' : 'Pend'}
                                color={match.completed ? 'success' : 'warning'}
                                size="small"
                                sx={{ minWidth: '24px', height: '24px' }}
                              />
                            </TableCell>
                            <TableCell>
                              {match.completed 
                                ? `${match.player1Score}-${match.player2Score}`
                                : '-'
                              }
                            </TableCell>
                            <TableCell>
                              {!match.completed ? (
                                <StyledButton
                                  variant="outlined"
                                  size="small"
                                  onClick={() => handleOpenMatchDialog(match)}
                                >
                                  Record
                                </StyledButton>
                              ) : (
                                <Stack direction="row" spacing={1}>
                                  <StyledButton
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleOpenMatchDialog(match)}
                                    startIcon={<EditIcon />}
                                  >
                                    Edit
                                  </StyledButton>
                                </Stack>
                              )}
                            </TableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            <MatchDialog
              open={openMatchDialog}
              onClose={handleCloseMatchDialog}
              match={selectedMatch}
              players={players}
              onSave={updateMatchResult}
            />

            <Dialog 
              open={openConfirmationDialog} 
              onClose={handleCloseConfirmation}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle color="primary">
                Confirm Action
              </DialogTitle>
              <Divider />
              <DialogContent>
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    {actionType === 'reset' 
                      ? 'Are you sure you want to reset all player statistics and schedule?'
                      : actionType === 'delete'
                      ? 'Are you sure you want to delete this player? This will also remove all their matches from the schedule.'
                      : actionType === 'deleteAll'
                      ? 'Are you sure you want to delete all players? This will also remove all matches from the schedule.'
                      : 'Are you sure you want to generate a new schedule? This will create a new randomized schedule for all players.'
                    }
                  </Typography>
                  <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                    {isFirstAttempt ? 'Please enter the password to confirm' : 'Incorrect password. Please try again.'}
                  </Typography>
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!isFirstAttempt}
                    helperText={!isFirstAttempt ? 'Incorrect password' : ''}
                  />
                </Box>
              </DialogContent>
              <Divider />
              <DialogActions>
                <Button onClick={handleCloseConfirmation}>
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleConfirmAction}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog 
              open={openAddPlayerDialog} 
              onClose={handleCloseAddPlayer}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle color="primary">
                Add New Player
              </DialogTitle>
              <Divider />
              <DialogContent>
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Stack spacing={2}>
                    <TextField
                      label="Player Name"
                      fullWidth
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddPlayer();
                        }
                      }}
                      autoFocus
                    />
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                    >
                      Upload Beyblade Image
                      <VisuallyHiddenInput 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Button>
                    {imagePreview && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <PlayerImage src={imagePreview} alt="Beyblade Preview" />
                      </Box>
                    )}
                  </Stack>
                </Box>
              </DialogContent>
              <Divider />
              <DialogActions>
                <Button onClick={handleCloseAddPlayer}>
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleAddPlayer}
                  disabled={!newPlayerName.trim()}
                >
                  Add
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog 
              open={openEditPlayerDialog} 
              onClose={handleCloseEditPlayer}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle color="primary">
                Edit Player
              </DialogTitle>
              <Divider />
              <DialogContent>
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Stack spacing={2}>
                    <TextField
                      label="Player Name"
                      fullWidth
                      value={editPlayerName}
                      onChange={(e) => setEditPlayerName(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleEditPlayer();
                        }
                      }}
                      autoFocus
                    />
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                    >
                      Upload New Beyblade Image
                      <VisuallyHiddenInput 
                        type="file" 
                        accept="image/*"
                        onChange={handleEditImageChange}
                      />
                    </Button>
                    {editImagePreview && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <PlayerImage src={editImagePreview} alt="Beyblade Preview" />
                      </Box>
                    )}
                  </Stack>
                </Box>
              </DialogContent>
              <Divider />
              <DialogActions>
                <Button onClick={handleCloseEditPlayer}>
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleEditPlayer}
                  disabled={!editPlayerName.trim()}
                >
                  Save Changes
                </Button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </Card>

        {/* Celebration Overlay */}
        {showCelebration && winner && (
          <CelebrationOverlay>
            <Fade in={true} timeout={1000}>
              <Box sx={{ textAlign: 'center' }}>
                <WinnerText variant="h3" gutterBottom>
                  Congratulations!
                </WinnerText>
                <Box sx={{ mb: 3 }}>
                  {winner.image ? (
                    <PlayerImage 
                      src={winner.image} 
                      alt={winner.name}
                      sx={{ width: 120, height: 120 }}
                    />
                  ) : (
                    <EmojiEventsIcon sx={{ fontSize: 120, color: 'primary.main' }} />
                  )}
                </Box>
                <WinnerText variant="h4" gutterBottom>
                  {winner.name}
                </WinnerText>
                <Typography variant="h6" color="text.secondary">
                  Winner of the Tournament
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {winner.points} Points • {(winner.gf || 0) + (winner.ga || 0)} Score
                </Typography>
              </Box>
            </Fade>
            {/* Confetti effect */}
            {[...Array(50)].map((_, i) => (
              <Confetti
                key={i}
                sx={{
                  left: `${Math.random() * 100}%`,
                  top: '100%',
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </CelebrationOverlay>
        )}
      </Container>

      <Footer>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: 2
          }}>
            <Typography variant="body2" color="text.secondary">
              Sponsored by
            </Typography>
            <SponsoredImage 
              src={BEYBLADE_IMAGES.sponsored} 
              alt="Sponsor Logo" 
            />
          </Box>
        </Container>
      </Footer>
    </Box>
  );
};

export default PlayerList; 