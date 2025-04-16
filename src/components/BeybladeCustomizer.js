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
  Grid,
  IconButton,
  Paper,
  Slider,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ColorizeIcon from '@mui/icons-material/Colorize';
import BuildIcon from '@mui/icons-material/Build';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

// Sample data for Beyblade parts
const BEYBLADE_PARTS = {
  blades: [
    { id: 'b1', name: 'Vortex Blade', attack: 80, defense: 40, stamina: 60, image: 'https://via.placeholder.com/100?text=Vortex' },
    { id: 'b2', name: 'Shield Blade', attack: 40, defense: 90, stamina: 50, image: 'https://via.placeholder.com/100?text=Shield' },
    { id: 'b3', name: 'Endurance Blade', attack: 50, defense: 50, stamina: 80, image: 'https://via.placeholder.com/100?text=Endurance' },
  ],
  discs: [
    { id: 'd1', name: 'Heavy Disc', attack: 40, defense: 70, stamina: 50, image: 'https://via.placeholder.com/100?text=Heavy' },
    { id: 'd2', name: 'Agile Disc', attack: 60, defense: 40, stamina: 70, image: 'https://via.placeholder.com/100?text=Agile' },
    { id: 'd3', name: 'Balanced Disc', attack: 55, defense: 55, stamina: 55, image: 'https://via.placeholder.com/100?text=Balanced' },
  ],
  drivers: [
    { id: 'dr1', name: 'Attack Driver', attack: 80, defense: 30, stamina: 40, image: 'https://via.placeholder.com/100?text=Attack' },
    { id: 'dr2', name: 'Defense Driver', attack: 30, defense: 80, stamina: 50, image: 'https://via.placeholder.com/100?text=Defense' },
    { id: 'dr3', name: 'Stamina Driver', attack: 30, defense: 40, stamina: 90, image: 'https://via.placeholder.com/100?text=Stamina' },
  ],
};

// Styled components
const PartCard = styled(Card)(({ theme, selected }) => ({
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  border: selected ? `2px solid ${theme.palette.primary.main}` : 'none',
  boxShadow: selected ? `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}` : theme.shadows[1],
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const PartImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  aspectRatio: '1/1',
  objectFit: 'cover',
}));

const StatBar = styled(Box)(({ theme, value, color }) => ({
  position: 'relative',
  height: '8px',
  width: '100%',
  backgroundColor: alpha(theme.palette.grey[300], 0.5),
  borderRadius: '4px',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: `${value}%`,
    backgroundColor: color || theme.palette.primary.main,
    borderRadius: '4px',
  },
}));

