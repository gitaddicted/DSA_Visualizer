import { AlgorithmInfo, SortStep } from './types';

export const algorithmInfo: Record<string, AlgorithmInfo> = {
  bubble: {
    name: 'Bubble Sort',
    complexity: 'O(n²)',
    pseudocode: [
      'procedure bubbleSort(A: list)',
      '  n = length(A)',
      '  for i = 0 to n-1 do',
      '    swapped = false',
      '    for j = 0 to n-i-2 do',
      '      if A[j] > A[j+1] then',
      '        swap(A[j], A[j+1])',
      '        swapped = true',
      '      end if',
      '    end for',
      '    if not swapped then',
      '      break',
      '    end if',
      '  end for',
      'end procedure',
    ],
  },
  selection: {
    name: 'Selection Sort',
    complexity: 'O(n²)',
    pseudocode: [
      'procedure selectionSort(A: list)',
      '  n = length(A)',
      '  for i = 0 to n-1 do',
      '    minIdx = i',
      '    for j = i+1 to n-1 do',
      '      if A[j] < A[minIdx] then',
      '        minIdx = j',
      '      end if',
      '    end for',
      '    if minIdx != i then',
      '      swap(A[i], A[minIdx])',
      '    end if',
      '  end for',
      'end procedure',
    ],
  },
  insertion: {
    name: 'Insertion Sort',
    complexity: 'O(n²)',
    pseudocode: [
      'procedure insertionSort(A: list)',
      '  for i = 1 to length(A)-1 do',
      '    key = A[i]',
      '    j = i - 1',
      '    while j >= 0 and A[j] > key do',
      '      A[j+1] = A[j]',
      '      j = j - 1',
      '    end while',
      '    A[j+1] = key',
      '  end for',
      'end procedure',
    ],
  },
  merge: {
    name: 'Merge Sort',
    complexity: 'O(n log n)',
    pseudocode: [
      'procedure mergeSort(A: list, l, r)',
      '  if l < r then',
      '    mid = (l + r) / 2',
      '    mergeSort(A, l, mid)',
      '    mergeSort(A, mid+1, r)',
      '    merge(A, l, mid, r)',
      '  end if',
      'end procedure',
      '',
      'procedure merge(A, l, mid, r)',
      '  create temp arrays L and R',
      '  copy A[l..mid] to L',
      '  copy A[mid+1..r] to R',
      '  i = j = 0, k = l',
      '  while L and R have elements',
      '    if L[i] <= R[j] then',
      '      A[k] = L[i]; i++',
      '    else',
      '      A[k] = R[j]; j++',
      '    k++',
      '  end while',
      '  copy remaining elements',
      'end procedure',
    ],
  },
  quick: {
    name: 'Quick Sort',
    complexity: 'O(n log n)',
    pseudocode: [
      'procedure quickSort(A, low, high)',
      '  if low < high then',
      '    pi = partition(A, low, high)',
      '    quickSort(A, low, pi - 1)',
      '    quickSort(A, pi + 1, high)',
      '  end if',
      'end procedure',
      '',
      'procedure partition(A, low, high)',
      '  pivot = A[high]',
      '  i = low - 1',
      '  for j = low to high-1 do',
      '    if A[j] < pivot then',
      '      i = i + 1',
      '      swap(A[i], A[j])',
      '    end if',
      '  end for',
      '  swap(A[i+1], A[high])',
      '  return i + 1',
      'end procedure',
    ],
  },
  heap: {
    name: 'Heap Sort',
    complexity: 'O(n log n)',
    pseudocode: [
      'procedure heapSort(A: list)',
      '  n = length(A)',
      '  buildMaxHeap(A)',
      '  for i = n-1 downto 1 do',
      '    swap(A[0], A[i])',
      '    heapify(A, 0, i)',
      '  end for',
      'end procedure',
      '',
      'procedure buildMaxHeap(A)',
      '  for i = n/2 - 1 downto 0 do',
      '    heapify(A, i, n)',
      '  end for',
      'end procedure',
      '',
      'procedure heapify(A, i, n)',
      '  largest = i',
      '  left = 2*i + 1',
      '  right = 2*i + 2',
      '  if left < n and A[left] > A[largest]',
      '    largest = left',
      '  if right < n and A[right] > A[largest]',
      '    largest = right',
      '  if largest != i then',
      '    swap(A[i], A[largest])',
      '    heapify(A, largest, n)',
      'end procedure',
    ],
  },
};

