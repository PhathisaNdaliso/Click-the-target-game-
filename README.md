### Click the Target Game

A fun, browser-based reaction game built with Next.js and Tailwind CSS where players click on moving targets to score points against a countdown timer.





## 🎮 Features

- **Multiple Difficulty Levels**: Choose between Easy, Medium, and Hard modes
- **Responsive Design**: Play on desktop or mobile devices
- **Clean, Modern UI**: Built with Tailwind CSS for a polished look
- **Adjustable Target Behavior**:

- Different target sizes based on difficulty
- Adjustable movement speed
- Optional auto-movement toggle



- **Game Stats**: Real-time score tracking and countdown timer
- **Game Over Modal**: Displays final score and performance message


## 🎯 Game Mechanics

### Difficulty Levels

| Level | Target Size | Movement Speed | Time Limit
|-----|-----|-----|-----
| Easy | Large (80px) | Slow (1.5s) | 30 seconds
| Medium | Medium (60px) | Medium (1.0s) | 25 seconds
| Hard | Small (40px) | Fast (0.7s) | 20 seconds


### How to Play

1. Select your difficulty level
2. Toggle auto-movement if desired
3. Click "Start Game" to begin
4. Click on the red circular target as quickly as possible
5. Each successful click earns one point and moves the target
6. Try to get as many points as possible before time runs out!


## 🚀 Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - JavaScript library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Icon pack
- [shadcn/ui](https://ui.shadcn.com/) - UI component library


## 📦 Installation

```shellscript
# Clone the repository
git clone https://github.com/yourusername/click-the-target.git

# Navigate to the project directory
cd click-the-target

# Install dependencies
npm install

# Start the development server
npm run dev
```

The game will be available at [http://localhost:3000](http://localhost:3000)

## 🔧 Customization

### Modifying Difficulty Settings

You can adjust the difficulty settings by modifying the `DIFFICULTY_SETTINGS` object in `components/click-target-game.tsx`:

```typescript
const DIFFICULTY_SETTINGS = {
  easy: { targetSize: 80, moveInterval: 1500, timeLimit: 30 },
  medium: { targetSize: 60, moveInterval: 1000, timeLimit: 25 },
  hard: { targetSize: 40, moveInterval: 700, timeLimit: 20 },
}
```

### Styling

The game uses Tailwind CSS for styling. You can modify the appearance by editing the Tailwind classes in the component files.

## 🔮 Future Improvements

- Sound effects for target clicks and game events
- High score system with local storage
- Visual particle effects when clicking targets
- Power-ups (time bonus, score multiplier)
- Two-player mode
- Additional game modes (survival, time attack)


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Phathisa Ndaliso- https://github.com/PhathisaNdaliso/PhathisaNdaliso

---

Feel free to contribute to this project by opening issues or submitting pull requests!
