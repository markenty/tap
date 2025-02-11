// Connect to the server
const socket = io();

// Keep track of your player ID
let myPlayerId = null;

// Listen for initial data from the server
socket.on('init', (data) => {
  myPlayerId = data.id;
});

// Listen for state updates from the server
socket.on('stateUpdate', (state) => {
  // Update your local game objects based on the authoritative state
  // For example, update player positions:
  for (const id in state.players) {
    const playerState = state.players[id];
    // If this is your player, you might reconcile differences
    // Otherwise, update other players’ positions
    updatePlayerVisual(id, playerState);
  }
});

// Example function to update the DOM element or canvas for a player
function updatePlayerVisual(id, state) {
  // Find your player’s DOM element (or update canvas rendering)
  const playerEl = document.getElementById('player-' + id);
  if (playerEl) {
    playerEl.style.left = state.x + 'px';
    playerEl.style.top = state.y + 'px';
    playerEl.style.transform = 'rotate(' + state.angle + 'rad)';
  }
}

// --- Capture Input Events and Send to Server ---
document.addEventListener('keydown', (e) => {
  socket.emit('playerInput', { key: e.key, state: true });
});

document.addEventListener('keyup', (e) => {
  socket.emit('playerInput', { key: e.key, state: false });
});

// If you already have on-screen control handlers (touch events), add similar socket.emit() calls there.
