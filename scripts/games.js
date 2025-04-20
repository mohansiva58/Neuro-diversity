// games.js - JavaScript for the games section functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize category filtering
    setupCategoryFilters();
    
    // Simulate game loading times
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const gameId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            loadGame(gameId);
        });
    });
    
    // Add event listener for closing the game
    const closeButton = document.getElementById('close-game');
    if (closeButton) {
        closeButton.addEventListener('click', closeGame);
    }
});

// Set up category filter functionality
function setupCategoryFilters() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const gameCards = document.querySelectorAll('.game-card');
    
    // Add click event listeners to each tab
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the selected category
            const selectedCategory = this.getAttribute('data-category');
            
            // Show/hide game cards based on selected category
            gameCards.forEach(card => {
                if (selectedCategory === 'all' || card.getAttribute('data-categories').includes(selectedCategory)) {
                    card.style.display = 'block';
                    // Add animation for appearing cards
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Check if any games are visible
            checkNoGames();
        });
    });
}

// Check if no games are visible and display a message if needed
function checkNoGames() {
    const visibleGames = document.querySelectorAll('.game-card[style="display: block"]');
    const gamesGrid = document.querySelector('.games-grid');
    
    // Remove existing message if it exists
    const existingMessage = document.querySelector('.no-games-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // If no games are visible, show a message
    if (visibleGames.length === 0) {
        const noGamesMessage = document.createElement('div');
        noGamesMessage.className = 'no-games-message';
        noGamesMessage.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>No games found</h3>
            <p>No games match the selected category. Try selecting a different category.</p>
        `;
        gamesGrid.appendChild(noGamesMessage);
    }
}

// Game loading function
function loadGame(gameId) {
    // Create overlay
    const overlay = document.createElement('div');
   
    document.body.appendChild(overlay);
    
    // Show game container
    const gameContainer = document.getElementById('game-container');
    gameContainer.classList.remove('hidden');
    
    // Set game title based on game ID
    const gameTitle = document.getElementById('game-title');
    gameTitle.textContent = getGameTitle(gameId);
    
    // Show loading animation
    const gameContent = document.getElementById('game-content');
    gameContent.innerHTML = `
        <div class="game-loading">
            <div class="spinner"></div>
            <p>Loading game...</p>
        </div>
    `;
    
    // Simulate loading time (would be replaced with actual game loading)
    setTimeout(() => {
        loadGameContent(gameId, gameContent);
    }, 1500);
}

// Get game title from game ID
function getGameTitle(gameId) {
    const gameTitles = {
        'pattern-matching': 'Pattern Matching',
        'memory-tiles': 'Memory Tiles',
        'emotion-explorer': 'Emotion Explorer',
        'situation-station': 'Situation Station',
        'sensory-art': 'Sensory Art Studio',
        'doodle-world': 'Doodle World',
        'word-builder': 'Word Builder',
        'story-maker': 'Story Maker',
        'bubble-pop': 'Bubble Pop',
        'shape-sorter': 'Shape Sorter'
    };
    
    return gameTitles[gameId] || 'Game';
}

// Load game content based on game ID
function loadGameContent(gameId, gameContentElement) {
    // This would be replaced with actual game loading logic
    // For now, we'll just show a placeholder
    
    switch(gameId) {
        case 'pattern-matching':
            gameContentElement.innerHTML = createPatternMatchingGame();
            initializePatternMatchingGame();
            break;
        case 'memory-tiles':
            gameContentElement.innerHTML = createMemoryTilesGame();
            initializeMemoryTilesGame();
            break;
        case 'bubble-pop':
            gameContentElement.innerHTML = createBubblePopGame();
            initializeBubblePopGame();
            break;
        default:
            gameContentElement.innerHTML = `
                <div class="game-placeholder">
                    <div style="text-align: center;">
                        <i class="fas fa-gamepad" style="font-size: 5rem; color: #a777e3; margin-bottom: 1rem;"></i>
                        <h3>Game Coming Soon!</h3>
                        <p>The "${getGameTitle(gameId)}" game is currently in development.</p>
                        <p>Check back soon to enjoy this exciting activity!</p>
                    </div>
                </div>
            `;
            break;
    }
}

// Close game function
function closeGame() {
    // Hide game container
    const gameContainer = document.getElementById('game-container');
    gameContainer.classList.add('hidden');
    
    // Remove overlay
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.remove();
    }
    
    // Clear game content
    const gameContent = document.getElementById('game-content');
    gameContent.innerHTML = '';
}

// Create Pattern Matching Game
function createPatternMatchingGame() {
    return `
        <div style="width: 100%; max-width: 600px; margin: 0 auto;">
            <div style="margin-bottom: 1rem; text-align: center;">
                <p>Match the pattern on the left by selecting the correct colored shapes on the right.</p>
                <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                    <div><strong>Level: <span id="pattern-level">1</span></strong></div>
                    <div><strong>Score: <span id="pattern-score">0</span></strong></div>
                </div>
            </div>
            
            <div style="display: flex; gap: 2rem; margin-bottom: 2rem;">
                <div style="flex: 1; background-color: #f0f0f0; padding: 1rem; border-radius: 0.5rem; min-height: 300px;">
                    <h4 style="text-align: center; margin-bottom: 1rem;">Pattern to Match</h4>
                    <div id="pattern-target" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;"></div>
                </div>
                
                <div style="flex: 1; background-color: #f0f0f0; padding: 1rem; border-radius: 0.5rem; min-height: 300px;">
                    <h4 style="text-align: center; margin-bottom: 1rem;">Your Selection</h4>
                    <div id="pattern-selection" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;"></div>
                </div>
            </div>
            
            <div style="text-align: center;">
                <h4 style="margin-bottom: 1rem;">Available Shapes</h4>
                <div id="pattern-pieces" style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;"></div>
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
                <button id="pattern-check" style="padding: 0.8rem 2rem; background: linear-gradient(135deg, #6e8efb, #a777e3); color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
                    Check Pattern
                </button>
                <button id="pattern-reset" style="padding: 0.8rem 2rem; background-color: #f0f0f0; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; margin-left: 1rem;">
                    Reset
                </button>
            </div>
        </div>
    `;
}

// Initialize Pattern Matching Game
function initializePatternMatchingGame() {
    const shapes = ['circle', 'square', 'triangle'];
    const colors = ['#FF5E62', '#00B9FF', '#A8E063'];
    let currentLevel = 1;
    let score = 0;
    
    const targetContainer = document.getElementById('pattern-target');
    const selectionContainer = document.getElementById('pattern-selection');
    const piecesContainer = document.getElementById('pattern-pieces');
    const checkButton = document.getElementById('pattern-check');
    const resetButton = document.getElementById('pattern-reset');
    const levelElement = document.getElementById('pattern-level');
    const scoreElement = document.getElementById('pattern-score');
    
    // Create a random pattern
    function createPattern() {
        targetContainer.innerHTML = '';
        selectionContainer.innerHTML = '';
        
        // Number of cells increases with level
        const cellCount = Math.min(3 + Math.floor(currentLevel / 2), 9);
        
        for (let i = 0; i < cellCount; i++) {
            // Create target pattern cell
            const shapeIndex = Math.floor(Math.random() * shapes.length);
            const colorIndex = Math.floor(Math.random() * colors.length);
            
            const targetCell = document.createElement('div');
            targetCell.style.aspectRatio = '1/1';
            targetCell.style.display = 'flex';
            targetCell.style.justifyContent = 'center';
            targetCell.style.alignItems = 'center';
            targetCell.dataset.shape = shapes[shapeIndex];
            targetCell.dataset.color = colors[colorIndex];
            
            // Add shape to cell
            const shape = document.createElement('div');
            shape.style.width = '80%';
            shape.style.height = '80%';
            
            if (shapes[shapeIndex] === 'circle') {
                shape.style.borderRadius = '50%';
            } else if (shapes[shapeIndex] === 'triangle') {
                shape.style.width = '0';
                shape.style.height = '0';
                shape.style.borderLeft = '30px solid transparent';
                shape.style.borderRight = '30px solid transparent';
                shape.style.borderBottom = `60px solid ${colors[colorIndex]}`;
            }
            
            shape.style.backgroundColor = shapes[shapeIndex] !== 'triangle' ? colors[colorIndex] : 'transparent';
            targetCell.appendChild(shape);
            targetContainer.appendChild(targetCell);
            
            // Create selection cell (empty)
            const selectionCell = document.createElement('div');
            selectionCell.style.aspectRatio = '1/1';
            selectionCell.style.border = '2px dashed #ccc';
            selectionCell.style.borderRadius = '0.25rem';
            selectionCell.style.display = 'flex';
            selectionCell.style.justifyContent = 'center';
            selectionCell.style.alignItems = 'center';
            selectionCell.dataset.index = i;
            selectionContainer.appendChild(selectionCell);
        }
        
        // Create available pieces
        piecesContainer.innerHTML = '';
        
        // Create all combinations of shapes and colors
        shapes.forEach(shape => {
            colors.forEach(color => {
                const piece = document.createElement('div');
                piece.style.width = '60px';
                piece.style.height = '60px';
                piece.style.display = 'flex';
                piece.style.justifyContent = 'center';
                piece.style.alignItems = 'center';
                piece.style.cursor = 'pointer';
                piece.dataset.shape = shape;
                piece.dataset.color = color;
                
                // Add shape to piece
                const shapeElement = document.createElement('div');
                shapeElement.style.width = '80%';
                shapeElement.style.height = '80%';
                
                if (shape === 'circle') {
                    shapeElement.style.borderRadius = '50%';
                } else if (shape === 'triangle') {
                    shapeElement.style.width = '0';
                    shapeElement.style.height = '0';
                    shapeElement.style.borderLeft = '20px solid transparent';
                    shapeElement.style.borderRight = '20px solid transparent';
                    shapeElement.style.borderBottom = `40px solid ${color}`;
                }
                
                shapeElement.style.backgroundColor = shape !== 'triangle' ? color : 'transparent';
                piece.appendChild(shapeElement);
                
                // Add click event to piece
                piece.addEventListener('click', function() {
                    const selectedCell = document.querySelector(`#pattern-selection div:not([data-selected]):first-child`);
                    if (selectedCell) {
                        const clonedPiece = this.cloneNode(true);
                        clonedPiece.style.width = '100%';
                        clonedPiece.style.height = '100%';
                        clonedPiece.style.cursor = 'default';
                        
                        selectedCell.innerHTML = '';
                        selectedCell.appendChild(clonedPiece);
                        selectedCell.dataset.selected = 'true';
                        selectedCell.dataset.shape = this.dataset.shape;
                        selectedCell.dataset.color = this.dataset.color;
                    }
                });
                
                piecesContainer.appendChild(piece);
            });
        });
    }
    
    // Check if pattern matches
    checkButton.addEventListener('click', function() {
        const targetCells = targetContainer.children;
        const selectionCells = selectionContainer.children;
        
        let allCorrect = true;
        
        for (let i = 0; i < targetCells.length; i++) {
            const targetCell = targetCells[i];
            const selectionCell = selectionCells[i];
            
            if (!selectionCell.dataset.selected || 
                selectionCell.dataset.shape !== targetCell.dataset.shape || 
                selectionCell.dataset.color !== targetCell.dataset.color) {
                allCorrect = false;
                break;
            }
        }
        
        if (allCorrect) {
            score += currentLevel * 10;
            currentLevel++;
            
            scoreElement.textContent = score;
            levelElement.textContent = currentLevel;
            
            // Show success message
            alert('Great job! Moving to the next level.');
            
            // Create new pattern
            createPattern();
        } else {
            alert('Not quite right. Try again!');
        }
    });
    
    // Reset current pattern
    resetButton.addEventListener('click', function() {
        const selectionCells = selectionContainer.children;
        
        for (let i = 0; i < selectionCells.length; i++) {
            selectionCells[i].innerHTML = '';
            delete selectionCells[i].dataset.selected;
            delete selectionCells[i].dataset.shape;
            delete selectionCells[i].dataset.color;
        }
    });
    
    // Initialize the game
    createPattern();
}

