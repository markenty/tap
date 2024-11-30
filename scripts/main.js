
function multiplyScoreByEnergy() {
     // Apply a very subtle scaling factor
    score += worldsVisited*.5;

    // Round down to the nearest whole number for subtlety
    score = Math.floor(score);


    // Update the score display
    const scoreDisplay = document.getElementById("score-display");
    scoreDisplay.textContent = `Score: ${score}`;
}
        // Get elements
        const toggleTrigger = document.querySelector('.toggle-trigger');
        const instructionsDiv = document.getElementById('instructions');
        const toggleIcon = document.querySelector('.toggle-icon');

        // Toggle instructions visibility
        toggleTrigger.addEventListener('click', () => {
            const isVisible = instructionsDiv.style.display === 'block';

            // Toggle display and icon rotation
            instructionsDiv.style.display = isVisible ? 'none' : 'block';
            toggleTrigger.classList.toggle('expanded', !isVisible);
        });
 
  const toggleButton = document.getElementById("toggleButton");
  const itemList = document.getElementById("items");

  toggleButton.addEventListener("click", () => {
    if (itemList.style.display === "none") {
      itemList.style.display = "block";
      toggleButton.textContent = "Hide Items";
    } else {
      itemList.style.display = "none";
      toggleButton.textContent = "View Items";
    }
  });

    const canvas = document.getElementById("gameCanvas");

    // Prevent multi-touch gestures (e.g., pinch-zoom) on the canvas
    canvas.addEventListener('touchstart', (event) => {
        if (event.touches.length > 1) {
            event.preventDefault(); // Block pinch-zoom
        }
    }, { passive: false });

    // Prevent gesture-based zoom specifically for canvas
    canvas.addEventListener('gesturestart', (event) => {
        event.preventDefault(); // Block gesture zoom
    });

    /
    // Prevent context menu on canvas for mobile devices
    canvas.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });}
</script>
 <script>// Detect gamepad connection
window.addEventListener("gamepadconnected", (e) => {
    console.log("Gamepad connected:", e.gamepad);
});

window.addEventListener("gamepaddisconnected", (e) => {
    console.log("Gamepad disconnected:", e.gamepad);
});

