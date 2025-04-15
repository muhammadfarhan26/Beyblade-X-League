import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';

const AddPlayer = () => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    const newPlayer = {
      id: Date.now(),
      name: playerName.trim(),
      wins: 0,
      losses: 0,
      draws: 0,
      points: 0,
      gf: 0,  // Goals For
      ga: 0,  // Goals Against
      gamesPlayed: 0,
    };

    const existingPlayers = JSON.parse(localStorage.getItem('beybladePlayers')) || [];
    const updatedPlayers = [...existingPlayers, newPlayer];
    localStorage.setItem('beybladePlayers', JSON.stringify(updatedPlayers));
    setPlayerName('');
    window.location.reload();
  };

};

export default AddPlayer; 