// Create Memory Tiles Game
function createMemoryTilesGame() {
    return `
        <div style="width: 100%; max-width: 600px; margin: 0 auto;">
            <div style="margin-bottom: 1rem; text-align: center;">
                <p>Find all matching pairs of tiles. Click on tiles to flip them and find matches!</p>
                <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                    <div><strong>Moves: <span id="memory-moves">0</span></strong></div>
                    <div><strong>Pairs Found: <span id="memory-pairs">0</span>/<span id="memory-total-pairs">8</span></strong></div>
                </div>
            </div>
            
            <div id="memory-board" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.8rem; margin-bottom: 2rem;"></div>
            
            <div style="text-align: center; margin-top: 2rem;">
                <button id="memory-new-game" style="padding: 0.8rem 2rem; background: linear-gradient(135deg, #6e8efb, #a777e3); color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
                    New Game
                </button>
            </div>
        </div>
    `;
}

// Initialize Memory Tiles Game
function initializeMemoryTilesGame() {
    const board = document.getElementById('memory-board');
    const movesElement = document.getElementById('memory-moves');
    const pairsFoundElement = document.getElementById('memory-pairs');
    const totalPairsElement = document.getElementById('memory-total-pairs');
    const newGameButton = document.getElementById('memory-new-game');
    
    const emojis = ['🐶', '🐱', '🦁', '🐼', '🐸', '🦊', '🐻', '🐨'];
    let tiles = [];
    let flippedTiles = [];
    let moves = 0;
    let pairsFound = 0;
    let canFlip = true;
    
    // Create the game board
    function createBoard() {
        board.innerHTML = '';
        flippedTiles = [];
        moves = 0;
        pairsFound = 0;
        
        movesElement.textContent = moves;
        pairsFoundElement.textContent = pairsFound;
        
        // Create array with pairs of emojis
        tiles = [...emojis, ...emojis];
        
        // Shuffle tiles
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
        
        // Create tile elements
        tiles.forEach((emoji, index) => {
            const tile = document.createElement('div');
            tile.style.aspectRatio = '1/1';
            tile.style.backgroundColor = '#6e8efb';
            tile.style.borderRadius = '0.5rem';
            tile.style.display = 'flex';
            tile.style.justifyContent = 'center';
            tile.style.alignItems = 'center';
            tile.style.fontSize = '2rem';
            tile.style.cursor = 'pointer';
            tile.style.transform = 'rotateY(180deg)';
            tile.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
            tile.dataset.index = index;
            tile.dataset.emoji = emoji;
            
            tile.addEventListener('click', () => flipTile(tile));
            
            board.appendChild(tile);
        });
    }
    
    // Flip a tile
    function flipTile(tile) {
        if (!canFlip || flippedTiles.includes(tile) || tile.dataset.matched) {
            return;
        }
        
        // Flip the tile
        tile.style.transform = 'rotateY(0deg)';
        tile.style.backgroundColor = 'white';
        tile.textContent = tile.dataset.emoji;
        
        flippedTiles.push(tile);
        
        // If two tiles are flipped, check for a match
        if (flippedTiles.length === 2) {
            moves++;
            movesElement.textContent = moves;
            
            canFlip = false;
            
            setTimeout(() => {
                const [tile1, tile2] = flippedTiles;
                
                if (tile1.dataset.emoji === tile2.dataset.emoji) {
                    // Match found
                    tile1.style.backgroundColor = '#a8e063';
                    tile2.style.backgroundColor = '#a8e063';
                    tile1.dataset.matched = 'true';
                    tile2.dataset.matched = 'true';
                    
                    pairsFound++;
                    pairsFoundElement.textContent = pairsFound;
                    
                    // Check if all pairs are found
                    if (pairsFound === emojis.length) {
                        setTimeout(() => {
                            alert(`Congratulations! You found all pairs in ${moves} moves.`);
                        }, 500);
                    }
                } else {
                    // No match
                    tile1.style.transform = 'rotateY(180deg)';
                    tile2.style.transform = 'rotateY(180deg)';
                    tile1.style.backgroundColor = '#6e8efb';
                    tile2.style.backgroundColor = '#6e8efb';
                    tile1.textContent = '';
                    tile2.textContent = '';
                }
                
                flippedTiles = [];
                canFlip = true;
            }, 1000);
        }
    }
    
    // New game button
    newGameButton.addEventListener('click', createBoard);
    
    // Initialize the game
    createBoard();
    totalPairsElement.textContent = emojis.length;
}

