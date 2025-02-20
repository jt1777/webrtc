import { io } from 'socket.io-client';

// Replace any hardcoded localhost URLs with environment variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://localhost:8181';

let socket;
const socketConnection = userName => {
    if(socket && socket.connected){
        return socket;
    } else {
        console.log('Attempting to connect to:', BACKEND_URL);
        
        socket = io(BACKEND_URL, {
            auth: {
                userName: userName || 'anonymous',  // Provide default
                password: "x"
            },
            rejectUnauthorized: false,  // Important for self-signed certs
            secure: true,
            reconnection: true,
            reconnectionAttempts: 3,
            // Add these options for better debugging
            transports: ['websocket', 'polling'],
            timeout: 10000,
            withCredentials: true,
            extraHeaders: {
                "Access-Control-Allow-Origin": "*"
            }
        });

        socket.on('connect_error', (error) => {
            console.log('Connection Error:', {
                message: error.message,
                description: error.description,
                context: error.context
            });
        });

        socket.on('connect', () => {
            console.log('Socket Connected:', socket.id);
        });

        socket.on('error', (error) => {
            console.log('Socket Error:', error);
        });

        return socket;
    }
}

export default socketConnection;