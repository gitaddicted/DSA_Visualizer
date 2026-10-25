// PATTERN: Interface — defines the shape of a data object
export interface SortStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  pivot?: number;        // PATTERN: Optional property (?)
  sorted: number[];
  highlightLine: number;
  description: string;
}

export interface AlgorithmInfo {
  name: string;
  complexity: string;
  pseudocode: string[];
}

// PATTERN: Union type — a value can be one of several string literals
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
