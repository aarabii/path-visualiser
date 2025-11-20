import { algoDetails } from "../utils/algo-details";
import { Info } from "lucide-react";

export default function AlgoDetails({ algorithm }: { algorithm: string }) {
  const details = algoDetails[algorithm] || algoDetails["BFS"];

  return (
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
  );
}