// PATTERN: Helper function — creates a SortStep with cloned arrays (immutability)
function createStep(
  array: number[],
  comparing: number[],
  swapping: number[],
  sorted: number[],
  highlightLine: number,
  description: string,
  pivot?: number
): SortStep {
  return {
    array: [...array],          // PATTERN: Spread operator creates a copy (immutability)
    comparing: [...comparing],
    swapping: [...swapping],
    sorted: [...sorted],
    highlightLine,
    description,
    pivot,
  };
}

// PATTERN: GENERATOR FUNCTION (function*) — yields multiple values over time
// PATTERN: Generator<SortStep> — typed to yield SortStep objects
export function* bubbleSort(arr: number[]): Generator<SortStep> {
  const array = [...arr];       // PATTERN: Copy input to avoid mutating the original
  const n = array.length;
  const sorted: number[] = [];

  yield createStep(array, [], [], [...sorted], 0, 'Starting Bubble Sort');
  // ^ PATTERN: yield — pauses execution and emits a value to the consumer

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      yield createStep(
        array,
        [j, j + 1],
        [],
        [...sorted],
        4,
        `Comparing ${array[j]} and ${array[j + 1]}`
      );

      if (array[j] > array[j + 1]) {
        yield createStep(
          array,
          [],
          [j, j + 1],
          [...sorted],
          5,
          `Swapping ${array[j]} and ${array[j + 1]}`
        );

        // PATTERN: Destructuring swap — no temp variable needed
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;

        yield createStep(
          array,
          [],
          [j, j + 1],
          [...sorted],
          5,
          `Swapped: ${array[j]} and ${array[j + 1]}`
        );
      }
    }

    sorted.unshift(n - 1 - i);

    if (!swapped) {
      yield createStep(
        array,
        [],
        [],
        Array.from({ length: n }, (_, idx) => idx),
        11,
        'No swaps in this pass. Array is sorted!'
      );
      break;
    }
  }

  yield createStep(
    array,
    [],
    [],
    Array.from({ length: n }, (_, idx) => idx),
    12,
    'Bubble Sort complete!'
  );
}

export function* selectionSort(arr: number[]): Generator<SortStep> {
  const array = [...arr];
  const n = array.length;
  const sorted: number[] = [];

  yield createStep(array, [], [], [...sorted], 0, 'Starting Selection Sort');

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    yield createStep(
      array,
      [i],
      [],
      [...sorted],
      2,
      `Starting pass: finding minimum in unsorted portion`
    );

    for (let j = i + 1; j < n; j++) {
      yield createStep(
        array,
        [minIdx, j],
        [],
        [...sorted],
        4,
        `Comparing ${array[j]} with current minimum ${array[minIdx]}`
      );

      if (array[j] < array[minIdx]) {
        minIdx = j;
        yield createStep(
          array,
          [minIdx],
          [],
          [...sorted],
          5,
          `New minimum found: ${array[minIdx]}`
        );
      }
    }

    if (minIdx !== i) {
      yield createStep(
        array,
        [],
        [i, minIdx],
        [...sorted],
        7,
        `Swapping ${array[i]} at position ${i} with ${array[minIdx]} at position ${minIdx}`
      );

      [array[i], array[minIdx]] = [array[minIdx], array[i]];

      yield createStep(
        array,
        [],
        [i, minIdx],
        [...sorted],
        7,
        `Swap complete`
      );
    }

    sorted.push(i);
  }

  sorted.push(n - 1);

  yield createStep(
    array,
    [],
    [],
    Array.from({ length: n }, (_, idx) => idx),
    10,
    'Selection Sort complete!'
  );
}

