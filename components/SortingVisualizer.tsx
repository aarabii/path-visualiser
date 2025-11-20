"use client";

import { useState, useEffect, useRef } from "react";
import {
  getBubbleSortAnimations,
  getSelectionSortAnimations,
  getInsertionSortAnimations,
  getMergeSortAnimations,
  getQuickSortAnimations,
  getHeapSortAnimations,
  getCocktailSortAnimations,
  AnimationStep,
} from "../utils/sortingAlgorithms";
import { sortingDetails } from "../utils/sorting-details";
import { Play, RotateCcw, Settings2, Info } from "lucide-react";

const ALGORITHMS = {
  "Bubble Sort": getBubbleSortAnimations,
  "Selection Sort": getSelectionSortAnimations,
  "Insertion Sort": getInsertionSortAnimations,
  "Merge Sort": getMergeSortAnimations,
  "Quick Sort": getQuickSortAnimations,
  "Heap Sort": getHeapSortAnimations,
  "Cocktail Sort": getCocktailSortAnimations,
};

// Notion Colors
const PRIMARY_COLOR = "#2383e2"; // Notion Blue
const COMPARE_COLOR = "#e16259"; // Notion Red
const SORTED_COLOR = "#44b600"; // Notion Green (Custom)

export default function SortingVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState(50);
  const [algorithm, setAlgorithm] = useState("Bubble Sort");
  const [isSorting, setIsSorting] = useState(false);
  const [sortingSpeed, setSortingSpeed] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);

  const details = sortingDetails[algorithm] || sortingDetails["Bubble Sort"];

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = () => {
    if (isSorting) return;
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(5, 100));
    }
    setArray(newArray);
    // Reset colors
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < arrayBars.length; i++) {
      const bar = arrayBars[i] as HTMLElement;
      bar.style.backgroundColor = PRIMARY_COLOR;
    }
  };

  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const runSorting = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const sortFn = ALGORITHMS[algorithm as keyof typeof ALGORITHMS];
    const animations = sortFn(array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange =
        animations[i].type === "compare" ||
        animations[i].type === "swap" ||
        animations[i].type === "overwrite";

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i].indices;
        const barOneStyle = (arrayBars[barOneIdx] as HTMLElement).style;
        const barTwoStyle =
          barTwoIdx !== undefined
            ? (arrayBars[barTwoIdx] as HTMLElement)?.style
            : null;

        if (animations[i].type === "compare") {
          setTimeout(() => {
            barOneStyle.backgroundColor = COMPARE_COLOR;
            if (barTwoStyle) barTwoStyle.backgroundColor = COMPARE_COLOR;
          }, i * sortingSpeed);
          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            if (barTwoStyle) barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, (i + 1) * sortingSpeed);
        } else if (animations[i].type === "swap") {
          setTimeout(() => {
            const [idx1, idx2] = animations[i].indices;
            const bar1 = arrayBars[idx1] as HTMLElement;
            const bar2 = arrayBars[idx2] as HTMLElement;
            const tempHeight = bar1.style.height;
            bar1.style.height = bar2.style.height;
            bar2.style.height = tempHeight;
          }, i * sortingSpeed);
        } else if (animations[i].type === "overwrite") {
          setTimeout(() => {
            const [idx, newVal] = animations[i].indices;
            const bar = arrayBars[idx] as HTMLElement;
            bar.style.height = `${newVal}%`;
          }, i * sortingSpeed);
        }
      }
    }

    const totalTime = animations.length * sortingSpeed;
    setTimeout(() => {
      const arrayBars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < arrayBars.length; i++) {
        setTimeout(() => {
          (arrayBars[i] as HTMLElement).style.backgroundColor = SORTED_COLOR;
        }, i * 10);
      }
      setIsSorting(false);
    }, totalTime);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-5xl mx-auto">
      {/* Controls Card */}
      <div className="canvas-card p-4 w-full flex flex-wrap justify-between gap-6 items-center bg-[var(--card-bg)]">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-[var(--secondary)] font-semibold uppercase tracking-wider">
              Algorithm
            </label>
            <div className="relative">
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                disabled={isSorting}
                className="appearance-none bg-[var(--hover-bg)] text-[var(--foreground)] pl-3 pr-8 py-1.5 rounded-md text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[var(--primary)] cursor-pointer disabled:opacity-50"
              >
                {Object.keys(ALGORITHMS).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
              <Settings2 className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-[var(--secondary)] pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-[10px] text-[var(--secondary)] font-semibold uppercase tracking-wider">
              Size: {arraySize}
            </label>
            <input
              type="range"
              min="10"
              max="100"
              step="10"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isSorting}
              className="w-full h-1.5 bg-[var(--secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)] disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-[10px] text-[var(--secondary)] font-semibold uppercase tracking-wider">
              Speed
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={51 - sortingSpeed}
              onChange={(e) => setSortingSpeed(51 - Number(e.target.value))}
              disabled={isSorting}
              className="w-full h-1.5 bg-[var(--secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)] disabled:opacity-50"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={runSorting}
            disabled={isSorting}
            className="flex items-center gap-2 bg-[var(--primary)] hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Sort
          </button>

          <button
            onClick={resetArray}
            disabled={isSorting}
            className="flex items-center gap-2 bg-[var(--hover-bg)] hover:bg-[var(--secondary)]/20 text-[var(--foreground)] px-4 py-1.5 rounded-md text-sm font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Visualizer Canvas */}
      <div
        ref={containerRef}
        className="canvas-card w-full h-[400px] flex items-end justify-center gap-[2px] p-6 bg-[var(--card-bg)] overflow-hidden relative"
      >
        <div className="absolute top-4 left-4 text-xs font-mono text-[var(--secondary)] opacity-50">
          CANVAS_VIEW_01
        </div>
        {array.map((value, idx) => (
          <div
            key={idx}
            className="array-bar rounded-t-[2px] transition-colors duration-0"
            style={{
              height: `${value}%`,
              width: `${Math.floor(800 / arraySize)}px`,
              backgroundColor: PRIMARY_COLOR,
            }}
          ></div>
        ))}
      </div>

      {/* Explanation Section */}
      <div className="canvas-card w-full p-6 bg-[var(--card-bg)] space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--card-border)] pb-3">
          <Info className="w-4 h-4 text-[var(--primary)]" />
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            {details.name}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-[var(--secondary)] uppercase tracking-wider mb-1">
                Description
              </h3>
              <p className="text-sm text-[var(--foreground)] leading-relaxed">
                {details.description}
              </p>
            </div>
            <div className="bg-[var(--hover-bg)] p-4 rounded-md border border-[var(--card-border)]">
              <h3 className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider mb-2">
                Simply Explained
              </h3>
              <p className="text-sm text-[var(--foreground)] italic leading-relaxed">
                "{details.eli5}"
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3 rounded-md border border-[var(--card-border)] bg-[var(--sidebar-bg)]">
              <h3 className="text-[10px] font-semibold text-[var(--secondary)] uppercase tracking-wider mb-1">
                Time Complexity
              </h3>
              <p className="text-sm font-mono text-[var(--foreground)]">
                {details.timeComplexity}
              </p>
            </div>
            <div className="p-3 rounded-md border border-[var(--card-border)] bg-[var(--sidebar-bg)]">
              <h3 className="text-[10px] font-semibold text-[var(--secondary)] uppercase tracking-wider mb-1">
                Space Complexity
              </h3>
              <p className="text-sm font-mono text-[var(--foreground)]">
                {details.spaceComplexity}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