// Process gamepad input
function handleGamepadInput() {
    const gamepads = navigator.getGamepads();

    if (!gamepads[0]) return; // No gamepad connected

    const gamepad = gamepads[0];

    // Movement
    const horizontalAxis = gamepad.axes[0]; // Left stick
    if (horizontalAxis < -0.5) {
        shooter.x = Math.max(0, shooter.x - 5); // Move left
    } else if (horizontalAxis > 0.5) {
        shooter.x = Math.min(canvas.width - shooter.width, shooter.x + 5); // Move right
    }

    // Shooting
    if (gamepad.buttons[0].pressed) {
        shootBullet(); // Button A
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    handleGamepadInput(); // Process gamepad input
    updateShooterPosition(); // Handle keyboard/touch input
    drawShooter(); // Redraw shooter
    drawHp(); // Draw health bar

    // Other game logic...

    if (gameActive) requestAnimationFrame(gameLoop);
}
    const layers = [
      btoa("Reveal Shooter"),
      btoa("Add Enemies and Power-ups"),
      btoa("Enable Levels and Gameplay!")
    ];

    let currentLayer = 0;
    let shooter, enemies = [], bullets = [], powerups = [], boss = null, bossActive = false;
    let gameActive = false;
    let score = 0;
    let hp = 100;
    let level = 1;
    let powerupType = null;

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const unpackButton = document.getElementById("unpackButton");
    const resetButton = document.getElementById("resetButton");

    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);

    function unpackLayer() {
      if (currentLayer < layers.length) {
        const decompressed = atob(layers[currentLayer]);
        if (decompressed === "Reveal Shooter") {
          initializeShooter();
        } else if (decompressed === "Add Enemies and Power-ups") {
          addEnemyAndPowerupMechanics();
        } else if (decompressed === "Enable Levels and Gameplay!") {
          startGame();
        }
        currentLayer++;
      } else {
        alert("Game Fully Unpacked!");
      }
    }

    function initializeShooter() {
      shooter = {
        x: canvas.width / 2 - 25,
        y: canvas.height - 50,
        width: 50,
        height: 10
      };
      drawShooter();
    }

    function drawShooter() {
      ctx.fillStyle = "#0f0";
      ctx.fillRect(shooter.x, shooter.y, shooter.width, shooter.height);
    }

    function addEnemyAndPowerupMechanics() {
      setInterval(() => {
        if (gameActive) {
          const enemy = {
            x: Math.random() * (canvas.width - 30),
            y: 0,
            width: 30,
            height: 30,
            speed: 1 + level * 0.5 + Math.random(),
            type: Math.random() > 0.5 ? "circle" : "square"
          };
          enemies.push(enemy);

          if (Math.random() < 0.1) {
            const powerup = {
              x: Math.random() * (canvas.width - 20),
              y: 0,
              size: 20,
              speed: 2,
              emoji: Math.random() > 0.5 ? "💥" : "❤️"
            };
            powerups.push(powerup);
          }
        }
      }, 1000);
    }

    function startGame() {
      gameActive = true;
      gameLoop();
      unpackButton.style.display = "none";
      resetButton.style.display = "block";
    }

    function resetGame() {
      gameActive = false;
      powerupType = null; // Reset weapon modifier on game reset.
      console.log("Game reset: Power-up type cleared.");
      currentLayer = 0;
      enemies = [];
      bullets = [];
      powerups = [];
      score = 0;
      hp = 100;
      level = 1;
      powerupType = null;
      initializeShooter();
      unpackButton.style.display = "block";
      resetButton.style.display = "none";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawHp() {
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(20, 20, (hp / 100) * 200, 20);
      ctx.strokeStyle = "#fff";
      ctx.strokeRect(20, 20, 200, 20);
      ctx.font = "16px Arial";
      ctx.fillStyle = "#fff";
      ctx.fillText(`HP: ${hp}%`, 240, 35);
    }

    function spawnBoss() {
      boss = {
        x: canvas.width / 2 - 75,
        y: 30,
        width: 150,
        height: 150,
        hp: 150,
        speed: 1.5,
        color: "#FF4500",
        glow: true,
        oscillate: true
      };
      bossActive = true;
    }
           if (bossActive) {
    drawBoss(); // Draw boss if active
}

 function drawBoss() {
    if (boss && bossActive) {
        ctx.fillStyle = "#FF4500"; // Boss color
        ctx.fillRect(boss.x, boss.y, boss.width, boss.height);

        // Example: Add simple movement or effects
        boss.y += boss.speed * Math.sin(Date.now() / 1000);

        // Draw boss health bar
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(boss.x, boss.y - 10, (boss.hp / 150) * boss.width, 5);
    }
}

function handleBossDamage() {
    bullets.forEach((bullet, bIndex) => {
        if (
            boss &&
            bullet.x < boss.x + boss.width &&
            bullet.x + bullet.width > boss.x &&
            bullet.y < boss.y + boss.height &&
            bullet.y + bullet.height > boss.y
        ) {
            boss.hp -= 10; // Decrease boss health
            bullets.splice(bIndex, 1); // Remove the bullet

            // Check if the boss is defeated
            if (boss.hp <= 0) {
                boss = null;
                bossActive = false;
                level++;
                updateDisplay();
                alert("Boss defeated! Level up!");
            }
        }
    });
}
    function gameLoop() {
      drawBoss();
      handleBossDamage();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawShooter();
      drawHp();

      ctx.font = "20px Arial";
      ctx.fillStyle = "#fff";
      ctx.fillText(`Level: ${level}`, 20, 70);
      ctx.fillText(`Score: ${score}`, 20, 100);

      if (score > level * 20) level++;

      enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;
        if (enemy.type === "circle") {
          ctx.beginPath();
          ctx.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.width / 2, 0, Math.PI * 2);
          ctx.fillStyle = "#f00";
          ctx.fill();
        } else {
          ctx.fillStyle = "#f00";
          ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }

        if (
          enemy.x < shooter.x + shooter.width &&
          enemy.x + enemy.width > shooter.x &&
          enemy.y + enemy.height > shooter.y
        ) {
          enemies.splice(index, 1);
          hp -= 10;
          if (hp <= 0) {
            gameActive = false;
            alert(`Game Over! Final Score: ${score}`);
          }
        }
    // Check if score exceeds threshold for level up
    if (score > level * 20) { // Example: Level up every 50 points
        level++;
        updateDisplay(); // Refresh UI
        spawnBoss(); // Spawn a boss on level up
        
    if (enemy.y > canvas.height) enemies.splice(index, 1);
    // Add an energy power-up when an enemy dies
    if (!enemies.includes(enemy)) {
        const powerup = {
            x: Math.random() * (canvas.width - 20),
            y: 0,
            size: 20,
            speed: 2,
            emoji: "⚡" // Energy power-up symbol
        };
        powerups.push(powerup);
    }
    
      });

      ctx.fillStyle = "#fff";
      bullets.forEach((bullet, bIndex) => {
        bullet.y -= bullet.speed;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        if (bullet.y < 0) bullets.splice(bIndex, 1);

        enemies.forEach((enemy, eIndex) => {
          if (
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y
          ) {
            enemies.splice(eIndex, 1);
            bullets.splice(bIndex, 1);
            score++;
          }
        });
      });

      powerups.forEach((powerup, index) => {
        powerup.y += powerup.speed;
        ctx.font = "20px Arial";
        ctx.fillText(powerup.emoji, powerup.x, powerup.y);

        if (
          powerup.x < shooter.x + shooter.width &&
          powerup.x + powerup.size > shooter.x &&
          powerup.y + powerup.size > shooter.y
        ) {
          
    
    if (powerup.emoji === "⚡") {
        if (window.handleTap) {
            // Simulate a tap for energy gain in Stargate game
            window.handleTap();
        }
        powerups.splice(index, 1);
    } else if (powerup.emoji === "💥") {
    
        if (window.sharedEnergyCount) {
            const energyGain = Math.floor(Math.random() * 5) + 1; // Random energy gain between 1 and 5
            window.energyCount += energyGain;
        }
        powerups.splice(index, 1);
    } else if (powerup.emoji === "💥") {
    
            powerupType = "double";
          } else if (powerup.emoji === "❤️") {
            hp = Math.min(100, hp + 20);
          }
          powerups.splice(index, 1);
        }

        if (powerup.y > canvas.height) powerups.splice(index, 1);
      });

      if (gameActive) requestAnimationFrame(gameLoop);
    }

    function shootBullet() {
      const bullet = {
        x: shooter.x + shooter.width / 2 - 5,
        y: shooter.y - 20,
        width: 10,
        height: 20,
        speed: 8
      };
      
    bullets.push(bullet);
    if (window.handleTap) {
        // Simulate a tap for energy gain in Stargate game when shooting
        window.handleTap();
    }
    

      if (powerupType === "double") {
        bullets.push({
          x: shooter.x + shooter.width / 2 + 15,
          y: shooter.y - 20,
          width: 10,
          height: 20,
          speed: 8
        });
      }
    }

    let touchStartX = 0;
    function handleTouchStart(e) {
      touchStartX = e.touches[0].clientX;
    }

    function handleTouchMove(e) {
      const touchX = e.touches[0].clientX;
      const deltaX = touchX - touchStartX;
      shooter.x = Math.max(0, Math.min(canvas.width - shooter.width, shooter.x + deltaX));
      touchStartX = touchX;
    }

    function handleTouchEnd(e) {
      shootBullet();
    }

    unpackButton.addEventListener("click", unpackLayer);
    resetButton.addEventListener("click", resetGame);
 
    let energyCount = 0;
    let chevronsLocked = 0;
    let worldsVisited = 0;
    let baseChevronCost = 50;
    let chevronCost = baseChevronCost;
    let lastTapTime = 0;
    let baseMultiplier = 1;
    let itemMultiplier = 1;

    const items = [
  { name: "Zat Gun", bonus: 2 },
  { name: "Naquadah Generator", bonus: 5 },
  { name: "Ancient Tablet", bonus: 10 },
  { name: "Goa'uld Healing Device", bonus: 8 },
  { name: "Stargate Dialing Crystal", bonus: 15 },
  { name: "Replicator Fragment", bonus: 12 },
  { name: "Ori Staff Weapon", bonus: 7 },
  { name: "Tau'ri Data Recorder", bonus: 6 },
  { name: "Tok'ra Memory Device", bonus: 4 },
  { name: "Asgard Core Crystal", bonus: 20 },
  { name: "Wraith Dagger", bonus: 3 },
  { name: "Unas Necklace", bonus: 5 },
  { name: "Anubis Cloaking Device", bonus: 25 },
  { name: "Furling Artifact", bonus: 30 },
  { name: "Ancient Drone Weapon", bonus: 18 },
  { name: "Atlantis ZPM (Zero Point Module)", bonus: 50 },
  { name: "SG-1 Patch", bonus: 2 },
  { name: "Daedalus Control Panel", bonus: 10 },
  { name: "Puddle Jumper Schematic", bonus: 12 },
  { name: "DHD Control Key", bonus: 7 },
  { name: "Ori Book of Origin", bonus: 25 },
  { name: "Jaffa Staff Fragment", bonus: 5 },
  { name: "Ascension Device", bonus: 35 },
  { name: "Ba'al's Time Travel Remote", bonus: 15 },
  { name: "Ancient Hologram Projector", bonus: 10 },
  { name: "SGC Gate Shield", bonus: 20 },
  { name: "Nox Healing Stone", bonus: 28 },
  { name: "Wraith Stunner", bonus: 8 },
  { name: "Genii Vault Key", bonus: 6 },
  { name: "Supergate Fragment", bonus: 18 },
  { name: "Dakara Weapon Control Module", bonus: 22 },
  { name: "Tok'ra Crystal Shard", bonus: 16 },
  { name: "Wraith Regeneration Pod", bonus: 24 },
  { name: "Tollan Phase Shift Device", bonus: 20 },
  { name: "Ori Plasma Beam", bonus: 30 },
  { name: "Asgard Transport Beam Emitter", bonus: 15 },
  { name: "Ancient Knowledge Cube", bonus: 12 },
  { name: "Jaffa Symbol Pendant", bonus: 7 },
  { name: "Atlantis Data Crystal", bonus: 18 },
  { name: "Stasis Pod Key", bonus: 10 },
  { name: "Lucian Alliance Tracker", bonus: 8 },
  { name: "Apophis Insignia Ring", bonus: 5 },
  { name: "Tollan Personal Shield", bonus: 25 },
];
    let collectedItems = [];

    function calculateBaseMultiplier(speed) {
      if (speed < 300) return 5;
      if (speed < 600) return 3;
      return 1;
    }

    function handleTap() {
      const now = performance.now();
      if (lastTapTime > 0) {
        const tapSpeed = now - lastTapTime;
        baseMultiplier = calculateBaseMultiplier(tapSpeed);
      }
      lastTapTime = now;
      energyCount += baseMultiplier * itemMultiplier;
      updateDisplay();


    function autoSubtractEnergy() {
      const energyReductionRate = 0.03; // Further reduced subtraction amount.
      setInterval(() => {
        if (energyCount > 0) {
          energyCount -= energyReductionRate;
          if (energyCount < 0) energyCount = 0; // Prevent negative energy.
          updateDisplay();
        }
      }, 1000); // Subtract energy every 1000ms for a slower pace.
    }
    autoSubtractEnergy(); // Start auto-subtraction when the game loads.

    }

    function lockChevron() {
      if (energyCount >= chevronCost) {
        energyCount -= chevronCost;
        chevronsLocked++;
        chevronCost += baseChevronCost + (worldsVisited * 50);

        if (chevronsLocked === 7) {
          worldsVisited++;
          chevronsLocked = 0;
          chevronCost = baseChevronCost + (worldsVisited * 50);
          discoverItem();
          triggerGateAnimation();   multiplyScoreByEnergy(); // Multiply score by energy
          displayMessage(`Gate dialed! World ${worldsVisited} visited!`);
        } else {
          displayMessage(`Chevron ${chevronsLocked} locked!`);
        }

        updateDisplay();


    function autoSubtractEnergy() {
      const energyReductionRate = 0.03; // Further reduced subtraction amount.
      setInterval(() => {
        if (energyCount > 0) {
          energyCount -= energyReductionRate;
          if (energyCount < 0) energyCount = 0; // Prevent negative energy.
          updateDisplay();
        }
      }, 1000); // Subtract energy every 1000ms for a slower pace.
    }
    autoSubtractEnergy(); // Start auto-subtraction when the game loads.

        updateChevrons();
      } else {
        displayMessage("Not enough energy to lock a chevron!");
      }
    }

    function discoverItem() {
      const newItem = items[Math.floor(Math.random() * items.length)];
      collectedItems.push(newItem);
      itemMultiplier += newItem.bonus;

      const listItem = document.createElement("li");
      listItem.textContent = `${newItem.name} (+${newItem.bonus}x Multiplier)`;
      document.getElementById("items").appendChild(listItem);

      displayMessage(`Discovered: ${newItem.name}! Multiplier increased by ${newItem.bonus}x.`);
    }

    function triggerGateAnimation() {
      const wormhole = document.querySelector(".wormhole");
      wormhole.style.display = "block";
      wormhole.addEventListener("animationend", () => {
        wormhole.style.display = "none";
      }, { once: true });
    }

    function resetGame() {
      energyCount = 0;
      chevronsLocked = 0;
      worldsVisited = 0;
      chevronCost = baseChevronCost;
      baseMultiplier = 1;
      itemMultiplier = 1;
      collectedItems = [];
      document.getElementById("items").innerHTML = "";
      updateDisplay();


    function autoSubtractEnergy() {
      const energyReductionRate = 0.03; // Further reduced subtraction amount.
      setInterval(() => {
        if (energyCount > 0) {
          energyCount -= energyReductionRate;
          if (energyCount < 0) energyCount = 0; // Prevent negative energy.
          updateDisplay();
        }
      }, 1000); // Subtract energy every 1000ms for a slower pace.
    }
    autoSubtractEnergy(); // Start auto-subtraction when the game loads.

      displayMessage("Game reset!");
    }

    function updateChevrons() {
      const chevronVisualizer = document.getElementById("chevron-visualizer");
      chevronVisualizer.innerHTML = "";
      for (let i = 0; i < 7; i++) {
        const chevron = document.createElement("div");
        chevron.className = "chevron";
        chevron.dataset.locked = i < chevronsLocked ? "true" : "false";
        chevron.textContent = i + 1;
        chevronVisualizer.appendChild(chevron);
      }
    }

    function updateDisplay() {
      document.getElementById("energy-count").textContent = `⚡ ${Math.floor(energyCount)}`;
      document.getElementById("multiplier").textContent = `${Math.floor(baseMultiplier * itemMultiplier)}x`;
      document.getElementById("chevrons-locked").textContent = chevronsLocked;
      document.getElementById("worlds-visited").textContent = worldsVisited;
      document.getElementById("energy-required").textContent = chevronCost;
    }

    function displayMessage(message) {
      const messageDiv = document.getElementById("messages");
      messageDiv.textContent = message;
      setTimeout(() => {
        messageDiv.textContent = "";
      }, 3000);
    }

    document.getElementById("tap-button").addEventListener("click", handleTap);
    document.getElementById("lock-chevron-button").addEventListener("click", lockChevron);
    document.getElementById("reset-button").addEventListener("click", () => {
      window.location.reload(); // Reload the entire window to reset the game.
    });
