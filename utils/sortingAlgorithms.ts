export type AnimationStep = {
  type: "compare" | "swap" | "overwrite";
  indices: [number, number];
  values?: [number, number]; // For overwrite/swap if needed
};

export const getBubbleSortAnimations = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({ type: "compare", indices: [j, j + 1] });
      if (arr[j] > arr[j + 1]) {
        animations.push({ type: "swap", indices: [j, j + 1] });
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return animations;
};

export const getSelectionSortAnimations = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      animations.push({ type: "compare", indices: [minIdx, j] });
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      animations.push({ type: "swap", indices: [i, minIdx] });
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return animations;
};

export const getInsertionSortAnimations = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      animations.push({ type: "compare", indices: [j, j + 1] }); // Compare key with arr[j]
      animations.push({ type: "overwrite", indices: [j + 1, arr[j]] }); // Shift
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    animations.push({ type: "overwrite", indices: [j + 1, key] }); // Place key
    arr[j + 1] = key;
  }
  return animations;
};

export const getMergeSortAnimations = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
};

function mergeSortHelper(
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: AnimationStep[]
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: AnimationStep[]
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push({ type: "compare", indices: [i, j] });
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push({ type: "overwrite", indices: [k, auxiliaryArray[i]] });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push({ type: "overwrite", indices: [k, auxiliaryArray[j]] });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push({ type: "compare", indices: [i, i] });
    animations.push({ type: "overwrite", indices: [k, auxiliaryArray[i]] });
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push({ type: "compare", indices: [j, j] });
    animations.push({ type: "overwrite", indices: [k, auxiliaryArray[j]] });
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export const getQuickSortAnimations = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const arr = [...array];
  quickSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
};

function quickSortHelper(
  arr: number[],
  low: number,
  high: number,
  animations: AnimationStep[]
) {
  if (low < high) {
    const pi = partition(arr, low, high, animations);
    quickSortHelper(arr, low, pi - 1, animations);
    quickSortHelper(arr, pi + 1, high, animations);
  }
}

function partition(
  arr: number[],
  low: number,
  high: number,
  animations: AnimationStep[]
): number {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    animations.push({ type: "compare", indices: [j, high] });
    if (arr[j] < pivot) {
      i++;
      animations.push({ type: "swap", indices: [i, j] });
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  animations.push({ type: "swap", indices: [i + 1, high] });
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

export const getHeapSortAnimations = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, animations);
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push({ type: "swap", indices: [0, i] });
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0, animations);
  }
  return animations;
};

function heapify(
  arr: number[],
  n: number,
  i: number,
  animations: AnimationStep[]
) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    animations.push({ type: "compare", indices: [left, largest] });
    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }

  if (right < n) {
    animations.push({ type: "compare", indices: [right, largest] });
    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }

  if (largest !== i) {
    animations.push({ type: "swap", indices: [i, largest] });
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest, animations);
  }
}

export const getCocktailSortAnimations = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const arr = [...array];
  let swapped = true;
  let start = 0;
  let end = arr.length;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end - 1; ++i) {
      animations.push({ type: "compare", indices: [i, i + 1] });
      if (arr[i] > arr[i + 1]) {
        animations.push({ type: "swap", indices: [i, i + 1] });
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    if (!swapped) break;
    swapped = false;
    end = end - 1;
    for (let i = end - 1; i >= start; i--) {
      animations.push({ type: "compare", indices: [i, i + 1] });
      if (arr[i] > arr[i + 1]) {
        animations.push({ type: "swap", indices: [i, i + 1] });
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    start = start + 1;
  }
  return animations;
};
