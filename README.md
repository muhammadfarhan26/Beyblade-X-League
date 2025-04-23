# Beyblade X League

Welcome to the **Beyblade X League**! This is a web application designed to manage a Beyblade tournament, allowing users to track player statistics, customize Beyblades, and simulate battles.

## Features

- **Player Management**: Add, edit, and delete players with their respective Beyblade images and statistics.
- **Match Scheduling**: Generate a match schedule for all players and record match results.
- **Battle Simulator**: Simulate battles between players' Beyblades with dynamic animations and statistics.
- **Custom Beyblade Creator**: Customize Beyblades by selecting different parts (blades, discs, drivers) and colors.
- **Dark Mode Support**: Toggle between light and dark themes for better readability.
- **Track player rankings, match results, and statistics**
- **View detailed player and Beyblade performance analytics**
- **Live stream Beyblade battles directly from mobile devices**
- **Responsive design for desktop and mobile use**

## Live Mobile Streaming

The app now includes a feature to live stream Beyblade battles directly from your mobile device without requiring any app installation:

1. Navigate to the "Live Stream" tab in the application
2. Scan the QR code with your mobile phone camera
3. Open the link in your mobile browser
4. Allow camera permissions when prompted
5. Position your phone to capture the Beyblade battle
6. The stream will appear automatically on the main screen

### Technical Details

- Uses WebRTC for peer-to-peer streaming
- Works in modern browsers (Chrome, Safari, Firefox)
- Low latency for real-time viewing
- Camera can be flipped between front and back
- Audio can be toggled on/off

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework for building responsive and modern web applications.
- **Local Storage**: For persisting player and match data across sessions.

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/beyblade-x-league.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd beyblade-x-league
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to see the application in action.

## Usage

- **Adding Players**: Click on the "Add Player" button to enter player details and upload their Beyblade images.
- **Generating Schedule**: Use the "Generate Schedule" button to create matches for all players.
- **Recording Results**: After a match, record the results to update player statistics automatically.
- **Simulating Battles**: Click on the "Battle Simulator" button to select players and start a simulated battle.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Beyblade community for inspiration and support.
- Special thanks to the developers of React and Material-UI for their amazing tools.

---