// Create Bubble Pop Game
function createBubblePopGame() {
    return `
        <div style="width: 100%; max-width: 600px; margin: 0 auto;">
            <div style="margin-bottom: 1rem; text-align: center;">
                <p>Pop as many bubbles as you can before time runs out!</p>
                <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
                    <div><strong>Time: <span id="bubble-time">60</span>s</strong></div>
                    <div><strong>Score: <span id="bubble-score">0</span></strong></div>
                </div>
            </div>
            
            <div id="bubble-container" style="position: relative; height: 400px; border: 2px solid #f0f0f0; border-radius: 0.5rem; overflow: hidden;"></div>
            
            <div style="text-align: center; margin-top: 2rem;">
                <button id="bubble-start" style="padding: 0.8rem 2rem; background: linear-gradient(135deg, #6e8efb, #a777e3); color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
                    Start Game
                </button>
            </div>
        </div>
    `;
}

// Initialize Bubble Pop Game
function initializeBubblePopGame() {
    const container = document.getElementById('bubble-container');
    const timeElement = document.getElementById('bubble-time');
    const scoreElement = document.getElementById('bubble-score');
    const startButton = document.getElementById('bubble-start');
    
    let score = 0;
    let timeLeft = 60;
    let gameInterval;
    let bubbleInterval;
    let gameActive = false;
    
    // Create a bubble
    function createBubble() {
        if (!gameActive) return;
        
        const bubble = document.createElement('div');
        const size = Math.floor(Math.random() * 40) + 30; // 30-70px
        const colors = ['#FF5E62', '#00B9FF', '#A8E063', '#FFC154', '#A777E3'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        bubble.style.position = 'absolute';
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.borderRadius = '50%';
        bubble.style.backgroundColor = color;
        bubble.style.cursor = 'pointer';
        bubble.style.left = `${Math.random() * (container.offsetWidth - size)}px`;
        bubble.style.top = `${container.offsetHeight}px`;
        bubble.style.transition = 'top 5s linear';
        
        bubble.addEventListener('click', () => {
            if (!gameActive) return;
            
            // Pop the bubble
            bubble.style.transition = 'transform 0.2s ease';
            bubble.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                bubble.remove();
                score += Math.floor(100 - size); // Smaller bubbles = more points
                scoreElement.textContent = score;
            }, 200);
        });
        
        container.appendChild(bubble);
        
        // Animate the bubble rising
        setTimeout(() => {
            bubble.style.top = `-${size}px`;
            
            // Remove bubble when it goes off screen
            setTimeout(() => {
                if (bubble.parentNode === container) {
                    bubble.remove();
                }
            }, 5000);
        }, 10);
    }
    
    // Start the game
    function startGame() {
        if (gameActive) return;
        
        gameActive = true;
        score = 0;
        timeLeft = 60;
        
        scoreElement.textContent = score;
        timeElement.textContent = timeLeft;
        startButton.textContent = 'Game Active';
        startButton.disabled = true;
        
        // Clear any existing bubbles
        container.innerHTML = '';
        
        // Start game timer
        gameInterval = setInterval(() => {
            timeLeft--;
            timeElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
        
        // Create bubbles at regular intervals
        bubbleInterval = setInterval(createBubble, 800);
    }
    
    // End the game
    function endGame() {
        gameActive = false;
        clearInterval(gameInterval);
        clearInterval(bubbleInterval);
        
        startButton.textContent = 'Play Again';
        startButton.disabled = false;
        
        // Show final score
        setTimeout(() => {
            alert(`Game Over! Your score: ${score}`);
        }, 500);
    }
    
    // Start button event
    startButton.addEventListener('click', startGame);
}

// Add keyboard support for closing the game with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const gameContainer = document.getElementById('game-container');
        if (!gameContainer.classList.contains('hidden')) {
            closeGame();
        }
    }
});