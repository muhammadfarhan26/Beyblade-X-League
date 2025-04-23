import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper, 
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { styled } from '@mui/material/styles';

// Use a simple signaling mechanism with Firebase or other service
// For demo purposes, we're using mock functions
const mockSignalingConnect = (id) => {
  console.log("Connecting to signaling server with ID:", id);
  return Promise.resolve();
};

const mockSendSignal = (signal) => {
  console.log("Sending signal:", signal);
  return Promise.resolve();
};

// Styled components
const VideoPreview = styled('video')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  transform: 'scaleX(-1)', // Mirror the video
}));

const ControlButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  margin: theme.spacing(1),
  padding: theme.spacing(1.5),
}));

const MobileStreamPage = () => {
  const [streamId, setStreamId] = useState('');
  const [loading, setLoading] = useState(true);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');
  const [cameraFacing, setCameraFacing] = useState('user'); // 'user' or 'environment'
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // 'disconnected', 'connecting', 'connected'
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const peerConnectionRef = useRef(null);
  
  // Parse stream ID from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    if (id) {
      setStreamId(id);
      setLoading(false);
    } else {
      setError('Invalid stream ID. Please scan the QR code again.');
      setLoading(false);
    }
  }, []);
  
  // Setup WebRTC connection
  const setupWebRTC = async () => {
    try {
      setConnectionStatus('connecting');
      
      // Get user media (camera)
      const constraints = {
        video: { facingMode: cameraFacing },
        audio: audioEnabled
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Create and configure RTCPeerConnection
      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      };
      
      const peerConnection = new RTCPeerConnection(configuration);
      peerConnectionRef.current = peerConnection;
      
      // Add tracks to the peer connection
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });
      
      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          // In a real app, send this to the signaling server
          mockSendSignal({
            type: 'ice-candidate',
            candidate: event.candidate,
            streamId
          });
        }
      };
      
      peerConnection.onconnectionstatechange = () => {
        console.log("Connection state:", peerConnection.connectionState);
        if (peerConnection.connectionState === 'connected') {
          setConnectionStatus('connected');
        } else if (peerConnection.connectionState === 'disconnected' || 
                   peerConnection.connectionState === 'failed') {
          setConnectionStatus('disconnected');
        }
      };
      
      // Create offer to start the stream
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      
      // In a real app, send this offer to the signaling server
      await mockSendSignal({
        type: 'offer',
        offer: peerConnection.localDescription,
        streamId
      });
      
      setStreaming(true);
      
    } catch (err) {
      console.error('Error setting up WebRTC:', err);
      setError(`Couldn't access camera: ${err.message}`);
    }
  };
  
  // Switch camera between front and back
  const switchCamera = async () => {
    if (streamRef.current) {
      // Stop all tracks in the current stream
      streamRef.current.getTracks().forEach(track => track.stop());
      
      // Toggle camera facing mode
      const newFacingMode = cameraFacing === 'user' ? 'environment' : 'user';
      setCameraFacing(newFacingMode);
      
      try {
        // Get new stream with the opposite camera
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: newFacingMode },
          audio: audioEnabled
        });
        
        streamRef.current = newStream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
        
        // Replace tracks in the peer connection
        if (peerConnectionRef.current) {
          const videoTrack = newStream.getVideoTracks()[0];
          
          const senders = peerConnectionRef.current.getSenders();
          const videoSender = senders.find(sender => 
            sender.track && sender.track.kind === 'video'
          );
          
          if (videoSender) {
            videoSender.replaceTrack(videoTrack);
          }
        }
      } catch (err) {
        console.error('Error switching camera:', err);
        setError(`Couldn't switch camera: ${err.message}`);
      }
    }
  };
  
  // Toggle audio
  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !audioEnabled;
      });
      setAudioEnabled(!audioEnabled);
    }
  };
  
  // Start streaming
  const startStream = () => {
    // Check if the browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Your browser does not support camera access. Please try using Chrome, Firefox, or Safari.');
      return;
    }

    // Check for secure context (HTTPS)
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      setError('Camera access requires a secure connection (HTTPS). Please use the HTTPS version of this site.');
      return;
    }

    // iOS specific handling - encourage user interaction first
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      // Set more permissive constraints for iOS
      const iosConstraints = {
        audio: audioEnabled,
        video: {
          facingMode: cameraFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };
      
      // Connect to signaling server first
      mockSignalingConnect(streamId)
        .then(() => {
          return navigator.mediaDevices.getUserMedia(iosConstraints)
            .then(stream => {
              streamRef.current = stream;
              
              if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play()
                  .then(() => {
                    console.log('Video playback started successfully');
                    setStreaming(true);
                    setupWebRTCConnection(stream);
                  })
                  .catch(err => {
                    console.error('Video playback failed:', err);
                    setError(`Couldn't start video playback: ${err.message}. Try tapping the screen again.`);
                  });
              }
            })
            .catch(err => {
              console.error('Error getting user media on iOS:', err);
              setError(`Could not access camera: ${err.message}. Make sure to allow camera access in your browser settings.`);
            });
        })
        .catch(err => {
          console.error('Signaling error:', err);
          setError('Failed to connect to streaming server');
        });
    } else {
      // Non-iOS handling (original code)
      mockSignalingConnect(streamId)
        .then(() => setupWebRTC())
        .catch(err => {
          console.error('Signaling error:', err);
          setError('Failed to connect to streaming server');
        });
    }
  };
  
  // Setup WebRTC connection with an existing stream (for iOS)
  const setupWebRTCConnection = (stream) => {
    try {
      setConnectionStatus('connecting');
      
      // Create and configure RTCPeerConnection
      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      };
      
      const peerConnection = new RTCPeerConnection(configuration);
      peerConnectionRef.current = peerConnection;
      
      // Add tracks to the peer connection
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });
      
      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          // In a real app, send this to the signaling server
          mockSendSignal({
            type: 'ice-candidate',
            candidate: event.candidate,
            streamId
          });
        }
      };
      
      peerConnection.onconnectionstatechange = () => {
        console.log("Connection state:", peerConnection.connectionState);
        if (peerConnection.connectionState === 'connected') {
          setConnectionStatus('connected');
        } else if (peerConnection.connectionState === 'disconnected' || 
                   peerConnection.connectionState === 'failed') {
          setConnectionStatus('disconnected');
        }
      };
      
      // Create offer to start the stream
      peerConnection.createOffer()
        .then(offer => peerConnection.setLocalDescription(offer))
        .then(() => {
          // In a real app, send this offer to the signaling server
          mockSendSignal({
            type: 'offer',
            offer: peerConnection.localDescription,
            streamId
          });
        })
        .catch(err => {
          console.error('Error creating offer:', err);
          setError(`Couldn't create connection offer: ${err.message}`);
        });
      
    } catch (err) {
      console.error('Error setting up WebRTC connection:', err);
      setError(`Connection error: ${err.message}`);
    }
  };
  
  // Stop streaming
  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    
    setStreaming(false);
  };
  
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => window.close()} 
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Beyblade X League - Live Stream
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="sm" sx={{ py: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="error" gutterBottom>
              {error}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => window.location.reload()}
              sx={{ mt: 2 }}
            >
              Try Again
            </Button>
          </Paper>
        ) : (
          <>
            <Card sx={{ mb: 3 }}>
              <Box 
                sx={{ 
                  position: 'relative', 
                  bgcolor: 'black',
                  borderRadius: '4px 4px 0 0',
                  height: '60vh',
                  overflow: 'hidden'
                }}
              >
                {streaming ? (
                  <VideoPreview 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted
                  />
                ) : (
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center', 
                      justifyContent: 'center',
                      height: '100%',
                      color: 'white'
                    }}
                  >
                    <VideocamOffIcon sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" align="center">
                      Camera preview will appear here
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ mt: 1, opacity: 0.7 }}>
                      Press the button below to start streaming
                    </Typography>
                    {/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && (
                      <Typography variant="body2" align="center" sx={{ mt: 2, color: 'yellow' }}>
                        iOS users: Tap the button below and allow camera access when prompted
                      </Typography>
                    )}
                  </Box>
                )}
                
                {connectionStatus === 'connected' && (
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 16, 
                      right: 16, 
                      bgcolor: 'success.main',
                      color: 'white',
                      borderRadius: 5,
                      px: 1.5,
                      py: 0.5,
                    }}
                  >
                    <Typography variant="caption" fontWeight="bold">
                      LIVE
                    </Typography>
                  </Box>
                )}
                
                {connectionStatus === 'connecting' && (
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 16, 
                      right: 16, 
                      bgcolor: 'warning.main',
                      color: 'white',
                      borderRadius: 5,
                      px: 1.5,
                      py: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <CircularProgress size={14} thickness={6} color="inherit" />
                    <Typography variant="caption" fontWeight="bold">
                      CONNECTING
                    </Typography>
                  </Box>
                )}
              </Box>
              
              <CardContent sx={{ bgcolor: 'background.paper' }}>
                <Stack 
                  direction="row" 
                  spacing={1} 
                  justifyContent="center"
                  sx={{ mt: 1 }}
                >
                  {streaming ? (
                    <>
                      <ControlButton onClick={toggleAudio} color="primary">
                        {audioEnabled ? <MicIcon /> : <MicOffIcon />}
                      </ControlButton>
                      
                      <ControlButton onClick={switchCamera} color="primary">
                        <FlipCameraAndroidIcon />
                      </ControlButton>
                      
                      <ControlButton onClick={stopStream} color="error">
                        <VideocamOffIcon />
                      </ControlButton>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<VideocamIcon />}
                      onClick={startStream}
                      size="large"
                      fullWidth
                      sx={{ 
                        py: 2, 
                        fontSize: '1.1rem',
                        ...((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) && {
                          backgroundColor: 'success.main',
                          '&:hover': { backgroundColor: 'success.dark' }
                        })
                      }}
                    >
                      Start Streaming
                    </Button>
                  )}
                </Stack>
                
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Stream ID: <code>{streamId}</code>
                </Typography>
              </CardContent>
            </Card>
            
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Instructions
              </Typography>
              <Typography variant="body2" paragraph>
                1. Press the "Start Streaming" button to begin sharing your camera.
              </Typography>
              <Typography variant="body2" paragraph>
                2. Position your phone to show the Beyblade battle.
              </Typography>
              <Typography variant="body2" paragraph>
                3. Use the camera flip button to switch between front and back cameras.
              </Typography>
              <Typography variant="body2" paragraph>
                4. Your stream will automatically appear on the main screen.
              </Typography>
              <Typography variant="body2" color="error">
                Note: For best performance, keep this page open and your phone connected to WiFi.
              </Typography>
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
};

export default MobileStreamPage; 