export function* insertionSort(arr: number[]): Generator<SortStep> {
  const array = [...arr];
  const n = array.length;

  yield createStep(array, [], [], [], 0, 'Starting Insertion Sort');

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    yield createStep(
      array,
      [i],
      [],
      Array.from({ length: i }, (_, idx) => idx),
      1,
      `Inserting ${key} into sorted portion`
    );

    while (j >= 0 && array[j] > key) {
      yield createStep(
        array,
        [j, j + 1],
        [],
        Array.from({ length: i }, (_, idx) => idx),
        4,
        `Comparing ${array[j]} with ${key}`
      );

      array[j + 1] = array[j];

      yield createStep(
        array,
        [],
        [j, j + 1],
        Array.from({ length: i }, (_, idx) => idx),
        5,
        `Moving ${array[j]} to position ${j + 1}`
      );

      j--;
    }

    array[j + 1] = key;

    if (j !== i - 1) {
      yield createStep(
        array,
        [],
        [j + 1],
        Array.from({ length: i + 1 }, (_, idx) => idx),
        7,
        `Placed ${key} at position ${j + 1}`
      );
    }
  }

  yield createStep(
    array,
    [],
    [],
    Array.from({ length: n }, (_, idx) => idx),
    9,
    'Insertion Sort complete!'
  );
}

export function* mergeSort(arr: number[]): Generator<SortStep> {
  const array = [...arr];
  const n = array.length;

  yield createStep(array, [], [], [], 0, 'Starting Merge Sort');

  function* mergeSortHelper(
    left: number,
    right: number
  ): Generator<SortStep> {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    yield createStep(
      array,
      Array.from({ length: right - left + 1 }, (_, i) => left + i),
      [],
      [],
      3,
      `Dividing array from index ${left} to ${right}`
    );

    yield* mergeSortHelper(left, mid);
    yield* mergeSortHelper(mid + 1, right);

    yield* merge(left, mid, right);
  }

  function* merge(
    left: number,
    mid: number,
    right: number
  ): Generator<SortStep> {
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);

    yield createStep(
      array,
      Array.from({ length: right - left + 1 }, (_, i) => left + i),
      [],
      [],
      10,
      `Merging [${leftArr.join(', ')}] and [${rightArr.join(', ')}]`
    );

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      yield createStep(
        array,
        [left + i, mid + 1 + j],
        [],
        [],
        14,
        `Comparing ${leftArr[i]} and ${rightArr[j]}`
      );

      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i];
        i++;
      } else {
        array[k] = rightArr[j];
        j++;
      }

      yield createStep(
        array,
        [],
        [k],
        [],
        18,
        `Placing ${array[k]} at position ${k}`
      );

      k++;
    }

    while (i < leftArr.length) {
      array[k] = leftArr[i];
      yield createStep(
        array,
        [],
        [k],
        [],
        22,
        `Copying remaining ${leftArr[i]} to position ${k}`
      );
      i++;
      k++;
    }

    while (j < rightArr.length) {
      array[k] = rightArr[j];
      yield createStep(
        array,
        [],
        [k],
        [],
        24,
        `Copying remaining ${rightArr[j]} to position ${k}`
      );
      j++;
      k++;
    }
  }

  if (n > 0) {
    yield* mergeSortHelper(0, n - 1);
  }

  yield createStep(
    array,
    [],
    [],
    Array.from({ length: n }, (_, idx) => idx),
    25,
    'Merge Sort complete!'
  );
}

