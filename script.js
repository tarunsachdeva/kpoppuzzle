class KPopPuzzleGame {
    constructor() {
        this.currentScreen = 'splash-screen';
        this.selectedImage = null;
        this.puzzleState = [];
        this.emptyTilePosition = { row: 3, col: 3 };
        this.timer = 0;
        this.timerInterval = null;
        this.moveCount = 0;
        this.gameStarted = false;
        
        // Available images - will be populated dynamically
        this.availableImages = [];
        this.generatedImages = [
            { name: 'Blue Marble Earth', isGenerated: true },
            { name: 'Cherry Blossoms', isGenerated: true },
            { name: 'Ocean Waves', isGenerated: true },
            { name: 'Mountain Sunset', isGenerated: true },
            { name: 'City Lights', isGenerated: true },
            { name: 'Forest Path', isGenerated: true }
        ];
        
        this.initializeGame();
    }
    
    async initializeGame() {
        this.setupEventListeners();
        await this.loadAvailableImages();
        this.createSampleImages();
        this.showScreen('splash-screen');
    }
    
    setupEventListeners() {
        // Splash screen buttons
        document.getElementById('start-btn').addEventListener('click', () => {
            this.showImageSelection();
        });
        
        document.getElementById('leaderboard-btn').addEventListener('click', () => {
            this.showLeaderboard();
        });
        
        // Navigation buttons
        document.getElementById('back-to-splash').addEventListener('click', () => {
            this.showScreen('splash-screen');
        });
        
        document.getElementById('back-to-selection').addEventListener('click', () => {
            this.showImageSelection();
        });
        
        document.getElementById('back-from-leaderboard').addEventListener('click', () => {
            this.showScreen('splash-screen');
        });
        
        // Game controls
        document.getElementById('shuffle-btn').addEventListener('click', () => {
            this.shufflePuzzle();
        });
        
        // Modal buttons
        document.getElementById('save-score').addEventListener('click', () => {
            this.saveScore();
        });
        
        document.getElementById('play-again').addEventListener('click', () => {
            this.hideModal();
            this.showImageSelection();
        });
        
        // Leaderboard
        document.getElementById('clear-scores').addEventListener('click', () => {
            this.clearLeaderboard();
        });
    }
    
    async loadAvailableImages() {
        // Embed image list directly to work with static file loading
        const imageList = [
            "kpop1.png",
            "kpop2.png", 
            "mira.png",
            "rumi.png",
            "zoey.png"
        ];
        
        for (const filename of imageList) {
            this.availableImages.push({
                name: this.formatImageName(filename),
                src: `images/${filename}`,
                isGenerated: false
            });
        }
        
        console.log(`Loaded ${this.availableImages.length} images`);
    }
    
    async tryLoadImage(filename) {
        try {
            const exists = await this.checkImageExists(`images/${filename}`);
            if (exists) {
                console.log(`Found: ${filename}`);
                return {
                    name: this.formatImageName(filename),
                    src: `images/${filename}`,
                    isGenerated: false
                };
            }
        } catch (error) {
            // Ignore errors, just means image doesn't exist
        }
        return null;
    }
    
    checkImageExists(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }
    
    formatImageName(filename) {
        // Remove extension and format the name nicely
        const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
        return nameWithoutExt
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }
    
    createSampleImages() {
        // Create sample images using canvas with different patterns
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
        
        const patterns = [
            () => this.createEarthPattern(ctx),
            () => this.createCherryPattern(ctx),
            () => this.createOceanPattern(ctx),
            () => this.createMountainPattern(ctx),
            () => this.createCityPattern(ctx),
            () => this.createForestPattern(ctx)
        ];
        
        // Create generated images and add them to available images
        patterns.forEach((pattern, index) => {
            pattern();
            const dataUrl = canvas.toDataURL();
            const generatedImage = {
                name: this.generatedImages[index].name,
                dataUrl: dataUrl,
                isGenerated: true
            };
            this.availableImages.push(generatedImage);
        });
    }
    
    createEarthPattern(ctx) {
        // Create a blue marble earth-like pattern
        const gradient = ctx.createRadialGradient(200, 200, 50, 200, 200, 200);
        gradient.addColorStop(0, '#4a90e2');
        gradient.addColorStop(0.3, '#2171b5');
        gradient.addColorStop(0.7, '#08519c');
        gradient.addColorStop(1, '#08306b');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 400);
        
        // Add some "continents"
        ctx.fillStyle = '#8b4513';
        ctx.beginPath();
        ctx.arc(150, 150, 60, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(280, 250, 40, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#228b22';
        ctx.beginPath();
        ctx.arc(120, 300, 30, 0, Math.PI * 2);
        ctx.fill();
    }
    
    createCherryPattern(ctx) {
        // Pink gradient background
        const gradient = ctx.createLinearGradient(0, 0, 400, 400);
        gradient.addColorStop(0, '#ffc0cb');
        gradient.addColorStop(1, '#ff69b4');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 400);
        
        // Add cherry blossom petals
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * 400;
            const y = Math.random() * 400;
            ctx.beginPath();
            ctx.arc(x, y, Math.random() * 15 + 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    createOceanPattern(ctx) {
        // Ocean wave pattern
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, '#87ceeb');
        gradient.addColorStop(1, '#006994');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 400);
        
        // Add wave patterns
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 50);
            for (let x = 0; x < 400; x += 20) {
                ctx.lineTo(x, i * 50 + Math.sin(x * 0.02) * 10);
            }
            ctx.stroke();
        }
    }
    
    createMountainPattern(ctx) {
        // Mountain sunset
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, '#ff6b35');
        gradient.addColorStop(0.7, '#f7931e');
        gradient.addColorStop(1, '#2d1b69');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 400);
        
        // Add mountain silhouettes
        ctx.fillStyle = '#2d1b69';
        ctx.beginPath();
        ctx.moveTo(0, 300);
        ctx.lineTo(100, 200);
        ctx.lineTo(200, 250);
        ctx.lineTo(300, 180);
        ctx.lineTo(400, 220);
        ctx.lineTo(400, 400);
        ctx.lineTo(0, 400);
        ctx.fill();
    }
    
    createCityPattern(ctx) {
        // City lights at night
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, 400, 400);
        
        // Add building silhouettes
        ctx.fillStyle = '#16213e';
        for (let i = 0; i < 10; i++) {
            const x = i * 40;
            const height = Math.random() * 200 + 100;
            ctx.fillRect(x, 400 - height, 35, height);
        }
        
        // Add lights
        ctx.fillStyle = '#ffd700';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * 400;
            const y = Math.random() * 300 + 100;
            ctx.fillRect(x, y, 3, 3);
        }
    }
    
    createForestPattern(ctx) {
        // Forest scene
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, '#87ceeb');
        gradient.addColorStop(0.3, '#90ee90');
        gradient.addColorStop(1, '#228b22');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 400);
        
        // Add trees
        ctx.fillStyle = '#8b4513';
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * 400;
            const y = Math.random() * 200 + 200;
            ctx.fillRect(x, y, 10, 50);
        }
        
        ctx.fillStyle = '#006400';
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * 400;
            const y = Math.random() * 200 + 150;
            ctx.beginPath();
            ctx.arc(x + 5, y, 20, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById(screenId).classList.add('active');
        this.currentScreen = screenId;
    }
    
    showImageSelection() {
        const imageGrid = document.getElementById('image-grid');
        imageGrid.innerHTML = '';
        
        this.availableImages.forEach((image, index) => {
            const imageOption = document.createElement('div');
            imageOption.className = 'image-option';
            
            // Use src for file-based images, dataUrl for generated images
            const imageSrc = image.isGenerated ? image.dataUrl : image.src;
            
            imageOption.innerHTML = `
                <img src="${imageSrc}" alt="${image.name}">
                <div class="image-name">${image.name}</div>
            `;
            
            imageOption.addEventListener('click', () => {
                this.selectImage(index);
            });
            
            imageGrid.appendChild(imageOption);
        });
        
        this.showScreen('image-selection');
    }
    
    selectImage(imageIndex) {
        this.selectedImage = this.availableImages[imageIndex];
        this.initializePuzzle();
        this.showScreen('game-screen');
    }
    
    initializePuzzle() {
        this.puzzleState = [];
        this.emptyTilePosition = { row: 3, col: 3 };
        this.timer = 0;
        this.moveCount = 0;
        this.gameStarted = false;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        // Initialize puzzle state (0-14 for tiles, 15 for empty)
        for (let i = 0; i < 16; i++) {
            this.puzzleState.push(i);
        }
        
        this.renderPuzzle();
        this.updateStats();
        
        // Set reference image
        const referenceSrc = this.selectedImage.isGenerated ? this.selectedImage.dataUrl : this.selectedImage.src;
        document.getElementById('reference-img').src = referenceSrc;
    }
    
    renderPuzzle() {
        const puzzleGrid = document.getElementById('puzzle-grid');
        puzzleGrid.innerHTML = '';
        
        for (let i = 0; i < 16; i++) {
            const tile = document.createElement('div');
            tile.className = 'puzzle-tile';
            tile.dataset.position = i;
            
            const tileNumber = this.puzzleState[i];
            
            if (tileNumber === 15) {
                // Empty tile
                tile.classList.add('empty');
            } else {
                // Calculate background position
                const row = Math.floor(tileNumber / 4);
                const col = tileNumber % 4;
                const bgX = -col * 100;
                const bgY = -row * 100;
                
                const imageSrc = this.selectedImage.isGenerated ? this.selectedImage.dataUrl : this.selectedImage.src;
                tile.style.backgroundImage = `url(${imageSrc})`;
                tile.style.backgroundPosition = `${bgX}px ${bgY}px`;
                
                // Add tile number
                const numberDiv = document.createElement('div');
                numberDiv.className = 'tile-number';
                numberDiv.textContent = tileNumber + 1;
                tile.appendChild(numberDiv);
                
                tile.addEventListener('click', () => {
                    this.moveTile(i);
                });
            }
            
            puzzleGrid.appendChild(tile);
        }
    }
    
    moveTile(position) {
        if (!this.canMoveTile(position)) return;
        
        if (!this.gameStarted) {
            this.startTimer();
            this.gameStarted = true;
        }
        
        const row = Math.floor(position / 4);
        const col = position % 4;
        const emptyRow = this.emptyTilePosition.row;
        const emptyCol = this.emptyTilePosition.col;
        const emptyPosition = emptyRow * 4 + emptyCol;
        
        // Swap tiles
        [this.puzzleState[position], this.puzzleState[emptyPosition]] = 
        [this.puzzleState[emptyPosition], this.puzzleState[position]];
        
        // Update empty position
        this.emptyTilePosition = { row, col };
        
        this.moveCount++;
        this.updateStats();
        this.renderPuzzle();
        
        // Check for win
        if (this.checkWin()) {
            this.handleWin();
        }
    }
    
    canMoveTile(position) {
        const row = Math.floor(position / 4);
        const col = position % 4;
        const emptyRow = this.emptyTilePosition.row;
        const emptyCol = this.emptyTilePosition.col;
        
        // Check if tile is adjacent to empty space
        const rowDiff = Math.abs(row - emptyRow);
        const colDiff = Math.abs(col - emptyCol);
        
        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }
    
    shufflePuzzle() {
        // Reset game state
        this.gameStarted = false;
        this.timer = 0;
        this.moveCount = 0;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        // Shuffle by making random valid moves
        for (let i = 0; i < 1000; i++) {
            const validMoves = this.getValidMoves();
            if (validMoves.length > 0) {
                const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
                const emptyPosition = this.emptyTilePosition.row * 4 + this.emptyTilePosition.col;
                
                // Swap without counting as a move
                [this.puzzleState[randomMove], this.puzzleState[emptyPosition]] = 
                [this.puzzleState[emptyPosition], this.puzzleState[randomMove]];
                
                const row = Math.floor(randomMove / 4);
                const col = randomMove % 4;
                this.emptyTilePosition = { row, col };
            }
        }
        
        this.renderPuzzle();
        this.updateStats();
    }
    
    getValidMoves() {
        const moves = [];
        const emptyRow = this.emptyTilePosition.row;
        const emptyCol = this.emptyTilePosition.col;
        
        // Check all four directions
        const directions = [
            { row: -1, col: 0 }, // Up
            { row: 1, col: 0 },  // Down
            { row: 0, col: -1 }, // Left
            { row: 0, col: 1 }   // Right
        ];
        
        directions.forEach(dir => {
            const newRow = emptyRow + dir.row;
            const newCol = emptyCol + dir.col;
            
            if (newRow >= 0 && newRow < 4 && newCol >= 0 && newCol < 4) {
                moves.push(newRow * 4 + newCol);
            }
        });
        
        return moves;
    }
    
    checkWin() {
        for (let i = 0; i < 15; i++) {
            if (this.puzzleState[i] !== i) {
                return false;
            }
        }
        return this.puzzleState[15] === 15;
    }
    
    handleWin() {
        clearInterval(this.timerInterval);
        
        // Add winning animation
        document.querySelector('.puzzle-grid').classList.add('winning');
        
        setTimeout(() => {
            document.getElementById('final-time').textContent = this.formatTime(this.timer);
            document.getElementById('final-moves').textContent = this.moveCount;
            this.showModal();
        }, 1500);
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            this.updateStats();
        }, 1000);
    }
    
    updateStats() {
        document.getElementById('timer').textContent = this.formatTime(this.timer);
        document.getElementById('move-counter').textContent = this.moveCount;
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    showModal() {
        document.getElementById('win-modal').classList.add('active');
        document.getElementById('player-name').focus();
    }
    
    hideModal() {
        document.getElementById('win-modal').classList.remove('active');
        document.querySelector('.puzzle-grid').classList.remove('winning');
        document.getElementById('player-name').value = '';
    }
    
    saveScore() {
        const playerName = document.getElementById('player-name').value.trim();
        if (!playerName) {
            alert('Please enter your name!');
            return;
        }
        
        const score = {
            name: playerName,
            time: this.timer,
            moves: this.moveCount,
            image: this.selectedImage.name,
            date: new Date().toISOString()
        };
        
        let leaderboard = JSON.parse(localStorage.getItem('kpop-puzzle-leaderboard') || '[]');
        leaderboard.push(score);
        
        // Sort by time (ascending)
        leaderboard.sort((a, b) => a.time - b.time);
        
        // Keep only top 10
        leaderboard = leaderboard.slice(0, 10);
        
        localStorage.setItem('kpop-puzzle-leaderboard', JSON.stringify(leaderboard));
        
        this.hideModal();
        this.showLeaderboard();
    }
    
    showLeaderboard() {
        const leaderboard = JSON.parse(localStorage.getItem('kpop-puzzle-leaderboard') || '[]');
        const leaderboardList = document.getElementById('leaderboard-list');
        
        if (leaderboard.length === 0) {
            leaderboardList.innerHTML = '<p style="color: #718096; font-style: italic;">No scores yet. Be the first to play!</p>';
        } else {
            leaderboardList.innerHTML = leaderboard.map((score, index) => `
                <div class="leaderboard-entry ${index < 3 ? 'top-3' : ''}">
                    <span class="leaderboard-rank">#${index + 1}</span>
                    <span class="leaderboard-name">${score.name}</span>
                    <span class="leaderboard-time">${this.formatTime(score.time)}</span>
                </div>
            `).join('');
        }
        
        this.showScreen('leaderboard-screen');
    }
    
    clearLeaderboard() {
        if (confirm('Are you sure you want to clear all scores?')) {
            localStorage.removeItem('kpop-puzzle-leaderboard');
            this.showLeaderboard();
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new KPopPuzzleGame();
});
