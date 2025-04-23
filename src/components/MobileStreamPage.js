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
  Stack,
  Switch
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
  const [audioEnabled, setAudioEnabled] = useState(false); // Start with audio disabled for better performance
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // 'disconnected', 'connecting', 'connected'
  const [lightweightMode, setLightweightMode] = useState(true); // Default to lightweight mode
  const [emergencyMode, setEmergencyMode] = useState(false); // Ultra-minimal mode for problematic devices
  
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
      // Set more optimized constraints for iOS - lower resolution to reduce processing overhead
      const iosConstraints = {
        audio: false, // Disable audio initially to reduce resource usage
        video: {
          facingMode: cameraFacing,
          width: { ideal: 640 }, // Lower resolution
          height: { ideal: 480 }, // Lower resolution
          frameRate: { max: 15 } // Lower frame rate to reduce CPU usage
        }
      };
      
      // Connect to signaling server first
      mockSignalingConnect(streamId)
        .then(() => {
          // Set loading state to show user something is happening
          setConnectionStatus('connecting');
          
          // Add timeout for slow connections
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Camera access timed out. Please try again.')), 10000);
          });
          
          // Race between getUserMedia and timeout
          return Promise.race([
            navigator.mediaDevices.getUserMedia(iosConstraints),
            timeoutPromise
          ])
            .then(stream => {
              streamRef.current = stream;
              
              if (videoRef.current) {
                // Set important attributes for smoother playback
                videoRef.current.playsInline = true;
                videoRef.current.muted = true;
                videoRef.current.autoplay = true;
                videoRef.current.srcObject = stream;
                
                // Try to play with timeout and better error handling
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                  playPromise
                    .then(() => {
                      console.log('Video playback started successfully');
                      setStreaming(true);
                      
                      // Only setup WebRTC after successful video display
                      setTimeout(() => {
                        setupWebRTCConnectionLite(stream);
                      }, 1000); // Small delay to let video stabilize
                    })
                    .catch(err => {
                      console.error('Video playback failed:', err);
                      setError(`Video playback failed: ${err.message}. Try tapping the screen or reload the page.`);
                    });
                }
              }
            })
            .catch(err => {
              console.error('Error getting user media on iOS:', err);
              setError(`Camera access failed: ${err.message}. Please check camera permissions in your browser settings.`);
            });
        })
        .catch(err => {
          console.error('Connection error:', err);
          setError('Failed to establish connection. Please try again.');
        });
    } else {
      // Non-iOS handling with optimized constraints
      const constraints = {
        audio: false, // Disable audio initially
        video: {
          facingMode: cameraFacing,
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { max: 20 }
        }
      };
      
      mockSignalingConnect(streamId)
        .then(() => {
          setConnectionStatus('connecting');
          return navigator.mediaDevices.getUserMedia(constraints);
        })
        .then(stream => {
          streamRef.current = stream;
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play()
              .then(() => {
                setStreaming(true);
                setupWebRTCConnectionLite(stream);
              })
              .catch(err => {
                setError(`Video playback failed: ${err.message}`);
              });
          }
        })
        .catch(err => {
          console.error('Streaming error:', err);
          setError(`Streaming failed: ${err.message}`);
        });
    }
  };
  
  // Lightweight WebRTC connection setup - optimized for mobile
  const setupWebRTCConnectionLite = (stream) => {
    try {
      // Create a minimalist configuration
      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' }
        ],
        // Adding performance constraints
        iceTransportPolicy: 'all',
        bundlePolicy: 'max-bundle',
        rtcpMuxPolicy: 'require',
        sdpSemantics: 'unified-plan'
      };
      
      const peerConnection = new RTCPeerConnection(configuration);
      peerConnectionRef.current = peerConnection;
      
      // Add only video track to reduce overhead
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        peerConnection.addTrack(videoTrack, stream);
      }
      
      // Only enable audio later if explicitly requested
      if (audioEnabled) {
        const audioTrack = stream.getAudioTracks()[0];
        if (audioTrack) {
          peerConnection.addTrack(audioTrack, stream);
        }
      }
      
      // Simplified ICE handling
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          mockSendSignal({
            type: 'ice-candidate',
            candidate: event.candidate,
            streamId
          });
        }
      };
      
      // More robust connection monitoring
      peerConnection.onconnectionstatechange = () => {
        console.log("Connection state:", peerConnection.connectionState);
        if (peerConnection.connectionState === 'connected') {
          setConnectionStatus('connected');
        } else if (peerConnection.connectionState === 'disconnected' || 
                   peerConnection.connectionState === 'failed') {
          setConnectionStatus('disconnected');
          setError('Connection lost. Please try restarting the stream.');
        }
      };
      
      // Create offer with constraints for faster connection
      peerConnection.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: true,
        voiceActivityDetection: false,
        iceRestart: false
      })
      .then(offer => {
        // Modify SDP to use lower bitrate for mobile
        let sdp = offer.sdp;
        
        // Limit video bitrate to 250kbps for mobile
        sdp = sdp.replace(
          /a=mid:0\r\n/g,
          'a=mid:0\r\nb=AS:250\r\n'
        );
        
        const modifiedOffer = new RTCSessionDescription({
          type: offer.type,
          sdp: sdp
        });
        
        return peerConnection.setLocalDescription(modifiedOffer);
      })
      .then(() => {
        mockSendSignal({
          type: 'offer',
          offer: peerConnection.localDescription,
          streamId
        });
      })
      .catch(err => {
        console.error('Error creating connection:', err);
        setError(`Connection error: ${err.message}. Try restarting the app.`);
      });
      
    } catch (err) {
      console.error('WebRTC setup error:', err);
      setError(`Setup error: ${err.message}`);
    }
  };
  
  // Emergency mode - ultra minimal camera access
  const startEmergencyStream = () => {
    setError(''); // Clear any previous errors
    
    try {
      // Absolute minimal constraints
      const minimalConstraints = {
        audio: false,
        video: {
          width: { ideal: 320 },
          height: { ideal: 240 },
          frameRate: { max: 10 }
        }
      };
      
      // Set status first to show something is happening
      setConnectionStatus('connecting');
      
      // Direct camera access - no WebRTC
      navigator.mediaDevices.getUserMedia(minimalConstraints)
        .then(stream => {
          // Store the stream
          streamRef.current = stream;
          
          // Set up video element with minimal properties
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.setAttribute('playsinline', true);
            videoRef.current.setAttribute('muted', true);
            videoRef.current.muted = true; // Double ensure muting
            
            // Play video
            videoRef.current.play()
              .then(() => {
                setStreaming(true);
                setConnectionStatus('connected');
                
                // Skip WebRTC entirely in emergency mode
                // Just send a message that we're streaming locally
                console.log('Emergency mode: Local camera only, no WebRTC');
                
                // Notify the user
                alert('Emergency mode active: Your camera is working locally but not streaming remotely. Show your phone screen to others.');
              })
              .catch(playErr => {
                console.error('Video play failed in emergency mode:', playErr);
                setError(`Unable to play video in emergency mode. Try tapping the screen.`);
              });
          }
        })
        .catch(err => {
          console.error('Emergency mode camera access failed:', err);
          setError(`Emergency mode failed: ${err.message}. Your device may not support camera access in the browser.`);
        });
    } catch (err) {
      console.error('General error in emergency mode:', err);
      setError('Emergency mode failed to start. Please try a different device or browser.');
    }
  };
  
  // Enhanced stop function for all modes
  const stopStream = () => {
    // Clean up video element first
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
    
    // Then clean up media streams
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    
    // Finally close peer connection if it exists
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    
    setStreaming(false);
    setConnectionStatus('disconnected');
  };
  
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      // Simplify background for better performance
      backgroundImage: 'none'
    }}>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => window.close()} 
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {emergencyMode ? "Camera (Emergency Mode)" : "Beyblade X League - Stream"}
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="sm" sx={{ py: 2, px: 1 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress size={30} />
          </Box>
        ) : error ? (
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1" color="error" gutterBottom>
              {error}
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => window.location.reload()}
                size="small"
              >
                Try Again
              </Button>
              {!emergencyMode && (
                <Button 
                  variant="outlined" 
                  color="warning" 
                  onClick={() => {
                    setEmergencyMode(true);
                    setError('');
                  }}
                  size="small"
                >
                  Try Emergency Mode
                </Button>
              )}
            </Stack>
          </Paper>
        ) : (
          <>
            <Card sx={{ mb: 2, boxShadow: 1 }}>
              <Box 
                sx={{ 
                  position: 'relative', 
                  bgcolor: 'black',
                  borderRadius: '4px 4px 0 0',
                  height: emergencyMode ? '40vh' : '50vh', // Even lower height in emergency mode
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
                    <VideocamOffIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1" align="center">
                      Camera preview will appear here
                    </Typography>
                    {/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && (
                      <Typography variant="body2" align="center" sx={{ mt: 1, color: 'yellow' }}>
                        iOS users: Tap the button below and allow camera access when prompted
                      </Typography>
                    )}
                    {emergencyMode && (
                      <Typography variant="body2" align="center" sx={{ mt: 1, color: 'orange' }}>
                        Emergency Mode: Limited functionality, local camera only
                      </Typography>
                    )}
                  </Box>
                )}
                
                {connectionStatus === 'connected' && (
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8, 
                      bgcolor: emergencyMode ? 'warning.main' : 'success.main',
                      color: 'white',
                      borderRadius: 5,
                      px: 1,
                      py: 0.25,
                    }}
                  >
                    <Typography variant="caption" fontWeight="bold">
                      {emergencyMode ? 'LOCAL ONLY' : 'LIVE'}
                    </Typography>
                  </Box>
                )}
                
                {connectionStatus === 'connecting' && (
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8, 
                      bgcolor: 'warning.main',
                      color: 'white',
                      borderRadius: 5,
                      px: 1,
                      py: 0.25,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <CircularProgress size={10} thickness={4} color="inherit" />
                    <Typography variant="caption" fontWeight="bold">
                      CONNECTING
                    </Typography>
                  </Box>
                )}
              </Box>
              
              <CardContent sx={{ bgcolor: 'background.paper', p: 1 }}>
                <Stack 
                  direction="row" 
                  spacing={1} 
                  justifyContent="center"
                  sx={{ mt: 0.5 }}
                >
                  {streaming ? (
                    <>
                      {!emergencyMode && (
                        <ControlButton onClick={toggleAudio} color="primary" sx={{ padding: 1 }}>
                          {audioEnabled ? <MicIcon /> : <MicOffIcon />}
                        </ControlButton>
                      )}
                      
                      {(!emergencyMode || (emergencyMode && /iPad|iPhone|iPod/.test(navigator.userAgent))) && (
                        <ControlButton onClick={switchCamera} color="primary" sx={{ padding: 1 }}>
                          <FlipCameraAndroidIcon />
                        </ControlButton>
                      )}
                      
                      <ControlButton onClick={stopStream} color="error" sx={{ padding: 1 }}>
                        <VideocamOffIcon />
                      </ControlButton>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color={emergencyMode ? "warning" : "primary"}
                      startIcon={<VideocamIcon />}
                      onClick={emergencyMode ? startEmergencyStream : startStream}
                      size="large"
                      fullWidth
                      sx={{ 
                        py: 1, 
                        fontSize: '1rem',
                        ...((!emergencyMode && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) && {
                          backgroundColor: 'success.main',
                          '&:hover': { backgroundColor: 'success.dark' }
                        })
                      }}
                    >
                      {emergencyMode ? "Start Camera (Basic)" : "Start Streaming"}
                    </Button>
                  )}
                </Stack>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Mode: {emergencyMode ? 'Emergency' : (lightweightMode ? 'Lightweight' : 'Standard')}
                  </Typography>
                  
                  {!emergencyMode && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                        Lightweight
                      </Typography>
                      <Switch
                        size="small"
                        checked={lightweightMode}
                        onChange={(e) => setLightweightMode(e.target.checked)}
                        inputProps={{ 'aria-label': 'toggle lightweight mode' }}
                      />
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
            
            {(emergencyMode || lightweightMode) && (
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {emergencyMode ? 
                    "Emergency mode: Camera only works locally. Show your phone screen to others." : 
                    "Running in lightweight mode for better performance."}
                </Typography>
              </Box>
            )}
            
            {(!lightweightMode && !emergencyMode) && (
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
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
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default MobileStreamPage; 