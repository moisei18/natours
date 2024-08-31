const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server and connect it with our HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  // console.log('WebSocket connection established');
  ws.on('message', (message) => {
    // console.log(`Received message: ${message}`);
    ws.send(`Server received: ${message}`);
  });
  ws.on('close', () => {
    // console.log('WebSocket connection closed');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
