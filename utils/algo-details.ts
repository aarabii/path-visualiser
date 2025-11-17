export const algoDetails: Record<
  string,
  { title: string; short: string; example: string }
> = {
  BFS: {
    title: "Breadth-First Search (BFS)",
    short:
      "Explores nodes level by level starting from the source; reliably finds the shortest path in unweighted environments.",
    example:
      "Imagine you are in a playground and shout for help. First the closest friends hear you, then the next ones, then the faraway ones. BFS works the same way — it checks all the nearest places first so it finds the shortest way.",
  },

  DFS: {
    title: "Depth-First Search (DFS)",
    short:
      "Traverses deeply along a single direction until it cannot continue, then backtracks; does not guarantee the shortest path.",
    example:
      "Think of walking in a maze and choosing one long tunnel to follow until it stops. If it ends, you walk back and try another tunnel. That is how DFS explores paths — one deep path at a time.",
  },

  "Greedy Best-First Search": {
    title: "Greedy Best-First Search",
    short:
      "Selects the next node based on a heuristic that estimates closeness to the goal; fast but not always optimal.",
    example:
      "Imagine searching for a toy and always running in the direction that looks closest to it. It feels fast, but sometimes you guess wrong and must turn around.",
  },

  "Bidirectional BFS": {
    title: "Bidirectional Breadth-First Search",
    short:
      "Runs BFS simultaneously from the start and the goal, meeting in the middle to significantly reduce search time.",
    example:
      "Imagine two friends starting at opposite sides of a playground and running to meet each other. They meet faster than if only one friend had to run the whole distance. That’s bidirectional BFS.",
  },

  "A* Search": {
    title: "A* Pathfinding Algorithm",
    short:
      "Combines actual travel cost with a heuristic estimate to efficiently compute the shortest path.",
    example:
      "It’s like having a map that tells you how far you walked and how close you still are to your toy. You choose the best path using both pieces of information so you reach the toy quickly.",
  },

  "Dijkstra's Algorithm": {
    title: "Dijkstra’s Shortest Path Algorithm",
    short:
      "Systematically selects the closest unvisited node to compute the shortest path in weighted graphs.",
    example:
      "Imagine tiny ants trying to reach candy. Each ant always chooses the easiest step. By taking the gentlest steps every time, they eventually find the easiest and shortest way to the candy.",
  },

  "Iterative Deepening DFS": {
    title: "Iterative Deepening Depth-First Search (IDDFS)",
    short:
      "Runs DFS repeatedly with increasing depth limits, combining DFS’s low memory use with BFS-like completeness.",
    example:
      "It’s like checking for your toy first in places one step away, then places two steps away, then three, and so on. You don’t miss anything, and you remember exactly where you already looked.",
  },

  "Random Best-First Search": {
    title: "Randomized Best-First Search",
    short:
      "Uses best-first search but breaks ties randomly, creating diverse exploration patterns when multiple choices look equally good.",
    example:
      "If two directions look just as good, this algorithm picks one randomly — like flipping a coin to decide which hallway to explore first.",
  },
};

export default algoDetails;
