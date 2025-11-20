"use client";

import { useState } from "react";
import Grid from "../../components/Grid";
import AlgoDetails from "../../components/AlgoDetails";
import { algorithms } from "../../utils/algorithms";
import { Play, RotateCcw, Settings2 } from "lucide-react";

export default function PathfindingPage() {
  const [algorithm, setAlgorithm] = useState("BFS");
  const [start, setStart] = useState<{ row: number; col: number } | null>(null);
  const [end, setEnd] = useState<{ row: number; col: number } | null>(null);
  const [triggerTraverse, setTriggerTraverse] = useState(false);
  const [resetSignal, setResetSignal] = useState(false);

  const handleReset = () => {
    setResetSignal((prev) => !prev);
    setStart(null);
    setEnd(null);
  };

  return (
    <main className="min-h-screen pt-20 px-4 pb-8 flex flex-col items-center gap-8">
      <div className="text-center space-y-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Pathfinding Visualizer
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Visualize how algorithms navigate from point A to point B.
          <br />
          <span className="text-sm mt-2 block">
            Select <span className="text-blue-400 font-bold">Start</span>,{" "}
            <span className="text-red-400 font-bold">End</span>, and draw{" "}
            <span className="text-gray-500 font-bold">Walls</span>.
          </span>
        </p>
      </div>

      <div className="glass p-4 rounded-2xl flex flex-wrap justify-center gap-4 items-center w-full max-w-4xl animate-fade-in-up delay-100">
        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
          <Settings2 className="w-4 h-4 text-gray-400" />
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm font-medium text-white focus:ring-0 cursor-pointer"
          >
            {Object.keys(algorithms).map((key) => (
              <option key={key} value={key} className="bg-gray-900">
                {key}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setTriggerTraverse(!triggerTraverse)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Play className="w-4 h-4 fill-current" />
          Visualize
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-xl font-medium transition-all border border-white/10 active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="w-full max-w-7xl animate-fade-in-up delay-200">
        <Grid
          algorithm={algorithm}
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
          triggerTraverse={triggerTraverse}
          setTriggerTraverse={setTriggerTraverse}
          resetSignal={resetSignal}
        />
      </div>

      <div className="w-full max-w-4xl animate-fade-in-up delay-300">
        <AlgoDetails algorithm={algorithm} />
      </div>
    </main>
  );
}