updateDisplay();


    function autoSubtractEnergy() {
      const energyReductionRate = 0.03; // Further reduced subtraction amount.
      setInterval(() => {
        if (energyCount > 0) {
          energyCount -= energyReductionRate;
          if (energyCount < 0) energyCount = 0; // Prevent negative energy.
          updateDisplay();
        }
      }, 1000); // Subtract energy every 1000ms for a slower pace.
    }
    autoSubtractEnergy(); // Start auto-subtraction when the game loads.

 
        // Make energyCount accessible globally for the shooter game
        window.sharedEnergyCount = () => energyCount;
  
        // Shared energy counter logic
        let energyCount = 0; // Initialize shared energy counter

        // Sync logic for Stargate Game
        
    let energyCount = 0;
    let chevronsLocked = 0;
    let worldsVisited = 0;
    let baseChevronCost = 50;
    let chevronCost = baseChevronCost;
    let lastTapTime = 0;
    let baseMultiplier = 1;
    let itemMultiplier = 1;

    const items = [
  { name: "Zat Gun", bonus: 2 },
  { name: "Naquadah Generator", bonus: 5 },
  { name: "Ancient Tablet", bonus: 10 },
  { name: "Goa'uld Healing Device", bonus: 8 },
  { name: "Stargate Dialing Crystal", bonus: 15 },
  { name: "Replicator Fragment", bonus: 12 },
  { name: "Ori Staff Weapon", bonus: 7 },
  { name: "Tau'ri Data Recorder", bonus: 6 },
  { name: "Tok'ra Memory Device", bonus: 4 },
  { name: "Asgard Core Crystal", bonus: 20 },
  { name: "Wraith Dagger", bonus: 3 },
  { name: "Unas Necklace", bonus: 5 },
  { name: "Anubis Cloaking Device", bonus: 25 },
  { name: "Furling Artifact", bonus: 30 },
  { name: "Ancient Drone Weapon", bonus: 18 },
  { name: "Atlantis ZPM (Zero Point Module)", bonus: 50 },
  { name: "SG-1 Patch", bonus: 2 },
  { name: "Daedalus Control Panel", bonus: 10 },
  { name: "Puddle Jumper Schematic", bonus: 12 },
  { name: "DHD Control Key", bonus: 7 },
  { name: "Ori Book of Origin", bonus: 25 },
  { name: "Jaffa Staff Fragment", bonus: 5 },
  { name: "Ascension Device", bonus: 35 },
  { name: "Ba'al's Time Travel Remote", bonus: 15 },
  { name: "Ancient Hologram Projector", bonus: 10 },
  { name: "SGC Gate Shield", bonus: 20 },
  { name: "Nox Healing Stone", bonus: 28 },
  { name: "Wraith Stunner", bonus: 8 },
  { name: "Genii Vault Key", bonus: 6 },
  { name: "Supergate Fragment", bonus: 18 },
  { name: "Dakara Weapon Control Module", bonus: 22 },
  { name: "Tok'ra Crystal Shard", bonus: 16 },
  { name: "Wraith Regeneration Pod", bonus: 24 },
  { name: "Tollan Phase Shift Device", bonus: 20 },
  { name: "Ori Plasma Beam", bonus: 30 },
  { name: "Asgard Transport Beam Emitter", bonus: 15 },
  { name: "Ancient Knowledge Cube", bonus: 12 },
  { name: "Jaffa Symbol Pendant", bonus: 7 },
  { name: "Atlantis Data Crystal", bonus: 18, type: "score"  },
  { name: "Stasis Pod Key", bonus: 10 },
  { name: "Lucian Alliance Tracker", bonus: 8 },
  { name: "Apophis Insignia Ring", bonus: 5 },
  { name: "Tollan Personal Shield", bonus: 25 },
];
    let collectedItems = [];

    function calculateBaseMultiplier(speed) {
      if (speed < 300) return 5;
      if (speed < 600) return 3;
      return 1;
    }

