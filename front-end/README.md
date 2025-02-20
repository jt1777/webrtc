# WebRTC Video Chat App

## Project Structure

front-end/
├── src/
│ ├── Components/
│ │ ├── Home.js // Main component handling call setup
│ │ ├── AnswerVideo.js // Video component for answer side
│ │ ├── CallerVideo.js // Video component for caller side
│ │ └── ActionButtons/ // Video/Audio control buttons
│ └── webrtcUtilities/
│ ├── socketConnection.js // Socket.IO connection handling
│ ├── prepForCall.js // Media setup
│ ├── createPeerConn.js // WebRTC peer connection
│ └── clientSocketListeners.js // Socket event handlers
back-end/
├── server.js // Express/Socket.IO server
└── SSL certificates

## Key Dependencies

Frontend (front-end/package.json):

json
{
"dependencies": {
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-router-dom": "^6.22.3",
"socket.io-client": "^4.7.5"
}
}

Backend (back-end/package.json):

json
{
"dependencies": {
"express": "^4.18.2",
"socket.io": "^4.7.5",
"cors": "^2.8.5"
}
}




## Known Issues
1. Remote access issues when accessing from different computers on local network
2. Self-signed certificate warnings in browser

## Development Notes
- HTTPS required for WebRTC functionality
- Socket.IO connection must be established before WebRTC setup
- Media access must be granted before creating peer connection
- Backend server must be running on port 8181
- Frontend development server runs on port 3000

## Future Improvements
1. Proper SSL certificate implementation
2. Better error handling for failed connections
3. Screen sharing functionality
4. Text chat integration
5. Improved user authentication

## Key Components Flow
1. User clicks "Join" button
2. Username prompt appears
3. Socket connection established
4. User can either:
   - Start a call (creates offer)
   - Answer a call (creates answer)
5. WebRTC peer connection established
6. Video/Audio streams connected

## SSL Requirements
- Self-signed certificates required for development
- Located in backend directory as:
  - localhost+2-key.pem
  - localhost+2.pem

## Configuration Files

Environment Variables (front-end/.env):

REACT_APP_BACKEND_URL=https://localhost:8181

## Core Features Implemented

1. User Authentication
   - Basic username-based authentication
   - Socket.IO auth with password "x"

2. Video Call Setup
   - getUserMedia access for camera/microphone
   - WebRTC peer connection establishment
   - Offer/Answer exchange
   - ICE candidate handling

3. User Interface
   - Join screen with username prompt
   - Call initiation button
   - Available calls list
   - Video display for both caller and answerer

## Important Implementation Details

Socket Connection (socketConnection.js):
```javascript
const socket = io(BACKEND_URL, {
    auth: {
        userName: userName || 'anonymous',
        password: "x"
    },
    rejectUnauthorized: false,
    secure: true,
    reconnection: true,
    reconnectionAttempts: 3,
    transports: ['websocket', 'polling'],
    timeout: 10000
});
```

Server CORS Setup (server.js):
```javascript
const io = new Server(expressServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000
});
```


