export const algoDetails: Record<
  string,
  {
    name: string;
    description: string;
    timeComplexity: string;
    spaceComplexity: string;
    howItWorks: string;
    eli5: string;
  }
> = {
  BFS: {
    name: "Breadth-First Search (BFS)",
    description:
      "Explores nodes level by level starting from the source. It guarantees the shortest path in an unweighted grid.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    howItWorks:
      "It uses a Queue data structure. It checks all neighbors of the current node before moving to the next level of neighbors.",
    eli5: "Imagine dropping a pebble into a calm pond. The ripples spread out in a perfect circle, reaching everything close to the center first, then moving further and further out. BFS works the same way—it checks every spot 1 step away, then every spot 2 steps away, ensuring it finds the closest path first.",
  },

  DFS: {
    name: "Depth-First Search (DFS)",
    description:
      "Explores as far as possible along each branch before backtracking. It does not guarantee the shortest path.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    howItWorks:
      "It uses a Stack (or recursion). It goes deep into one path until it hits a wall or the target, then backtracks.",
    eli5: "Imagine you are exploring a maze. You pick a path and keep walking until you hit a dead end. Only then do you turn around and go back to the last intersection to try a different path. You might find the exit, but you might have walked a very long, winding route to get there.",
  },

  "Greedy Best-First Search": {
    name: "Greedy Best-First Search",
    description:
      "Selects the path that appears to be closest to the goal based on a heuristic. Fast but not guaranteed to be shortest.",
    timeComplexity: "O(V log V)",
    spaceComplexity: "O(V)",
    howItWorks:
      "It uses a Priority Queue. It always picks the node with the lowest heuristic value (estimated distance to goal).",
    eli5: "Imagine you are hiking to a mountain peak you can see in the distance. At every fork in the trail, you simply choose the path that points most directly toward the peak. It seems like the fastest way, but you might get stuck at a canyon and have to turn back because you didn't plan ahead.",
  },

  "Bidirectional BFS": {
    name: "Bidirectional BFS",
    description:
      "Runs two simultaneous BFS searches: one from the start and one from the end. They meet in the middle.",
    timeComplexity: "O(b^(d/2))",
    spaceComplexity: "O(b^(d/2))",
    howItWorks:
      "By searching from both ends, it significantly reduces the search space compared to standard BFS.",
    eli5: "Imagine two friends trying to find each other in a crowded city. Instead of one friend walking the whole way, they both start walking toward each other at the same time. They will meet in the middle much faster than if only one person was doing all the walking.",
  },

  "A* Search": {
    name: "A* Search Algorithm",
    description:
      "The most popular pathfinding algorithm. It uses both the actual distance from the start and the estimated distance to the goal.",
    timeComplexity: "O(E)",
    spaceComplexity: "O(V)",
    howItWorks:
      "It calculates f(n) = g(n) + h(n), where g(n) is the cost from start and h(n) is the heuristic estimate to the end.",
    eli5: "This is like using a smart GPS. It knows how far you've driven (cost) and estimates how far is left to go (heuristic). It balances these two facts to find the absolute best route, avoiding the 'dead ends' of Greedy search and the 'aimless wandering' of standard BFS.",
  },

  "Dijkstra's Algorithm": {
    name: "Dijkstra's Algorithm",
    description:
      "The father of pathfinding algorithms. Guarantees the shortest path in weighted graphs (or unweighted).",
    timeComplexity: "O((V+E) log V)",
    spaceComplexity: "O(V)",
    howItWorks:
      "It explores nodes based on the current shortest distance from the start node, updating neighbors as it goes.",
    eli5: "Imagine pouring water onto a landscape. The water flows naturally, filling the lowest points first before rising to higher ground. Dijkstra's algorithm flows through the 'easiest' (lowest cost) paths first, guaranteeing that when it reaches the destination, it has found the absolute path of least resistance.",
  },

  "Iterative Deepening DFS": {
    name: "Iterative Deepening DFS",
    description:
      "Combines the space efficiency of DFS with the completeness of BFS by repeatedly running DFS with increasing depth limits.",
    timeComplexity: "O(b^d)",
    spaceComplexity: "O(d)",
    howItWorks:
      "It runs DFS with depth limit 1, then 2, then 3, and so on, until the target is found.",
    eli5: "Imagine looking for your keys. First, you check just the room you are in (Depth 1). If you don't find them, you check the room and the hallway (Depth 2). Then you check the room, hallway, and kitchen (Depth 3). You are re-checking the close spots, but it ensures you don't miss anything nearby before wandering far away.",
  },

  "Random Best-First Search": {
    name: "Random Best-First Search",
    description:
      "A variation of Best-First Search that introduces randomness in tie-breaking, creating unique paths.",
    timeComplexity: "O(V log V)",
    spaceComplexity: "O(V)",
    howItWorks:
      "Similar to Greedy BFS, but if two nodes have the same heuristic value, it picks one randomly.",
    eli5: "It works like the hiker looking at the mountain peak, but if two trails look equally good, they flip a coin to decide which one to take. It adds a bit of unpredictability to the journey.",
  },
};

export default algoDetails;
