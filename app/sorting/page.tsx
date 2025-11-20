"use client";

import SortingVisualizer from "../../components/SortingVisualizer";

export default function SortingPage() {
  return (
    <main className="min-h-screen pt-20 px-4 pb-8 flex flex-col items-center gap-8">
      <div className="text-center space-y-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Sorting Visualizer
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          Watch how different algorithms sort data in real-time.
        </p>
      </div>

      <div className="w-full max-w-6xl animate-fade-in-up delay-100">
        <SortingVisualizer />
      </div>
    </main>
  );
}