function handleTap() {
    const now = performance.now();

    // Calculate tap speed and update base multiplier
    if (lastTapTime > 0) {
        const tapSpeed = now - lastTapTime;
        baseMultiplier = calculateBaseMultiplier(tapSpeed);
    }
    lastTapTime = now;

    // Increment energy count
    energyCount += baseMultiplier * itemMultiplier;

    // Fire a bullet
    shootBullet();

    // Update the display
    updateDisplay();
}

    function autoSubtractEnergy() {
      const energyReductionRate = 0.03; // Further reduced subtraction amount.
      setInterval(() => {
        if (energyCount > 0) {
          energyCount -= energyReductionRate;
          if (energyCount < 0) energyCount = 0; // Prevent negative energy.
          updateDisplay();
        }
      }, 1000); // Subtract energy every 1000ms for a slower pace.
    }
    autoSubtractEnergy(); // Start auto-subtraction when the game loads.

    }

    function lockChevron() {
      if (energyCount >= chevronCost) {
        energyCount -= chevronCost;
        chevronsLocked++;
        chevronCost += baseChevronCost + (worldsVisited * 50);

        if (chevronsLocked === 7) {
          worldsVisited++;
          chevronsLocked = 0;
          chevronCost = baseChevronCost + (worldsVisited * 50);
          discoverItem();
          triggerGateAnimation();
          displayMessage(`Gate dialed! World ${worldsVisited} visited!`);
        } else {
          displayMessage(`Chevron ${chevronsLocked} locked!`);
        }

        updateDisplay();


    function autoSubtractEnergy() {
      const energyReductionRate = 0.03; // Further reduced subtraction amount.
      setInterval(() => {
        if (energyCount > 0) {
          energyCount -= energyReductionRate;
          if (energyCount < 0) energyCount = 0; // Prevent negative energy.
          updateDisplay();
        }
      }, 1000); // Subtract energy every 1000ms for a slower pace.
    }
    autoSubtractEnergy(); // Start auto-subtraction when the game loads.

        updateChevrons();
      } else {
        displayMessage("Not enough energy to lock a chevron!");
      }
    }

    function discoverItem() {
      const newItem = items[Math.floor(Math.random() * items.length)];
      collectedItems.push(newItem);
      itemMultiplier += newItem.bonus;

      const listItem = document.createElement("li");
      listItem.textContent = `${newItem.name} (+${newItem.bonus}x Multiplier)`;
      document.getElementById("items").appendChild(listItem);

      displayMessage(`Discovered: ${newItem.name}! Multiplier increased by ${newItem.bonus}x.`);   
        
    }

    function triggerGateAnimation() {
      const wormhole = document.querySelector(".wormhole");
      wormhole.style.display = "block";
      wormhole.addEventListener("animationend", () => {
        wormhole.style.display = "none";
      }, { once: true });
    }

    function resetGame() {
      energyCount = 0;
      chevronsLocked = 0;
      worldsVisited = 0;
      chevronCost = baseChevronCost;
      baseMultiplier = 1;
      itemMultiplier = 1;
      collectedItems = [];
      document.getElementById("items").innerHTML = "";
      updateDisplay();


    function autoSubtractEnergy() {
      const energyReductionRate = 0.03; // Further reduced subtraction amount.
      setInterval(() => {
        if (energyCount > 0) {
          energyCount -= energyReductionRate;
          if (energyCount < 0) energyCount = 0; // Prevent negative energy.
          updateDisplay();
        }
      }, 1000); // Subtract energy every 1000ms for a slower pace.
    }
    autoSubtractEnergy(); // Start auto-subtraction when the game loads.

      displayMessage("Game reset!");
    }

    function updateChevrons() {
      const chevronVisualizer = document.getElementById("chevron-visualizer");
      chevronVisualizer.innerHTML = "";
      for (let i = 0; i < 7; i++) {
        const chevron = document.createElement("div");
        chevron.className = "chevron";
        chevron.dataset.locked = i < chevronsLocked ? "true" : "false";
        chevron.textContent = i + 1;
        chevronVisualizer.appendChild(chevron);
      }
    }

    function updateDisplay() {
      document.getElementById("energy-count").textContent = `⚡ ${Math.floor(energyCount)}`;
      document.getElementById("multiplier").textContent = `${Math.floor(baseMultiplier * itemMultiplier)}x`;
      document.getElementById("chevrons-locked").textContent = chevronsLocked;
      document.getElementById("worlds-visited").textContent = worldsVisited;
      document.getElementById("energy-required").textContent = chevronCost;
    }

    function displayMessage(message) {
      const messageDiv = document.getElementById("messages");
      messageDiv.textContent = message;
      setTimeout(() => {
        messageDiv.textContent = "";
      }, 3000);
    }

    document.getElementById("tap-button").addEventListener("click", handleTap);
    document.getElementById("lock-chevron-button").addEventListener("click", lockChevron);
    document.getElementById("reset-button").addEventListener("click", () => {
      window.location.reload(); // Reload the entire window to reset the game.
    });