export function* quickSort(arr: number[]): Generator<SortStep> {
  const array = [...arr];
  const n = array.length;

  yield createStep(array, [], [], [], 0, 'Starting Quick Sort');

  function* quickSortHelper(
    low: number,
    high: number
  ): Generator<SortStep> {
    if (low < high) {
      yield createStep(
        array,
        Array.from({ length: high - low + 1 }, (_, i) => low + i),
        [],
        [],
        1,
        `Sorting subarray from ${low} to ${high}`
      );

      const pi = yield* partition(low, high);

      yield* quickSortHelper(low, pi - 1);
      yield* quickSortHelper(pi + 1, high);
    }
  }

  function* partition(
    low: number,
    high: number
  ): Generator<SortStep, number, void> {
    const pivot = array[high];

    yield createStep(
      array,
      [],
      [high],
      [],
      7,
      `Pivot element: ${pivot} at position ${high}`
    );

    let i = low - 1;

    for (let j = low; j < high; j++) {
      yield createStep(
        array,
        [j],
        [high],
        [],
        10,
        `Comparing ${array[j]} with pivot ${pivot}`
      );

      if (array[j] < pivot) {
        i++;

        if (i !== j) {
          yield createStep(
            array,
            [],
            [i, j],
            [],
            12,
            `Swapping ${array[i]} and ${array[j]}`
          );

          [array[i], array[j]] = [array[j], array[i]];

          yield createStep(
            array,
            [],
            [i, j],
            [],
            12,
            `Swapped`
          );
        }
      }
    }

    yield createStep(
      array,
      [],
      [i + 1, high],
      [],
      15,
      `Placing pivot at correct position`
    );

    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    yield createStep(
      array,
      [],
      [i + 1],
      [i + 1],
      16,
      `Pivot ${array[i + 1]} is now in its final position`
    );

    return i + 1;
  }

  if (n > 0) {
    yield* quickSortHelper(0, n - 1);
  }

  yield createStep(
    array,
    [],
    [],
    Array.from({ length: n }, (_, idx) => idx),
    18,
    'Quick Sort complete!'
  );
}

export function* heapSort(arr: number[]): Generator<SortStep> {
  const array = [...arr];
  const n = array.length;

  yield createStep(array, [], [], [], 0, 'Starting Heap Sort');

  function* heapify(
    size: number,
    i: number
  ): Generator<SortStep> {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    yield createStep(
      array,
      [i, left, right].filter(x => x < size),
      [],
      [],
      19,
      `Heapifying subtree rooted at ${i}`
    );

    if (left < size && array[left] > array[largest]) {
      largest = left;
    }

    if (right < size && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== i) {
      yield createStep(
        array,
        [],
        [i, largest],
        [],
        22,
        `Swapping ${array[i]} and ${array[largest]}`
      );

      [array[i], array[largest]] = [array[largest], array[i]];

      yield createStep(
        array,
        [],
        [i, largest],
        [],
        23,
        `Swapped. Continuing heapify`
      );

      yield* heapify(size, largest);
    }
  }

  yield createStep(array, [], [], [], 2, 'Building max heap');
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    yield createStep(
      array,
      [],
      [0, i],
      Array.from({ length: n - i - 1 }, (_, idx) => n - 1 - idx),
      5,
      `Moving max ${array[0]} to position ${i}`
    );

    [array[0], array[i]] = [array[i], array[0]];

    yield createStep(
      array,
      [],
      [0],
      Array.from({ length: n - i }, (_, idx) => n - idx),
      6,
      `Swapped. Heapifying root`
    );

    yield* heapify(i, 0);
  }

  yield createStep(
    array,
    [],
    [],
    Array.from({ length: n }, (_, idx) => idx),
    10,
    'Heap Sort complete!'
  );
}

// PATTERN: REGISTRY OBJECT — maps AlgorithmType string to { generator, info }
// This is the lookup table used by the hook to find the right algorithm
export const algorithms = {
  bubble: { generator: bubbleSort, info: algorithmInfo.bubble },
  selection: { generator: selectionSort, info: algorithmInfo.selection },
  insertion: { generator: insertionSort, info: algorithmInfo.insertion },
  merge: { generator: mergeSort, info: algorithmInfo.merge },
  quick: { generator: quickSort, info: algorithmInfo.quick },
  heap: { generator: heapSort, info: algorithmInfo.heap },
};
