// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Matter = require('matter-js');

// --- Setup Express Server ---
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (your client HTML, JS, CSS)
app.use(express.static('public'));

// --- Setup Matter.js Engine ---
const engine = Matter.Engine.create();
const world = engine.world;

// Example: create a ground body
const ground = Matter.Bodies.rectangle(1500, 600, 3000, 40, { isStatic: true });
Matter.World.add(world, ground);

// Data structure for connected players
const players = {};

// --- Socket.IO: Handle connections ---
io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);

  // Initialize player state
  players[socket.id] = {
    id: socket.id,
    // For example, starting position; you can expand this
    x: 100,
    y: 500,
    keys: {}
  };

  // Create a Matter.js body for this player
  players[socket.id].body = Matter.Bodies.circle(players[socket.id].x, players[socket.id].y, 20, {
    label: 'player',
    friction: 0.1,
    restitution: 0
  });
  Matter.World.add(world, players[socket.id].body);

  // Inform the new client of its ID (and any other setup data)
  socket.emit('init', { id: socket.id });

  // Relay new player info to others if needed
  socket.broadcast.emit('newPlayer', players[socket.id]);

  // --- Receive Input Events from Clients ---
  socket.on('playerInput', (inputData) => {
    // Save the latest input for this player
    // Example inputData: { key: 'ArrowLeft', state: true }
    players[socket.id].keys[inputData.key] = inputData.state;
  });

  // Clean up on disconnect
  socket.on('disconnect', () => {
    console.log('Player disconnected:', socket.id);
    // Remove player from Matter.js world
    if (players[socket.id] && players[socket.id].body) {
      Matter.World.remove(world, players[socket.id].body);
    }
    delete players[socket.id];
    // Inform other clients
    io.emit('removePlayer', socket.id);
  });
});

// --- Game Simulation Loop ---
const tickRate = 1000 / 60; // 60 ticks per second

setInterval(() => {
  // Process input for each player
  Object.keys(players).forEach((id) => {
    const player = players[id];
    if (player && player.body) {
      // Example: apply a force if a directional key is pressed
      if (player.keys['ArrowLeft']) {
        Matter.Body.applyForce(player.body, player.body.position, { x: -0.005, y: 0 });
      }
      if (player.keys['ArrowRight']) {
        Matter.Body.applyForce(player.body, player.body.position, { x: 0.005, y: 0 });
      }
      if (player.keys['ArrowUp']) {
        // Only allow jump if near the ground (you can add more sophisticated checking)
        if (player.body.position.y > 550) {
          Matter.Body.applyForce(player.body, player.body.position, { x: 0, y: -0.02 });
        }
      }
    }
  });

  // Update the physics simulation
  Matter.Engine.update(engine, tickRate);

  // Prepare a state update object
  const state = {
    players: {}
    // Extend with enemies, objects, etc.
  };

  Object.keys(players).forEach((id) => {
    const player = players[id];
    state.players[id] = {
      x: player.body.position.x,
      y: player.body.position.y,
      angle: player.body.angle
    };
  });

  // Broadcast the updated state to all clients
  io.emit('stateUpdate', state);
}, tickRate);

// --- Start the Server ---
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
