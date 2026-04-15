import { useState, useCallback, useEffect, useRef } from 'react';
import { SortStep, AlgorithmType } from '../algorithms/types';
import { algorithms } from '../algorithms';

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

export function useSortingAlgorithm(
  initialArray: number[] = [],
  initialAlgorithm: AlgorithmType = 'bubble'
): UseSortingAlgorithmReturn {
  const [array, setArrayState] = useState<number[]>(initialArray);
  const [algorithm, setAlgorithmState] = useState<AlgorithmType>(initialAlgorithm);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeedState] = useState(300);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const intervalRef = useRef<number | null>(null);

  const generateSteps = useCallback((arr: number[], algo: AlgorithmType) => {
    const generator = algorithms[algo].generator(arr);
    const generatedSteps: SortStep[] = [];
    let result = generator.next();

    while (!result.done) {
      generatedSteps.push(result.value);
      result = generator.next();
    }

    if (generatedSteps.length > 0) {
      generatedSteps.push({
        ...generatedSteps[generatedSteps.length - 1],
        description: 'Sorting complete!',
      });
    }

    return generatedSteps;
  }, []);

  const algorithmInfo = algorithms[algorithm].info;

  useEffect(() => {
    if (array.length > 0) {
      const newSteps = generateSteps([...array], algorithm);
      setSteps(newSteps);
      setCurrentStep(0);
      setComparisons(0);
      setSwaps(0);
    }
  }, [array, algorithm, generateSteps]);

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

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, speed, steps.length]);

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

  const currentStepData = steps[currentStep] || null;

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