updateDisplay();


    function autoSubtractEnergy() {
      const energyReductionRate = 0.03; // Further reduced subtraction amount.
      setInterval(() => {
        if (energyCount > 0) {
          energyCount -= energyReductionRate;
          if (energyCount < 0) energyCount = 0; // Prevent negative energy.
          updateDisplay();
        }
      }, 1000); // Subtract energy every 1000ms for a slower pace.
    }
    autoSubtractEnergy(); // Start auto-subtraction when the game loads.

        // Make energyCount accessible globally for the shooter game
        window.sharedEnergyCount = () => energyCount;
    

        // Sync logic for Shooter Game with Tap and Shoot Simulation
        
    const layers = [
      btoa("Reveal Shooter"),
      btoa("Add Enemies and Power-ups"),
      btoa("Enable Levels and Gameplay!")
    ];

    let currentLayer = 0;
    let shooter, enemies = [], bullets = [], powerups = [], boss = null, bossActive = false;
    let gameActive = false;
    let score = 0;
    let hp = 100;
    let level = 1;
    let powerupType = null;

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const unpackButton = document.getElementById("unpackButton");
    const resetButton = document.getElementById("resetButton");

    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);

    function unpackLayer() {
      if (currentLayer < layers.length) {
        const decompressed = atob(layers[currentLayer]);
        if (decompressed === "Reveal Shooter") {
          initializeShooter();
        } else if (decompressed === "Add Enemies and Power-ups") {
          addEnemyAndPowerupMechanics();
        } else if (decompressed === "Enable Levels and Gameplay!") {
          startGame();
        }
        currentLayer++;
      } else {
        alert("Game Fully Unpacked!");
      }
    }

    function initializeShooter() {
      shooter = {
        x: canvas.width / 2 - 25,
        y: canvas.height - 50,
        width: 50,
        height: 10
      };
      drawShooter();
    }

    function drawShooter() {
      ctx.fillStyle = "#0f0";
      ctx.fillRect(shooter.x, shooter.y, shooter.width, shooter.height);
    }

    function addEnemyAndPowerupMechanics() {
      setInterval(() => {
        if (gameActive) {
          const enemy = {
            x: Math.random() * (canvas.width - 30),
            y: 0,
            width: 30,
            height: 30,
            speed: 1 + level * 0.5 + Math.random(),
            type: Math.random() > 0.5 ? "circle" : "square"
          };
          enemies.push(enemy);

          if (Math.random() < 0.1) {
            const powerup = {
              x: Math.random() * (canvas.width - 20),
              y: 0,
              size: 20,
              speed: 2,
              emoji: Math.random() > 0.5 ? "💥" : "❤️"
            };
            powerups.push(powerup);
          }
        }
      }, 1000);
    }

    function startGame() {
      gameActive = true;
      gameLoop();
      unpackButton.style.display = "none";
      resetButton.style.display = "block";
    }

    function resetGame() {
      gameActive = false;
      powerupType = null; // Reset weapon modifier on game reset.
      console.log("Game reset: Power-up type cleared.");
      currentLayer = 0;
      enemies = [];
      bullets = [];
      powerups = [];
      score = 0;
      hp = 100;
      level = 1;
      powerupType = null;
      initializeShooter();
      unpackButton.style.display = "block";
      resetButton.style.display = "none";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawHp() {
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(20, 20, (hp / 100) * 200, 20);
      ctx.strokeStyle = "#fff";
      ctx.strokeRect(20, 20, 200, 20);
      ctx.font = "16px Arial";
      ctx.fillStyle = "#fff";
      ctx.fillText(`HP: ${hp}%`, 240, 35);
    }

    function spawnBoss() {
      boss = {
        x: canvas.width / 2 - 75,
        y: 30,
        width: 150,
        height: 150,
        hp: 150,
        speed: 1.5,
        color: "#FF4500",
        glow: true,
        oscillate: true
      };
      bossActive = true;
    }

function drawBoss() {
    if (boss && bossActive) {
        ctx.fillStyle = "#FF4500"; // Boss color
        ctx.fillRect(boss.x, boss.y, boss.width, boss.height);

        // Example: Add simple movement or effects
        boss.y += boss.speed * Math.sin(Date.now() / 1000);

        // Draw boss health bar
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(boss.x, boss.y - 10, (boss.hp / 150) * boss.width, 5);
    }
}
   

    function handleBossDamage() {
      bullets.forEach((bullet, bIndex) => {
        if (
          boss &&
          bullet.x < boss.x + boss.width &&
          bullet.x + bullet.width > boss.x &&
          bullet.y < boss.y + boss.height &&
          bullet.y + bullet.height > boss.y
        ) {
          boss.hp -= 10;
          bullets.splice(bIndex, 1);
          if (boss.hp <= 0) {
            boss = null;
            bossActive = false;
            level++;
            alert("Boss Defeated! Proceeding to the next level.");
          }
        }
      });
    }

    function gameLoop() {ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    updateShooterPosition(); // Update shooter based on keyboard input
      drawBoss();
      handleBossDamage();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawShooter();
      drawHp();

      ctx.font = "20px Arial";
      ctx.fillStyle = "#fff";
      ctx.fillText(`Level: ${level}`, 20, 70);
      ctx.fillText(`Score: ${score}`, 20, 100);

      if (score > level * 20) level++;

      enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;
        if (enemy.type === "circle") {
          ctx.beginPath();
          ctx.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.width / 2, 0, Math.PI * 2);
          ctx.fillStyle = "#f00";
          ctx.fill();
        } else {
          ctx.fillStyle = "#f00";
          ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }

        if (
          enemy.x < shooter.x + shooter.width &&
          enemy.x + enemy.width > shooter.x &&
          enemy.y + enemy.height > shooter.y
        ) {
          enemies.splice(index, 1);
          hp -= 10;
          if (hp <= 0) {
            gameActive = false;
            alert(`Game Over! Final Score: ${score}`);
          }
        }

        
    if (enemy.y > canvas.height) enemies.splice(index, 1);
    // Add an energy power-up when an enemy dies
    if (!enemies.includes(enemy)) {
        const powerup = {
            x: Math.random() * (canvas.width - 20),
            y: 0,
            size: 20,
            speed: 2,
            emoji: "⚡" // Energy power-up symbol
        };
        powerups.push(powerup);
    }
    
      });

      ctx.fillStyle = "#fff";
      bullets.forEach((bullet, bIndex) => {
        bullet.y -= bullet.speed;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        if (bullet.y < 0) bullets.splice(bIndex, 1);

        enemies.forEach((enemy, eIndex) => {
          if (
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y
          ) {
            enemies.splice(eIndex, 1);
            bullets.splice(bIndex, 1);
            score++;
          }
        });
      });

      powerups.forEach((powerup, index) => {
        powerup.y += powerup.speed;
        ctx.font = "20px Arial";
        ctx.fillText(powerup.emoji, powerup.x, powerup.y);

        if (
          powerup.x < shooter.x + shooter.width &&
          powerup.x + powerup.size > shooter.x &&
          powerup.y + powerup.size > shooter.y
        ) {
          
    
    if (powerup.emoji === "⚡") {
        if (window.handleTap) {
            // Simulate a tap for energy gain in Stargate game
            window.handleTap();
        }
        powerups.splice(index, 1);
    } else if (powerup.emoji === "💥") {
    
        if (window.sharedEnergyCount) {
            const energyGain = Math.floor(Math.random() * 5) + 1; // Random energy gain between 1 and 5
            window.energyCount += energyGain;
        }
        powerups.splice(index, 1);
    } else if (powerup.emoji === "💥") {
    
            powerupType = "double";
          } else if (powerup.emoji === "❤️") {
            hp = Math.min(100, hp + 20);
          }
          powerups.splice(index, 1);
        }

        if (powerup.y > canvas.height) powerups.splice(index, 1);
      });

      if (gameActive) requestAnimationFrame(gameLoop);
    }

    function shootBullet() {
      const bullet = {
        x: shooter.x + shooter.width / 2 - 5,
        y: shooter.y - 20,
        width: 10,
        height: 20,
        speed: 8
      };
      
    bullets.push(bullet);
    if (window.handleTap) {
        // Simulate a tap for energy gain in Stargate game when shooting
        window.handleTap();
    }
    

      if (powerupType === "double") {
        bullets.push({
          x: shooter.x + shooter.width / 2 + 15,
          y: shooter.y - 20,
          width: 10,
          height: 20,
          speed: 8
        });
      }
    }

    let touchStartX = 0;
    function handleTouchStart(e) {
      touchStartX = e.touches[0].clientX;
    }

    function handleTouchMove(e) {
      const touchX = e.touches[0].clientX;
      const deltaX = touchX - touchStartX;
      shooter.x = Math.max(0, Math.min(canvas.width - shooter.width, shooter.x + deltaX));
      touchStartX = touchX;
    }

    function handleTouchEnd(e) {
      shootBullet();
    }

    unpackButton.addEventListener("click", unpackLayer);
    resetButton.addEventListener("click", resetGame);
  
  
        document.getElementById('fullscreen-button').addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        });

        document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault(); // Prevent pinch-to-zoom
    }
}, { passive: false });

