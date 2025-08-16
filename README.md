# 🎵 K-Pop Puzzle Game 🧩

A fun web-based sliding puzzle game where you unscramble beautiful images!

## Features

- **Dynamic Image Loading**: Automatically detects images in the `/images` directory and combines them with generated patterns
- **Multiple Images**: Choose from any square images you add plus 6 beautiful generated patterns
- **4x4 Grid Puzzle**: Classic sliding puzzle mechanics with numbered tiles
- **Timer & Move Counter**: Track your performance
- **Leaderboard**: Save your best scores locally
- **Responsive Design**: Works on desktop and mobile devices
- **Game-like UI**: Beautiful gradients and animations

## How to Play

1. **Start**: Click "Start Playing" on the splash screen
2. **Choose Image**: Select an image you want to unscramble
3. **Shuffle**: Click "Shuffle" to scramble the puzzle pieces
4. **Solve**: Click tiles adjacent to the empty space to move them
5. **Win**: Arrange all tiles in the correct order to win!

## Game Rules

- Only tiles adjacent to the empty space can be moved
- Click on a moveable tile to slide it into the empty space
- The goal is to arrange tiles 1-15 in order with the empty space in the bottom-right
- Your time starts when you make your first move
- Try to solve it in the least time and fewest moves!

## Technical Details

- **Pure HTML/CSS/JavaScript**: No frameworks or libraries required
- **Responsive Design**: Works on all screen sizes
- **Local Storage**: Leaderboard persists between sessions
- **Canvas-Generated Images**: Sample images created programmatically

## How to Run

Simply open `index.html` in any modern web browser. No server required!

```bash
# If you want to serve it locally
python -m http.server 8000
# Then visit http://localhost:8000
```

## File Structure

```
kpoppuzzle/
├── index.html      # Main HTML file
├── styles.css      # All styling and animations
├── script.js       # Game logic and functionality
├── images/         # Directory for puzzle images
└── README.md       # This file
```

## Adding Your Own Images

The game automatically detects and loads images from the `/images` directory! Simply:

1. **Add image files** to the `images/` directory (supports .jpg, .jpeg, .png, .gif, .webp, .bmp)
2. **Use square images** for best puzzle results
3. **Refresh the page** - the game will automatically detect and include your new images
4. **No code changes needed** - the game dynamically loads both your images and the generated patterns

Supported image names include:
- `kpop1.png`, `kpop2.jpg`, etc.
- `image1.jpg`, `image2.png`, etc.  
- `puzzle1.png`, `puzzle2.jpg`, etc.

Enjoy playing! 🎮
