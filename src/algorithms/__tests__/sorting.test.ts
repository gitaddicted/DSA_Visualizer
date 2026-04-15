import { describe, it, expect } from 'vitest';
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
} from '../index';

describe('Sorting Algorithms', () => {
  const testCases = [
    { input: [5, 2, 8, 1, 9], expected: [1, 2, 5, 8, 9] },
    { input: [3, 1, 2], expected: [1, 2, 3] },
    { input: [1], expected: [1] },
    { input: [2, 1], expected: [1, 2] },
    { input: [10, 5, 3, 8, 2, 7, 1, 6, 4, 9], expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  ];

  describe('Bubble Sort', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should sort ${JSON.stringify(input)} to ${JSON.stringify(expected)}`, () => {
        const steps = [...bubbleSort(input)];
        const finalArray = steps[steps.length - 1]?.array;
        expect(finalArray).toEqual(expected);
      });
    });
  });

  describe('Selection Sort', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should sort ${JSON.stringify(input)} to ${JSON.stringify(expected)}`, () => {
        const steps = [...selectionSort(input)];
        const finalArray = steps[steps.length - 1]?.array;
        expect(finalArray).toEqual(expected);
      });
    });
  });

  describe('Insertion Sort', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should sort ${JSON.stringify(input)} to ${JSON.stringify(expected)}`, () => {
        const steps = [...insertionSort(input)];
        const finalArray = steps[steps.length - 1]?.array;
        expect(finalArray).toEqual(expected);
      });
    });
  });

  describe('Merge Sort', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should sort ${JSON.stringify(input)} to ${JSON.stringify(expected)}`, () => {
        const steps = [...mergeSort(input)];
        const finalArray = steps[steps.length - 1]?.array;
        expect(finalArray).toEqual(expected);
      });
    });
  });

  describe('Quick Sort', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should sort ${JSON.stringify(input)} to ${JSON.stringify(expected)}`, () => {
        const steps = [...quickSort(input)];
        const finalArray = steps[steps.length - 1]?.array;
        expect(finalArray).toEqual(expected);
      });
    });
  });

  describe('Heap Sort', () => {
    testCases.forEach(({ input, expected }) => {
      it(`should sort ${JSON.stringify(input)} to ${JSON.stringify(expected)}`, () => {
        const steps = [...heapSort(input)];
        const finalArray = steps[steps.length - 1]?.array;
        expect(finalArray).toEqual(expected);
      });
    });
  });
});

describe('Step Generation', () => {
  it('should generate at least one step for any input', () => {
    const steps = [...bubbleSort([5, 3, 8])];
    expect(steps.length).toBeGreaterThan(0);
  });

  it('should have comparing indices during comparison steps', () => {
    const steps = [...bubbleSort([5, 3, 8, 1])];
    const comparingSteps = steps.filter(step => step.comparing.length > 0);
    expect(comparingSteps.length).toBeGreaterThan(0);
  });

  it('should have swapping indices during swap steps', () => {
    const steps = [...bubbleSort([5, 3, 8, 1])];
    const swappingSteps = steps.filter(step => step.swapping.length > 0);
    expect(swappingSteps.length).toBeGreaterThan(0);
  });

  it('should have highlightLine for pseudocode tracking', () => {
    const steps = [...bubbleSort([5, 3])];
    steps.forEach(step => {
      expect(step.highlightLine).toBeDefined();
      expect(typeof step.highlightLine).toBe('number');
    });
  });
});
