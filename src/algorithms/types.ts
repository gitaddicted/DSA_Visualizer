export interface SortStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  pivot?: number;
  sorted: number[];
  highlightLine: number;
  description: string;
}

export interface AlgorithmInfo {
  name: string;
  complexity: string;
  pseudocode: string[];
}

export type AlgorithmType = 
  | 'bubble'
  | 'selection'
  | 'insertion'
  | 'merge'
  | 'quick'
  | 'heap';

export interface SortingState {
  steps: SortStep[];
  currentStep: number;
  isPlaying: boolean;
  speed: number;
  comparisons: number;
  swaps: number;
}