document.addEventListener('gesturestart', function(event) {
    event.preventDefault(); // Disable gesture-based zoom
});
   
        
       
            let autofireInterval = null; // To manage autofire
let isDragging = false; // Flag to check if the user is dragging

function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    isDragging = true;

    // Start autofire when dragging begins
    if (!autofireInterval) {
        autofireInterval = setInterval(() => {
            if (isDragging) {
                shootBullet();
            }
        }, 200); // Adjust rate of fire here (200ms interval)
    }
}

function handleTouchMove(e) {
    const touchX = e.touches[0].clientX;
    const deltaX = touchX - touchStartX;
    shooter.x = Math.max(0, Math.min(canvas.width - shooter.width, shooter.x + deltaX));
    touchStartX = touchX;
}

function handleTouchEnd(e) {
    isDragging = false;

    // Stop autofire when dragging ends
    if (autofireInterval) {
        clearInterval(autofireInterval);
        autofireInterval = null;
    }
}


// Prevent double-tap zooming and pinch zoom
document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1) {
        event.preventDefault(); // Disable pinch zoom
    }
}, { passive: false });

document.addEventListener('gesturestart', (event) => {
    event.preventDefault(); // Disable gesture zoom
});    
        


// Prevent unwanted long-press or pinch-zoom actions only on mobile
if ('ontouchstart' in window) {
    // Disable context menu for touch devices
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });

    // Prevent pinch-zoom
    document.addEventListener('touchstart', (event) => {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    // Disable gesture zoom
    document.addEventListener('gesturestart', (event) => {
        event.preventDefault();
    });
}

const canvas = document.getElementById("gameCanvas");

// Prevent right-click context menu
canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault(); // Disable right-click menu only on the canvas
});

