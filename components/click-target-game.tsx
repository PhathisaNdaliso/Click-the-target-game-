'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Play, Pause, RotateCcw, Settings } from 'lucide-react'

type Difficulty = 'easy' | 'medium' | 'hard'

interface DifficultySettings {
  targetSize: number
  moveInterval: number
  timeLimit: number
}

const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultySettings> = {
  easy: { targetSize: 80, moveInterval: 1500, timeLimit: 30 },
  medium: { targetSize: 60, moveInterval: 1000, timeLimit: 25 },
  hard: { targetSize: 40, moveInterval: 700, timeLimit: 20 },
}

interface Position {
  x: number
  y: number
}

export default function ClickTargetGame() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [autoMove, setAutoMove] = useState(true)
  const [targetPosition, setTargetPosition] = useState<Position>({ x: 50, y: 50 })
  const [gameAreaSize, setGameAreaSize] = useState({ width: 600, height: 400 })

  const settings = DIFFICULTY_SETTINGS[difficulty]

  const generateRandomPosition = useCallback(() => {
    const margin = settings.targetSize / 2
    const maxX = gameAreaSize.width - margin * 2
    const maxY = gameAreaSize.height - margin * 2
    
    return {
      x: Math.random() * maxX + margin,
      y: Math.random() * maxY + margin,
    }
  }, [settings.targetSize, gameAreaSize])

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setTimeLeft(settings.timeLimit)
    setTargetPosition(generateRandomPosition())
  }

  const pauseGame = () => {
    setGameState('paused')
  }

  const resumeGame = () => {
    setGameState('playing')
  }

  const resetGame = () => {
    setGameState('menu')
    setScore(0)
    setTimeLeft(settings.timeLimit)
  }

  const handleTargetClick = () => {
    if (gameState === 'playing') {
      setScore(prev => prev + 1)
      setTargetPosition(generateRandomPosition())
    }
  }

  // Game timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameState('gameOver')
    }
  }, [gameState, timeLeft])

  // Auto-move target
  useEffect(() => {
    if (gameState === 'playing' && autoMove) {
      const moveTimer = setInterval(() => {
        setTargetPosition(generateRandomPosition())
      }, settings.moveInterval)
      return () => clearInterval(moveTimer)
    }
  }, [gameState, autoMove, settings.moveInterval, generateRandomPosition])

  // Update game area size on window resize
  useEffect(() => {
    const updateGameAreaSize = () => {
      const width = Math.min(800, window.innerWidth - 40)
      const height = Math.min(500, window.innerHeight - 200)
      setGameAreaSize({ width, height })
    }

    updateGameAreaSize()
    window.addEventListener('resize', updateGameAreaSize)
    return () => window.removeEventListener('resize', updateGameAreaSize)
  }, [])

  const getPerformanceMessage = () => {
    const percentage = (score / settings.timeLimit) * 100
    if (percentage >= 80) return "Excellent! You're a sharpshooter! 🎯"
    if (percentage >= 60) return "Great job! Nice reflexes! 👍"
    if (percentage >= 40) return "Good work! Keep practicing! 💪"
    return "Keep trying! You'll get better! 🎮"
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Click the Target Game
        </h1>

        {gameState === 'menu' && (
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="easy">Easy (30s, Large target)</option>
                  <option value="medium">Medium (25s, Medium target)</option>
                  <option value="hard">Hard (20s, Small target)</option>
                </select>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <input
                  type="checkbox"
                  id="autoMove"
                  checked={autoMove}
                  onChange={(e) => setAutoMove(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="autoMove" className="text-sm font-medium text-gray-700">
                  Auto-move target
                </label>
              </div>
            </div>

            <button
              onClick={startGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              <Play size={20} />
              <span>Start Game</span>
            </button>
          </div>
        )}

        {(gameState === 'playing' || gameState === 'paused') && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold">Score: {score}</div>
              <div className="text-xl font-semibold">Time: {timeLeft}s</div>
            </div>

            <div className="flex justify-center space-x-2">
              {gameState === 'playing' ? (
                <button
                  onClick={pauseGame}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded flex items-center space-x-1"
                >
                  <Pause size={16} />
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  onClick={resumeGame}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center space-x-1"
                >
                  <Play size={16} />
                  <span>Resume</span>
                </button>
              )}
              <button
                onClick={resetGame}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center space-x-1"
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>
            </div>

            <div
              className="relative bg-gray-100 border-2 border-gray-300 rounded-lg mx-auto"
              style={{ width: gameAreaSize.width, height: gameAreaSize.height }}
            >
              {gameState === 'paused' && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <div className="text-white text-2xl font-bold">PAUSED</div>
                </div>
              )}
              
              <div
                className="absolute bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition-colors duration-150 flex items-center justify-center text-white font-bold"
                style={{
                  width: settings.targetSize,
                  height: settings.targetSize,
                  left: targetPosition.x - settings.targetSize / 2,
                  top: targetPosition.y - settings.targetSize / 2,
                }}
                onClick={handleTargetClick}
              >
                🎯
              </div>
            </div>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-800">Game Over!</h2>
              <p className="text-xl text-gray-600">Final Score: {score}</p>
              <p className="text-lg text-gray-500">{getPerformanceMessage()}</p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={startGame}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <Play size={20} />
                <span>Play Again</span>
              </button>
              <button
                onClick={resetGame}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <Settings size={20} />
                <span>Settings</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}