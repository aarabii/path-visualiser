export const sortingDetails: Record<
  string,
  {
    name: string;
    description: string;
    timeComplexity: string;
    spaceComplexity: string;
    eli5: string;
  }
> = {
  "Bubble Sort": {
    name: "Bubble Sort",
    description:
      "A simple algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    eli5: "Imagine a line of people waiting for a photo. You look at the first two people. If the taller one is on the left, they swap places. Then you move to the next pair. You keep doing this until the tallest person 'bubbles' up to the far right end. Then you start over, but stop one person earlier, until everyone is in height order.",
  },
  "Selection Sort": {
    name: "Selection Sort",
    description:
      "Divides the input list into two parts: a sorted sublist of items which is built up from left to right and a sublist of the remaining unsorted items.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    eli5: "Imagine you have a messy pile of numbered cards. You look through the whole pile to find the card with the smallest number (like '1') and put it face down in a new neat stack. Then you look through the remaining messy pile for the next smallest number (like '2') and put it on top of the '1'. You repeat this until the messy pile is gone.",
  },
  "Insertion Sort": {
    name: "Insertion Sort",
    description:
      "Builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    eli5: "This is how many people sort a hand of playing cards. You pick up one card at a time from the table. You look at the cards already in your hand and slide the new card into the exact spot where it belongs—between a smaller card and a bigger card.",
  },
  "Merge Sort": {
    name: "Merge Sort",
    description:
      "A divide and conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    eli5: "Imagine you have a huge stack of papers to sort. You split the stack in half, give one half to a friend, and keep one. You both split yours again and again until everyone has just one paper. Since one paper is already sorted, you start pairing them back up. You take two small sorted stacks and carefully combine them into one bigger sorted stack, repeating until the original full stack is back together and perfectly ordered.",
  },
  "Quick Sort": {
    name: "Quick Sort",
    description:
      "Picks an element as a pivot and partitions the given array around the picked pivot.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    eli5: "You pick one person in the room to be the 'leader' (pivot). Then you ask everyone shorter than the leader to stand on the left side of the room, and everyone taller to stand on the right. Now the leader is in the perfect spot. You then do the exact same thing for the group on the left and the group on the right, picking new leaders for each side, until everyone is in their correct place.",
  },
  "Heap Sort": {
    name: "Heap Sort",
    description:
      "A comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    eli5: "Imagine building a human pyramid where the rule is that a parent must always be taller than their children. Once you build this structure (a heap), the tallest person is clearly at the top. You take them out and put them at the end of the line. Then you fix the pyramid so the next tallest person moves to the top. You keep doing this until the pyramid is empty and everyone is lined up.",
  },
  "Cocktail Sort": {
    name: "Cocktail Shaker Sort",
    description:
      "A variation of Bubble Sort that sorts in both directions on each pass through the list.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    eli5: "It works just like the Bubble Sort line-up, but faster. Instead of walking from left to right and then walking all the way back to the start to try again, you sort going forward, and then immediately sort going backward. It's like shaking a cocktail shaker back and forth—items settle into their correct spots from both ends at the same time.",
  },
};
