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
  CircularProgress,
  LinearProgress,
  Rating,
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
import BarChartIcon from '@mui/icons-material/BarChart';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import BuildIcon from '@mui/icons-material/Build';
import BeybladeCustomizer from './BeybladeCustomizer';
import BattleSimulator from './BattleSimulator';

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
    color: theme.palette.common.white, // Always use white text on colored background
    fontWeight: 'bold',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.05) : theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.1) : theme.palette.action.selected,
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
  sponsored: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Takara_Tomy_Logo.png/1200px-Takara_Tomy_Logo.png', // Template for sponsored by image
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

// Change the TrophyIcon styled component to TrophyImage
const TrophyImage = styled('img')(({ theme }) => ({
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
  background: theme.palette.mode === 'dark' 
    ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.85)})` 
    : `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.85)})`,
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  margin: theme.spacing(4, 0),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  color: theme.palette.text.primary, // Ensure proper text color
}));

const RuleItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.primary.main, 0.15)
    : alpha(theme.palette.primary.main, 0.05),
  transition: 'all 0.3s ease',
  '&:hover': {
    background: theme.palette.mode === 'dark' 
      ? alpha(theme.palette.primary.main, 0.2)
      : alpha(theme.palette.primary.main, 0.1),
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

  // Update state when match prop changes
  useEffect(() => {
    if (match) {
      setPlayer1Score(match.player1Score || 0);
      setPlayer2Score(match.player2Score || 0);
      setResult(match.result || '');
    }
  }, [match]);

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
                const value = Math.max(0, parseInt(e.target.value) || 0);
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
                const value = Math.max(0, parseInt(e.target.value) || 0);
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

// Add new styled components for stats section
const StatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
  },
}));

const BeybladeRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: theme.palette.primary.main,
  },
}));

const BeyStatProgressBar = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '25px',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    transition: 'width 1s ease-in-out',
  },
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '2rem',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const PlayerList = () => {
  const theme = useTheme();
  const [players, setPlayers] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [openMatchDialog, setOpenMatchDialog] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
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
  const [beybladeRatings, setBeybladeRatings] = useState({});
  const [showBeybladeDetails, setShowBeybladeDetails] = useState(false);
  const [selectedBeyblade, setSelectedBeyblade] = useState(null);
  const [customBeyblade, setCustomBeyblade] = useState({});

  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem('beybladePlayers')) || [];
    const savedSchedule = JSON.parse(localStorage.getItem('beybladeSchedule')) || [];
    setPlayers(savedPlayers);
    setSchedule(savedSchedule);
    
    // Calculate beyblade ratings when players are loaded
    if (savedPlayers.length > 0) {
      calculateBeybladeRatings();
    }
  }, []);

  // Update beyblade ratings when player stats change
  useEffect(() => {
    if (players.length > 0) {
      calculateBeybladeRatings();
    }
  }, [players]);

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
    setOpenMatchDialog(true);
  };

  const handleCloseMatchDialog = () => {
    setOpenMatchDialog(false);
    setSelectedMatch(null);
  };

  const updateMatchResult = (updatedMatch) => {
    if (!updatedMatch) return;

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
            ga = isPlayer1 ? -selectedMatch.player2Score : -selectedMatch.player1Score;
          } else if (selectedMatch.result === 'draw') {
            points = -1;
            draws = -1;
            gf = isPlayer1 ? -selectedMatch.player1Score : -selectedMatch.player2Score;
            ga = isPlayer1 ? -selectedMatch.player2Score : -selectedMatch.player1Score;
          } else {
            points = isPlayer1 ? 0 : -3;
            wins = isPlayer1 ? 0 : -1;
            losses = isPlayer1 ? -1 : 0;
            gf = isPlayer1 ? -selectedMatch.player1Score : -selectedMatch.player2Score;
            ga = isPlayer1 ? -selectedMatch.player2Score : -selectedMatch.player1Score;
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
          result: updatedMatch.result,
          player1Score: updatedMatch.player1Score,
          player2Score: updatedMatch.player2Score,
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

        if (updatedMatch.result === 'win') {
          points = isPlayer1 ? 3 : 0;
          wins = isPlayer1 ? 1 : 0;
          losses = isPlayer1 ? 0 : 1;
          gf = isPlayer1 ? updatedMatch.player1Score : updatedMatch.player2Score;
          ga = isPlayer1 ? updatedMatch.player2Score : updatedMatch.player1Score;
        } else if (updatedMatch.result === 'draw') {
          points = 1;
          draws = 1;
          gf = isPlayer1 ? updatedMatch.player1Score : updatedMatch.player2Score;
          ga = isPlayer1 ? updatedMatch.player2Score : updatedMatch.player1Score;
        } else {
          points = isPlayer1 ? 0 : 3;
          wins = isPlayer1 ? 0 : 1;
          losses = isPlayer1 ? 1 : 0;
          gf = isPlayer1 ? updatedMatch.player1Score : updatedMatch.player2Score;
          ga = isPlayer1 ? updatedMatch.player2Score : updatedMatch.player1Score;
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
    } else if (actionType === 'softReset') {
      softResetSchedule();
    }
    handleCloseConfirmation();
  };

  const softResetSchedule = () => {
    if (players.length < 2) {
      alert('Need at least 2 players to generate a schedule');
      return;
    }

    // Find players who don't have any matches in the schedule
    const playerIds = players.map(p => p.id);
    const playersInSchedule = new Set();
    
    schedule.forEach(match => {
      playersInSchedule.add(match.player1);
      playersInSchedule.add(match.player2);
    });
    
    const newPlayerIds = playerIds.filter(id => !playersInSchedule.has(id));
    
    // Generate matches between new players and all existing players
    if (newPlayerIds.length === 0) {
      alert('No new players found. All players already have matches scheduled.');
      return;
    }
    
    let newSchedule = [...schedule];
    let matchIdCounter = Date.now();
    
    // Generate matches between new players and all existing players
    for (let i = 0; i < newPlayerIds.length; i++) {
      const newPlayerId = newPlayerIds[i];
      
      // First, create matches between new player and all existing players
      for (let j = 0; j < playerIds.length; j++) {
        const existingPlayerId = playerIds[j];
        
        // Skip if it's the same player or another new player that will be handled separately
        if (existingPlayerId === newPlayerId || newPlayerIds.includes(existingPlayerId)) {
          continue;
        }
        
        // Add two matches - one home and one away
        newSchedule.push({
          id: matchIdCounter++,
          player1: newPlayerId,
          player2: existingPlayerId,
          completed: false,
          result: null,
          player1Score: null,
          player2Score: null,
          isHome: true, // First match is home for new player
        });
        
        newSchedule.push({
          id: matchIdCounter++,
          player1: existingPlayerId,
          player2: newPlayerId,
          completed: false,
          result: null,
          player1Score: null,
          player2Score: null,
          isHome: true, // Second match is home for existing player
        });
      }
    }
    
    // Also generate matches between new players if there are multiple
    for (let i = 0; i < newPlayerIds.length; i++) {
      for (let j = i + 1; j < newPlayerIds.length; j++) {
        // Add two matches - one home and one away
        newSchedule.push({
          id: matchIdCounter++,
          player1: newPlayerIds[i],
          player2: newPlayerIds[j],
          completed: false,
          result: null,
          player1Score: null,
          player2Score: null,
          isHome: true,
        });
        
        newSchedule.push({
          id: matchIdCounter++,
          player1: newPlayerIds[j],
          player2: newPlayerIds[i],
          completed: false,
          result: null,
          player1Score: null,
          player2Score: null,
          isHome: true,
        });
      }
    }
    
    setSchedule(newSchedule);
    localStorage.setItem('beybladeSchedule', JSON.stringify(newSchedule));
    alert(`Added ${newSchedule.length - schedule.length} new matches for ${newPlayerIds.length} new player(s)`);
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

  // Add new function to calculate beyblade ratings
  const calculateBeybladeRatings = () => {
    const ratings = {};
    
    players.forEach(player => {
      // Calculate win rate
      const totalGames = player.gamesPlayed || 0;
      const winRate = totalGames > 0 ? (player.wins / totalGames) * 100 : 0;
      
      // Calculate attack rating based on goals scored
      const attackRating = Math.min(5, Math.round((player.gf || 0) / 2));
      
      // Calculate defense rating based on goals conceded (inverse)
      const defenseRating = Math.min(5, Math.round(5 - ((player.ga || 0) / 5)));
      
      // Calculate overall rating based on just attack and defense (removed stamina)
      const overallRating = Math.round((attackRating + defenseRating) / 2 * 10) / 10;
      
      ratings[player.id] = {
        winRate,
        attackRating,
        defenseRating,
        overallRating
      };
    });
    
    setBeybladeRatings(ratings);
  };
  
  const handleShowBeybladeDetails = (player) => {
    setSelectedBeyblade(player);
    setShowBeybladeDetails(true);
  };
  
  const handleCloseBeybladeDetails = () => {
    setShowBeybladeDetails(false);
  };

  const handleSaveCustomBeyblade = (beyblade) => {
    if (editingPlayer) {
      // Save customized beyblade to player
      const updatedPlayers = players.map(player => {
        if (player.id === editingPlayer.id) {
          return {
            ...player,
            customBeyblade: beyblade,
            image: beyblade.image // Use the beyblade image as player avatar
          };
        }
        return player;
      });
      setPlayers(updatedPlayers);
      localStorage.setItem('beybladePlayers', JSON.stringify(updatedPlayers));
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
                  <StyledTab label="Beyblade Stats" icon={<BarChartIcon />} />
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
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<RefreshIcon />}
                    onClick={calculateRankings}
                    size="small"
                    sx={{ minWidth: '100px' }}
                  >
                    Refresh
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DownloadIcon />}
                    onClick={handleExportData}
                    size="small"
                    sx={{ minWidth: '100px' }}
                  >
                    Export
                  </Button>
                  <Button
                    component="label"
                    variant="contained"
                    color="primary"
                    startIcon={<UploadIcon />}
                    size="small"
                    sx={{ minWidth: '100px' }}
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
                    size="small"
                  >
                    Reset All Stats & Schedule
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleOpenConfirmation('deleteAll')}
                    fullWidth={{ xs: true, sm: false }}
                    size="small"
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
                        
                        // If points are equal, sort by goal difference (GF - GA)
                        const aDiff = (a.gf || 0) - (a.ga || 0);
                        const bDiff = (b.gf || 0) - (b.ga || 0);
                        
                        return bDiff - aDiff;
                      })
                      .map((player, index) => {
                        const goalDiff = (player.gf || 0) - (player.ga || 0);
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
                              color: goalDiff > 0 ? 'success.main' : goalDiff < 0 ? 'error.main' : 'text.primary',
                              fontWeight: 'bold'
                            }}>
                              {goalDiff > 0 ? '+' : ''}{goalDiff}
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
                    Battle Arena will be held at <strong>Budapest</strong>
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
                  <StyledButton
                    variant="contained"
                    color="secondary"
                    startIcon={<RefreshIcon />}
                    onClick={() => handleOpenConfirmation('softReset')}
                    fullWidth={{ xs: true, sm: false }}
                  >
                    Soft Reset
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

            <TabPanel value={currentTab} index={2}>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                justifyContent="space-between" 
                alignItems={{ xs: 'stretch', sm: 'center' }} 
                spacing={2}
                mb={3}
              >
                <Typography variant="h5" component="h2" color="primary">
                  Beyblade Performance Analytics
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<RefreshIcon />}
                  onClick={calculateBeybladeRatings}
                  size="small"
                >
                  Refresh Stats
                </Button>
              </Stack>
              
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {players.map(player => (
                  <Grid item xs={12} sm={6} md={4} key={player.id}>
                    <StatCard>
                      <CardContent>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                          {player.image ? (
                            <PlayerImage 
                              src={player.image} 
                              alt={player.name}
                              sx={{ width: 60, height: 60 }}
                            />
                          ) : (
                            <EmojiEventsIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                          )}
                          <Box>
                            <Typography variant="h6" fontWeight="bold">
                              {player.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Games: {player.gamesPlayed || 0} • Points: {player.points || 0}
                            </Typography>
                            <BeybladeRating 
                              value={beybladeRatings[player.id]?.overallRating || 0}
                              precision={0.5}
                              readOnly
                              icon={<StarIcon fontSize="inherit" />}
                            />
                          </Box>
                        </Stack>
                        
                        <Divider sx={{ mb: 2 }} />
                        
                        <Stack spacing={2}>
                          <Box>
                            <Typography variant="body2" gutterBottom display="flex" justifyContent="space-between">
                              <span>Attack</span>
                              <span>{beybladeRatings[player.id]?.attackRating || 0}/5</span>
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={(beybladeRatings[player.id]?.attackRating || 0) * 20} 
                              color="error"
                              sx={{ height: 8, borderRadius: 5 }}
                            />
                          </Box>
                          
                          <Box>
                            <Typography variant="body2" gutterBottom display="flex" justifyContent="space-between">
                              <span>Defense</span>
                              <span>{beybladeRatings[player.id]?.defenseRating || 0}/5</span>
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={(beybladeRatings[player.id]?.defenseRating || 0) * 20} 
                              color="primary"
                              sx={{ height: 8, borderRadius: 5 }}
                            />
                          </Box>
                        </Stack>
                        
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => handleShowBeybladeDetails(player)}
                            startIcon={<BarChartIcon />}
                          >
                            Detailed Stats
                          </Button>
                        </Box>
                      </CardContent>
                    </StatCard>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  League Statistics Summary
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box textAlign="center">
                      <TrophyIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                      <StatValue>
                        {players.reduce((sum, player) => sum + (player.wins || 0), 0)}
                      </StatValue>
                      <Typography variant="body2" color="text.secondary">
                        Total Wins
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box textAlign="center">
                      <ScoreboardIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                      <StatValue>
                        {players.reduce((sum, player) => sum + (player.gf || 0), 0)}
                      </StatValue>
                      <Typography variant="body2" color="text.secondary">
                        Total Goals
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box textAlign="center">
                      <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                      <StatValue>
                        {players.length > 0 
                          ? (players.reduce((sum, player) => sum + (player.gamesPlayed || 0), 0) / players.length).toFixed(1) 
                          : 0}
                      </StatValue>
                      <Typography variant="body2" color="text.secondary">
                        Avg. Games Per Player
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box textAlign="center">
                      <StarIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                      <StatValue>
                        {players.length > 0 
                          ? (players.reduce((sum, player) => sum + (player.points || 0), 0) / players.length).toFixed(1) 
                          : 0}
                      </StatValue>
                      <Typography variant="body2" color="text.secondary">
                        Avg. Points Per Player
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              
              <RulesContainer>
                <RulesTitle variant="h4">Beyblade Performance Analysis Guide</RulesTitle>
                <RuleItem>
                  <RuleNumber>1</RuleNumber>
                  <RuleText>
                    <strong>Attack Rating</strong> is calculated based on the number of goals scored by the player's Beyblade
                  </RuleText>
                </RuleItem>
                <RuleItem>
                  <RuleNumber>2</RuleNumber>
                  <RuleText>
                    <strong>Defense Rating</strong> is determined by how few goals the player's Beyblade concedes
                  </RuleText>
                </RuleItem>
                <RuleItem>
                  <RuleNumber>3</RuleNumber>
                  <RuleText>
                    <strong>Overall Rating</strong> is the average of Attack and Defense ratings
                  </RuleText>
                </RuleItem>
              </RulesContainer>
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
                      : actionType === 'softReset'
                      ? 'This will generate matches only for new players without affecting existing match data. Continue?'
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
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle1" color="primary">
                      Customize Beyblade
                    </Typography>
                    <BeybladeCustomizer 
                      onSave={handleSaveCustomBeyblade} 
                      playerBeyblade={editingPlayer?.customBeyblade || null}
                    />
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

            {/* Add new dialog for Beyblade Details */}
            <Dialog 
              open={showBeybladeDetails} 
              onClose={handleCloseBeybladeDetails}
              maxWidth="md"
              fullWidth
            >
              {selectedBeyblade && (
                <>
                  <DialogTitle color="primary">
                    {selectedBeyblade.name} - Beyblade Performance Details
                  </DialogTitle>
                  <Divider />
                  <DialogContent>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center" sx={{ mb: 3 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        {selectedBeyblade.image ? (
                          <PlayerImage 
                            src={selectedBeyblade.image} 
                            alt={selectedBeyblade.name}
                            sx={{ width: 120, height: 120 }}
                          />
                        ) : (
                          <EmojiEventsIcon sx={{ fontSize: 120, color: 'primary.main' }} />
                        )}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                          {selectedBeyblade.name}
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Games Played</Typography>
                            <Typography variant="h6">{selectedBeyblade.gamesPlayed || 0}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Win Rate</Typography>
                            <Typography variant="h6">{
                              selectedBeyblade.gamesPlayed 
                                ? Math.round((selectedBeyblade.wins / selectedBeyblade.gamesPlayed) * 100) 
                                : 0
                            }%</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Total Points</Typography>
                            <Typography variant="h6">{selectedBeyblade.points || 0}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Home Win Rate</Typography>
                            <Typography variant="h6">{
                              schedule.filter(match => match.player1 === selectedBeyblade.id && match.completed).length > 0
                                ? Math.round((schedule.filter(match => 
                                    match.player1 === selectedBeyblade.id && 
                                    match.completed && 
                                    match.result === 'win'
                                  ).length / 
                                  schedule.filter(match => 
                                    match.player1 === selectedBeyblade.id && 
                                    match.completed
                                  ).length) * 100)
                                : 0
                            }%</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Away Win Rate</Typography>
                            <Typography variant="h6">{
                              schedule.filter(match => match.player2 === selectedBeyblade.id && match.completed).length > 0
                                ? Math.round((schedule.filter(match => 
                                    match.player2 === selectedBeyblade.id && 
                                    match.completed && 
                                    match.result !== 'win' &&
                                    match.result !== 'draw'
                                  ).length / 
                                  schedule.filter(match => 
                                    match.player2 === selectedBeyblade.id && 
                                    match.completed
                                  ).length) * 100)
                                : 0
                            }%</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Goal Difference</Typography>
                            <Typography variant="h6" color={
                              (selectedBeyblade.gf || 0) - (selectedBeyblade.ga || 0) > 0 
                                ? 'success.main' 
                                : (selectedBeyblade.gf || 0) - (selectedBeyblade.ga || 0) < 0 
                                  ? 'error.main' 
                                  : 'text.primary'
                            }>
                              {(selectedBeyblade.gf || 0) - (selectedBeyblade.ga || 0) > 0 ? '+' : ''}
                              {(selectedBeyblade.gf || 0) - (selectedBeyblade.ga || 0)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Stack>

                    <Divider sx={{ mb: 3 }} />
                    
                    <Typography variant="h6" gutterBottom color="primary">
                      Performance Breakdown
                    </Typography>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body2" gutterBottom>
                            Attack Rating ({beybladeRatings[selectedBeyblade.id]?.attackRating || 0}/5)
                          </Typography>
                          <BeybladeRating 
                            value={beybladeRatings[selectedBeyblade.id]?.attackRating || 0}
                            readOnly
                            icon={<StarIcon fontSize="inherit" />}
                            emptyIcon={<StarIcon fontSize="inherit" />}
                          />
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Goals Scored: {selectedBeyblade.gf || 0}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body2" gutterBottom>
                            Defense Rating ({beybladeRatings[selectedBeyblade.id]?.defenseRating || 0}/5)
                          </Typography>
                          <BeybladeRating 
                            value={beybladeRatings[selectedBeyblade.id]?.defenseRating || 0}
                            readOnly
                            icon={<StarIcon fontSize="inherit" />}
                            emptyIcon={<StarIcon fontSize="inherit" />}
                          />
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Goals Conceded: {selectedBeyblade.ga || 0}
                          </Typography>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                              Match Outcomes
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Box sx={{ textAlign: 'center', flex: 1 }}>
                                <Typography variant="h4" color="success.main">{selectedBeyblade.wins || 0}</Typography>
                                <Typography variant="body2" color="text.secondary">Wins</Typography>
                              </Box>
                              <Box sx={{ textAlign: 'center', flex: 1 }}>
                                <Typography variant="h4" color="info.main">{selectedBeyblade.draws || 0}</Typography>
                                <Typography variant="body2" color="text.secondary">Draws</Typography>
                              </Box>
                              <Box sx={{ textAlign: 'center', flex: 1 }}>
                                <Typography variant="h4" color="error.main">{selectedBeyblade.losses || 0}</Typography>
                                <Typography variant="body2" color="text.secondary">Losses</Typography>
                              </Box>
                            </Box>
                          </Box>
                          
                          <Box sx={{ mt: 4, border: 1, borderColor: 'divider', p: 2, borderRadius: 1 }}>
                            <Typography variant="body1" fontWeight="bold" gutterBottom>
                              Beyblade Performance Score
                            </Typography>
                            <CircularProgress 
                              variant="determinate" 
                              value={(beybladeRatings[selectedBeyblade.id]?.overallRating || 0) * 20} 
                              size={100}
                              thickness={5}
                              sx={{ display: 'block', margin: '0 auto' }}
                            />
                            <Typography variant="h4" align="center" sx={{ mt: 2 }} color="primary">
                              {beybladeRatings[selectedBeyblade.id]?.overallRating || 0}/5
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <Divider />
                  <DialogActions>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={handleCloseBeybladeDetails}
                    >
                      Close
                    </Button>
                  </DialogActions>
                </>
              )}
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
