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
    <div className="flex flex-col items-center gap-6 w-full p-4">
      <div className="mb-2 w-full flex justify-center">
        <button
          onClick={addRandomObstacles}
          className="
            flex items-center justify-center
            bg-linear-to-r from-sky-600 to-cyan-500 text-white
            px-4 py-2 rounded-lg shadow-md font-medium
            hover:shadow-lg hover:from-sky-700 hover:to-cyan-600
            transition-all duration-200 transform hover:-translate-y-px
          "
        >
          <Wand2 className="w-4 h-4 mr-2" />
          Add Random Obstacles
        </button>
      </div>
      <div className="overflow-auto max-w-full rounded-lg shadow-lg bg-black/20 p-2">
        <div className="flex flex-col items-center gap-1">
          {grid.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-1">
              {row.map((cell, cIdx) => (
                <div
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => handleClick(rIdx, cIdx)}
                  className={`
                    aspect-square w-5 sm:w-6 cursor-pointer
                    transition-all duration-200 rounded
                    flex items-center justify-center

                    ${
                      cell === "start"
                        ? "bg-sky-500 rounded-md shadow-lg shadow-sky-500/30"
                        : cell === "end"
                        ? "bg-red-500 rounded-md shadow-lg shadow-red-500/30"
                        : cell === "obstacle"
                        ? "bg-gray-900 rounded-sm scale-95 shadow-inner"
                        : cell === "visited"
                        ? "bg-slate-500/70 rounded-lg"
                        : cell === "path"
                        ? "bg-emerald-500 rounded-md shadow-inner shadow-emerald-900/30 animate-pulse"
                        : "bg-slate-800 hover:bg-slate-700"
                    }
                  `}
                >
                  {cell === "start" ? (
                    <Play className="w-4 h-4 text-white fill-white" />
                  ) : cell === "end" ? (
                    <Flag className="w-4 h-4 text-white fill-white" />
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