// Prevent pinch-zoom and multi-touch gestures
canvas.addEventListener("touchstart", (event) => {
    if (event.touches.length > 1) {
        event.preventDefault(); // Disable multi-touch gestures
    }
}, { passive: false });

// Prevent gesture zoom
canvas.addEventListener("gesturestart", (event) => {
    event.preventDefault(); // Disable gesture-based zoom
});

// Mouse control for shooter
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect(); // Get canvas position
    const mouseX = e.clientX - rect.left; // Calculate mouse X relative to canvas
    shooter.x = Math.max(0, Math.min(canvas.width - shooter.width, mouseX - shooter.width / 2));
});

// Mouse click to shoot
canvas.addEventListener("click", () => {
    shootBullet();
});</script>
<script>// Variables to track keyboard state
let keysPressed = {};

// Add event listeners for keydown and keyup
document.addEventListener("keydown", (e) => {
    keysPressed[e.key] = true;

    // Shoot bullet when spacebar is pressed
    if (e.key === " ") {
        shootBullet();
    }
});

document.addEventListener("keyup", (e) => {
    keysPressed[e.key] = false;
});

// Update shooter position based on keys pressed
function updateShooterPosition() {
    if (keysPressed["ArrowLeft"] || keysPressed["a"]) {
        shooter.x = Math.max(0, shooter.x - 5); // Move left
    }
    if (keysPressed["ArrowRight"] || keysPressed["d"]) {
        shooter.x = Math.min(canvas.width - shooter.width, shooter.x + 5); // Move right
    }
}

    