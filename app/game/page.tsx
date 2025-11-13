'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'app/components/theme-context'

type Cell = {
  hasMine: boolean
  revealed: boolean
  flagged: boolean
  adjacent: number
}

const GRID_SIZE = 8
const MINES_COUNT = 10

export default function Minesweeper() {
  const { isDark } = useTheme()
  const [grid, setGrid] = useState<Cell[][]>([])
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)


  function generateGrid(): Cell[][] {
    const cells: Cell[][] = Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => ({
        hasMine: false,
        revealed: false,
        flagged: false,
        adjacent: 0,
      }))
    )

    // Place mines
    let minesPlaced = 0
    while (minesPlaced < MINES_COUNT) {
      const row = Math.floor(Math.random() * GRID_SIZE)
      const col = Math.floor(Math.random() * GRID_SIZE)
      if (!cells[row][col].hasMine) {
        cells[row][col].hasMine = true
        minesPlaced++
      }
    }

    // Count adjacent mines
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (cells[r][c].hasMine) continue
        let count = 0
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue
            const nr = r + dr
            const nc = c + dc
            if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
              if (cells[nr][nc].hasMine) count++
            }
          }
        }
        cells[r][c].adjacent = count
      }
    }

    return cells
  }

  function revealCells(grid: Cell[][], row: number, col: number): Cell[][] {
    const newGrid = grid.map(r => r.map(c => ({ ...c })))
    const stack: [number, number][] = [[row, col]]

    while (stack.length > 0) {
      const [r, c] = stack.pop()!
      const cell = newGrid[r][c]
      if (cell.revealed || cell.flagged) continue
      cell.revealed = true

      if (!cell.hasMine && cell.adjacent === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr
            const nc = c + dc
            if (
              nr >= 0 &&
              nr < GRID_SIZE &&
              nc >= 0 &&
              nc < GRID_SIZE &&
              !newGrid[nr][nc].revealed
            ) {
              stack.push([nr, nc])
            }
          }
        }
      }
    }
    return newGrid
  }

  const handleClick = (row: number, col: number) => {
    if (gameOver) return
    const cell = grid[row][col]
    if (cell.revealed || cell.flagged) return

    if (cell.hasMine) {
      // Khi thua: reveal tất cả bom
      const newGrid = grid.map(r =>
        r.map(c => ({
          ...c,
          revealed: c.revealed || c.hasMine, // reveal các ô bom
        }))
      )
      setGrid(newGrid)
      setGameOver(true)
      return
    }

    const newGrid = revealCells(grid, row, col)
    setGrid(newGrid)
    checkWin(newGrid)
  }

  const toggleFlag = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault()
    if (gameOver) return
    const newGrid = grid.map(r => r.map(c => ({ ...c })))
    newGrid[row][col].flagged = !newGrid[row][col].flagged
    setGrid(newGrid)
  }

  const checkWin = (currentGrid: Cell[][]) => {
    const revealedCount = currentGrid.flat().filter(c => c.revealed).length
    if (revealedCount === GRID_SIZE * GRID_SIZE - MINES_COUNT) {
      setWon(true)
      setGameOver(true)
    }
  }

  const resetGame = () => {
    setGrid(generateGrid())
    setGameOver(false)
    setWon(false)
  }


  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ${isDark
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100'
        : 'bg-gradient-to-b from-white via-blue-50 to-white text-gray-800'
        }`}
    >

      <h1 className="text-4xl font-bold mb-4 text-center text-blue-600 dark:text-blue-400">
        Minesweeper 🎮
      </h1>

      {gameOver && won && <p className="text-green-500 font-semibold mb-2">🎉 You Won!</p>}
      {gameOver && !won && <p className="text-red-500 font-semibold mb-2">💥 You Lost!</p>}
      {!gameOver && <p className="font-semibold mb-2">Good luck!</p>}

      <button
        onClick={resetGame}
        className="mb-6 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        Restart Game
      </button>

      <div className="grid grid-cols-8 gap-1">
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <motion.div
              key={`${r}-${c}`}
              className={`w-12 h-12 flex items-center justify-center font-bold cursor-pointer select-none border rounded transition-all duration-300 ${cell.revealed
                ? cell.hasMine
                  ? 'bg-red-500 text-white'
                  : isDark
                    ? 'bg-gray-700 text-gray-100'
                    : 'bg-white text-gray-800'
                : isDark
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-200 hover:bg-blue-100'
                } ${cell.flagged ? 'bg-yellow-400' : ''}`}
              onClick={() => handleClick(r, c)}
              onContextMenu={e => toggleFlag(e, r, c)}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {cell.revealed && cell.adjacent > 0 && !cell.hasMine && cell.adjacent}
              {cell.revealed && cell.hasMine && '💣'}
              {!cell.revealed && cell.flagged && '🚩'}
            </motion.div>
          ))
        )}
      </div>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Left click to reveal, right click to flag 🚩
      </p>
    </section>
  )
}
