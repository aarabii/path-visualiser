import { useEffect, useState } from "react";
import { algorithms } from "../utils/algorithms";
import { Play, Flag, Wand2 } from "lucide-react";

const ROWS = 20;
const COLS = 40;

export default function Grid({
  algorithm,
  start,
  setStart,
  end,
  setEnd,
  triggerTraverse,
  setTriggerTraverse,
  resetSignal,
}: {
  algorithm: string;
  start: { row: number; col: number } | null;
  setStart: (val: { row: number; col: number } | null) => void;
  end: { row: number; col: number } | null;
  setEnd: (val: { row: number; col: number } | null) => void;
  triggerTraverse: boolean;
  setTriggerTraverse: (val: boolean) => void;
  resetSignal: boolean;
}) {
  const [grid, setGrid] = useState(() =>
    Array.from({ length: ROWS }, () => Array(COLS).fill("empty"))
  );

  const handleClick = (row: number, col: number) => {
    if (
      (start && start.row === row && start.col === col) ||
      (end && end.row === row && end.col === col)
    ) {
      return;
    }

    const newGrid = grid.map((r) => [...r]);
    if (!start) {
      newGrid[row][col] = "start";
      setStart({ row, col });
    } else if (!end) {
      newGrid[row][col] = "end";
      setEnd({ row, col });
    } else {
      newGrid[row][col] =
        newGrid[row][col] === "obstacle" ? "empty" : "obstacle";
    }
    setGrid(newGrid);
  };

  const addRandomObstacles = () => {
    const newGrid = Array.from({ length: ROWS }, () =>
      Array(COLS).fill("empty")
    );

    setStart(null);
    setEnd(null);

    let obstacleCount = 0;
    const maxObstacles = Math.floor(ROWS * COLS * 0.25);

    while (obstacleCount < maxObstacles) {
      const row = Math.floor(Math.random() * ROWS);
      const col = Math.floor(Math.random() * COLS);
      if (newGrid[row][col] === "empty") {
        newGrid[row][col] = "obstacle";
        obstacleCount++;
      }
    }
    setGrid(newGrid);
  };

  useEffect(() => {
    const newGrid = Array.from({ length: ROWS }, () =>
      Array(COLS).fill("empty")
    );

    const id = setTimeout(() => {
      setStart(null);
      setEnd(null);
      setGrid(newGrid);
    }, 0);

    return () => clearTimeout(id);
  }, [resetSignal, setStart, setEnd]);

  useEffect(() => {
    if (triggerTraverse && start && end) {
      const cleanGrid = grid.map((r) =>
        r.map((cell) =>
          cell === "visited" || cell === "path" ? "empty" : cell
        )
      );

      const id = setTimeout(() => {
        setGrid(cleanGrid);

        const algoFn = algorithms[algorithm] || algorithms.dijkstra;
        algoFn(cleanGrid, start, end, setGrid);

        setTriggerTraverse(false);
      }, 50);

      return () => clearTimeout(id);
    } else if (triggerTraverse) {
      setTriggerTraverse(false);
    }
  }, [
    triggerTraverse,
    start,
    end,
    algorithm,
    grid,
    setTriggerTraverse,
    setGrid,
  ]);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex gap-4">
        <button
          onClick={addRandomObstacles}
          className="
            flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium
            bg-[var(--hover-bg)] hover:bg-[var(--secondary)]/20 text-[var(--foreground)]
            border border-[var(--card-border)] transition-all duration-200
          "
        >
          <Wand2 className="w-3.5 h-3.5" />
          Random Maze
        </button>
      </div>

      {/* Canvas Container */}
      <div className="canvas-card relative p-6 bg-[var(--card-bg)] overflow-hidden">
        <div className="absolute top-4 left-4 text-xs font-mono text-[var(--secondary)] opacity-50">
          GRID_VIEW_01
        </div>
        <div className="flex flex-col gap-[1px] bg-[var(--grid-border)] border border-[var(--grid-border)]">
          {grid.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-[1px]">
              {row.map((cell, cIdx) => (
                <div
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => handleClick(rIdx, cIdx)}
                  className={`
                    w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 cursor-pointer
                    transition-all duration-200
                    flex items-center justify-center
                    ${
                      cell === "start"
                        ? "bg-[#1e3a8a] z-10" // Dark Blue (Blue-900)
                        : cell === "end"
                        ? "bg-[#7f1d1d] z-10" // Dark Red (Red-900)
                        : cell === "obstacle"
                        ? "bg-[var(--foreground)] animate-scale-in"
                        : cell === "visited"
                        ? "bg-[#4338ca] animate-pulse" // Indigo-700
                        : cell === "path"
                        ? "bg-[#b45309] z-10" // Amber-700
                        : "bg-[var(--background)] hover:bg-[var(--hover-bg)]"
                    }
                  `}
                >
                  {cell === "start" && (
                    <Play className="w-3 h-3 text-white fill-white" />
                  )}
                  {cell === "end" && (
                    <Flag className="w-3 h-3 text-white fill-white" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