const BeybladePreview = styled(Box)(({ theme }) => ({
  width: '200px',
  height: '200px',
  margin: '0 auto',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const PreviewLayer = styled('img')(({ theme, zIndex }) => ({
  position: 'absolute',
  width: '80%',
  height: '80%',
  objectFit: 'contain',
  zIndex: zIndex || 1,
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`beyblade-tabpanel-${index}`}
      aria-labelledby={`beyblade-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
};

const BeybladeCustomizer = ({ onSave, playerBeyblade }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [beybladeName, setBeybladeName] = useState('');
  const [selectedBlade, setSelectedBlade] = useState(null);
  const [selectedDisc, setSelectedDisc] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [customColor, setCustomColor] = useState('#1976d2');
  
  useEffect(() => {
    // Initialize with player's current Beyblade if available
    if (playerBeyblade) {
      setBeybladeName(playerBeyblade.name || 'My Beyblade');
      setSelectedBlade(
        BEYBLADE_PARTS.blades.find(b => b.id === playerBeyblade.bladeId) || BEYBLADE_PARTS.blades[0]
      );
      setSelectedDisc(
        BEYBLADE_PARTS.discs.find(d => d.id === playerBeyblade.discId) || BEYBLADE_PARTS.discs[0]
      );
      setSelectedDriver(
        BEYBLADE_PARTS.drivers.find(d => d.id === playerBeyblade.driverId) || BEYBLADE_PARTS.drivers[0]
      );
      setCustomColor(playerBeyblade.color || '#1976d2');
    } else {
      // Default selections
      setBeybladeName('My Beyblade');
      setSelectedBlade(BEYBLADE_PARTS.blades[0]);
      setSelectedDisc(BEYBLADE_PARTS.discs[0]);
      setSelectedDriver(BEYBLADE_PARTS.drivers[0]);
    }
  }, [playerBeyblade]);
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const calculateTotalStats = () => {
    if (!selectedBlade || !selectedDisc || !selectedDriver) {
      return { attack: 0, defense: 0, stamina: 0 };
    }
    
    return {
      attack: Math.round((selectedBlade.attack + selectedDisc.attack + selectedDriver.attack) / 3),
      defense: Math.round((selectedBlade.defense + selectedDisc.defense + selectedDriver.defense) / 3),
      stamina: Math.round((selectedBlade.stamina + selectedDisc.stamina + selectedDriver.stamina) / 3),
    };
  };
  
  const handleSave = () => {
    if (!selectedBlade || !selectedDisc || !selectedDriver) {
      return;
    }
    
    const newBeyblade = {
      name: beybladeName || 'My Beyblade',
      bladeId: selectedBlade.id,
      discId: selectedDisc.id,
      driverId: selectedDriver.id,
      color: customColor,
      stats: calculateTotalStats(),
      // Create a composite image (in a real app, you'd generate this)
      image: selectedBlade.image
    };
    
    if (onSave) {
      onSave(newBeyblade);
    }
    
    handleClose();
  };
  
  const totalStats = calculateTotalStats();
  
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<BuildIcon />}
        onClick={handleOpen}
        fullWidth
      >
        Customize Beyblade
      </Button>
      
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Beyblade Customizer
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        
        <DialogContent>
          <Grid container spacing={3}>
            {/* Left side - Beyblade preview and stats */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom align="center">
                  Preview
                </Typography>
                
                <BeybladePreview>
                  {selectedDriver && (
                    <PreviewLayer 
                      src={selectedDriver.image} 
                      alt={selectedDriver.name} 
                      zIndex={1}
                      sx={{ filter: `drop-shadow(0 0 5px ${customColor})` }}
                    />
                  )}
                  {selectedDisc && (
                    <PreviewLayer 
                      src={selectedDisc.image} 
                      alt={selectedDisc.name} 
                      zIndex={2}
                      sx={{ filter: `drop-shadow(0 0 5px ${customColor})` }}
                    />
                  )}
                  {selectedBlade && (
                    <PreviewLayer 
                      src={selectedBlade.image} 
                      alt={selectedBlade.name} 
                      zIndex={3}
                      sx={{ filter: `drop-shadow(0 0 5px ${customColor})` }}
                    />
                  )}
                </BeybladePreview>
                
                <TextField
                  label="Beyblade Name"
                  variant="outlined"
                  fullWidth
                  value={beybladeName}
                  onChange={(e) => setBeybladeName(e.target.value)}
                  margin="normal"
                />
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Color Accent
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      style={{ width: '40px', height: '40px', border: 'none' }}
                    />
                    <Typography variant="body2">
                      {customColor}
                    </Typography>
                  </Stack>
                </Box>
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Total Stats
                  </Typography>
                  
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" gutterBottom display="flex" justifyContent="space-between">
                        <span>Attack</span>
                        <span>{totalStats.attack}/100</span>
                      </Typography>
                      <StatBar value={totalStats.attack} color={theme.palette.error.main} />
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" gutterBottom display="flex" justifyContent="space-between">
                        <span>Defense</span>
                        <span>{totalStats.defense}/100</span>
                      </Typography>
                      <StatBar value={totalStats.defense} color={theme.palette.primary.main} />
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" gutterBottom display="flex" justifyContent="space-between">
                        <span>Stamina</span>
                        <span>{totalStats.stamina}/100</span>
                      </Typography>
                      <StatBar value={totalStats.stamina} color={theme.palette.success.main} />
                    </Box>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
            
            {/* Right side - Parts selection */}
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                  <Tabs 
                    value={tabValue} 
                    onChange={handleChangeTab} 
                    variant="fullWidth"
                  >
                    <Tab label="Blades" />
                    <Tab label="Discs" />
                    <Tab label="Drivers" />
                  </Tabs>
                </Box>
                
                <TabPanel value={tabValue} index={0}>
                  <Typography variant="subtitle1" gutterBottom>
                    Select a Blade
                  </Typography>
                  <Grid container spacing={2}>
                    {BEYBLADE_PARTS.blades.map((blade) => (
                      <Grid item xs={6} sm={4} key={blade.id}>
                        <PartCard 
                          onClick={() => setSelectedBlade(blade)}
                          selected={selectedBlade && selectedBlade.id === blade.id}
                        >
                          <CardContent>
                            <PartImage src={blade.image} alt={blade.name} />
                            <Typography variant="subtitle2" align="center" gutterBottom>
                              {blade.name}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
                                <Typography variant="caption" sx={{ width: 60 }}>
                                  Attack:
                                </Typography>
                                <StatBar value={blade.attack} color={theme.palette.error.main} />
                              </Stack>
                              <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
                                <Typography variant="caption" sx={{ width: 60 }}>
                                  Defense:
                                </Typography>
                                <StatBar value={blade.defense} color={theme.palette.primary.main} />
                              </Stack>
                              <Stack direction="row" spacing={1}>
                                <Typography variant="caption" sx={{ width: 60 }}>
                                  Stamina:
                                </Typography>
                                <StatBar value={blade.stamina} color={theme.palette.success.main} />
                              </Stack>
                            </Box>
                          </CardContent>
                        </PartCard>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>
                
                <TabPanel value={tabValue} index={1}>
                  <Typography variant="subtitle1" gutterBottom>
                    Select a Disc
                  </Typography>
                  <Grid container spacing={2}>
                    {BEYBLADE_PARTS.discs.map((disc) => (
                      <Grid item xs={6} sm={4} key={disc.id}>
                        <PartCard 
                          onClick={() => setSelectedDisc(disc)}
                          selected={selectedDisc && selectedDisc.id === disc.id}
                        >
                          <CardContent>
                            <PartImage src={disc.image} alt={disc.name} />
                            <Typography variant="subtitle2" align="center" gutterBottom>
                              {disc.name}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
                                <Typography variant="caption" sx={{ width: 60 }}>
                                  Attack:
                                </Typography>
                                <StatBar value={disc.attack} color={theme.palette.error.main} />
                              </Stack>
                              <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
                                <Typography variant="caption" sx={{ width: 60 }}>
                                  Defense:
                                </Typography>
                                <StatBar value={disc.defense} color={theme.palette.primary.main} />
                              </Stack>
                              <Stack direction="row" spacing={1}>
                                <Typography variant="caption" sx={{ width: 60 }}>
                                  Stamina:
                                </Typography>
                                <StatBar value={disc.stamina} color={theme.palette.success.main} />
                              </Stack>
                            </Box>
                          </CardContent>
                        </PartCard>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>
                
                <TabPanel value={tabValue} index={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Select a Driver
                  </Typography>
                  <Grid container spacing={2}>
                    {BEYBLADE_PARTS.drivers.map((driver) => (
                      <Grid item xs={6} sm={4} key={driver.id}>
                        <PartCard 
                          onClick={() => setSelectedDriver(driver)}
                          selected={selectedDriver && selectedDriver.id === driver.id}
                        >
                          <CardContent>
                            <PartImage src={driver.image} alt={driver.name} />
                            <Typography variant="subtitle2" align="center" gutterBottom>
                              {driver.name}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
                                <Typography variant="caption" sx={{ width: 60 }}>
                                  Attack:
                                </Typography>
                                <StatBar value={driver.attack} color={theme.palette.error.main} />
                              </Stack>
                              <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
                                <Typography variant="caption" sx={{ width: 60 }}>
                                  Defense:
                                </Typography>
                                <StatBar value={driver.defense} color={theme.palette.primary.main} />
                              </Stack>
                              <Stack direction="row" spacing={1}>
                                <Typography variant="caption" sx={{ width: 60 }}>
                                  Stamina:
                                </Typography>
                                <StatBar value={driver.stamina} color={theme.palette.success.main} />
                              </Stack>
                            </Box>
                          </CardContent>
                        </PartCard>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={!selectedBlade || !selectedDisc || !selectedDriver}
          >
            Save Beyblade
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BeybladeCustomizer; 