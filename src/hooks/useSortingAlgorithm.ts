import { useState, useCallback, useEffect, useRef } from 'react';
import { SortStep, AlgorithmType } from '../algorithms/types';
import { algorithms } from '../algorithms';

// PATTERN: Return type interface — documents the hook's public API
export interface UseSortingAlgorithmReturn {
  array: number[];
  steps: SortStep[];
  currentStep: number;
  isPlaying: boolean;
  speed: number;
  comparisons: number;
  swaps: number;
  currentStepData: SortStep | null;
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  jumpToStart: () => void;
  jumpToEnd: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
  setArray: (array: number[]) => void;
  setAlgorithm: (algorithm: AlgorithmType) => void;
  generateRandomArray: (size: number) => void;
  algorithmInfo: {
    name: string;
    complexity: string;
    pseudocode: string[];
  };
}

// PATTERN: CUSTOM HOOK — extracts stateful logic from components into reusable functions
export function useSortingAlgorithm(
  initialArray: number[] = [],
  initialAlgorithm: AlgorithmType = 'bubble'
): UseSortingAlgorithmReturn {
  // PATTERN: Multiple useState calls — one per independent piece of state
  const [array, setArrayState] = useState<number[]>(initialArray);
  const [algorithm, setAlgorithmState] = useState<AlgorithmType>(initialAlgorithm);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeedState] = useState(300);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  // PATTERN: useRef — holds mutable value across renders WITHOUT causing re-render
  const intervalRef = useRef<number | null>(null);

  // PATTERN: DRAGGING A GENERATOR — fully consumes the generator into an array for instant seek
  const generateSteps = useCallback((arr: number[], algo: AlgorithmType) => {
    const generator = algorithms[algo].generator(arr);
    const generatedSteps: SortStep[] = [];
    let result = generator.next();

    while (!result.done) {
      generatedSteps.push(result.value);
      result = generator.next();
    }

    // PATTERN: Spread operator — clones last step to add completion marker
    if (generatedSteps.length > 0) {
      generatedSteps.push({
        ...generatedSteps[generatedSteps.length - 1],
        description: 'Sorting complete!',
      });
    }

    return generatedSteps;
  }, []);

  // PATTERN: Derived value — computed from state, not stored in state
  const algorithmInfo = algorithms[algorithm].info;

  // PATTERN: useEffect — synchronizes steps when inputs (array/algorithm) change
  useEffect(() => {
    if (array.length > 0) {
      const newSteps = generateSteps([...array], algorithm);
      setSteps(newSteps);
      setCurrentStep(0);
      setComparisons(0);
      setSwaps(0);
    }
  }, [array, algorithm, generateSteps]);

  // PATTERN: useEffect — derives stats by reacting to step changes
  useEffect(() => {
    if (steps.length > 0 && currentStep > 0 && currentStep <= steps.length) {
      const step = steps[currentStep - 1];
      if (step) {
        if (step.comparing.length > 0) {
          setComparisons(prev => prev + 1);
        }
        if (step.swapping.length > 0) {
          setSwaps(prev => prev + 1);
        }
      }
    }
  }, [currentStep, steps]);

  // PATTERN: useEffect with cleanup — manages the playback interval lifecycle
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = window.setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }

    // PATTERN: Cleanup function — runs on unmount or before re-running the effect
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, speed, steps.length]);

  // PATTERN: All mutating functions wrapped in useCallback for stable references
  const play = useCallback(() => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
      setComparisons(0);
      setSwaps(0);
    }
    setIsPlaying(true);
  }, [currentStep, steps.length]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const stepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, steps.length]);

  const stepBackward = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const jumpToStart = useCallback(() => {
    setCurrentStep(0);
    setComparisons(0);
    setSwaps(0);
    setIsPlaying(false);
  }, []);

  const jumpToEnd = useCallback(() => {
    setCurrentStep(steps.length - 1);
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [steps.length]);

  // PATTERN: Reset — clears all state back to initial values
  const reset = useCallback(() => {
    setCurrentStep(0);
    setComparisons(0);
    setSwaps(0);
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    const newSteps = generateSteps([...array], algorithm);
    setSteps(newSteps);
  }, [array, algorithm, generateSteps]);

  const setSpeed = useCallback((newSpeed: number) => {
    setSpeedState(newSpeed);
  }, []);

  const setArray = useCallback((newArray: number[]) => {
    setArrayState(newArray);
    setCurrentStep(0);
    setComparisons(0);
    setSwaps(0);
    setIsPlaying(false);
  }, []);

  const setAlgorithm = useCallback((newAlgorithm: AlgorithmType) => {
    setAlgorithmState(newAlgorithm);
    setCurrentStep(0);
    setComparisons(0);
    setSwaps(0);
    setIsPlaying(false);
  }, []);

  const generateRandomArray = useCallback((size: number) => {
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100) + 5
    );
    setArrayState(newArray);
    setCurrentStep(0);
    setComparisons(0);
    setSwaps(0);
    setIsPlaying(false);
  }, []);

  // PATTERN: Derived value — computed synchronously from state, available immediately
  const currentStepData = steps[currentStep] || null;

  // PATTERN: Return object — exposes state + actions as a single cohesive API
  return {
    array: currentStepData?.array || array,
    steps,
    currentStep,
    isPlaying,
    speed,
    comparisons,
    swaps,
    currentStepData,
    play,
    pause,
    stepForward,
    stepBackward,
    jumpToStart,
    jumpToEnd,
    reset,
    setSpeed,
    setArray,
    setAlgorithm,
    generateRandomArray,
    algorithmInfo,
  };
}
