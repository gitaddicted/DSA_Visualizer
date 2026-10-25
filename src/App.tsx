import { useState, useCallback } from 'react';
import {
  Card, CardHeader, CardBody,
  Select, Slider, Input, Button,
  ArrayVisualizer, Pseudocode,
  PlaybackControls, Statistics
} from './components';
import { useSortingAlgorithm } from './hooks';
import { AlgorithmType } from './algorithms/types';
import styles from './App.module.css';

// STATIC DATA — defined outside component so it's not recreated on every render
const algorithmOptions = [
  { value: 'bubble', label: 'Bubble Sort', badge: 'O(n²)' },
  { value: 'selection', label: 'Selection Sort', badge: 'O(n²)' },
  { value: 'insertion', label: 'Insertion Sort', badge: 'O(n²)' },
  { value: 'merge', label: 'Merge Sort', badge: 'O(n log n)' },
  { value: 'quick', label: 'Quick Sort', badge: 'O(n log n)' },
  { value: 'heap', label: 'Heap Sort', badge: 'O(n log n)' },
];

function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * 100) + 5
  );
}

function App() {
  // PATTERN: useState — local state management
  const [arraySize, setArraySize] = useState(15);
  const [customValues, setCustomValues] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('bubble');
  const [isShelfOpen, setIsShelfOpen] = useState(false);

  // PATTERN: Lazy initializer — runs once (function passed, not called)
  const [initialArray] = useState(() => generateRandomArray(15));

  // PATTERN: Custom hook — encapsulates all algorithmic logic
  const {
    array, steps, currentStep, isPlaying, speed,
    comparisons, swaps, currentStepData,
    play, pause, stepForward, stepBackward,
    jumpToStart, jumpToEnd, reset,
    setSpeed, setArray, setAlgorithm,
    generateRandomArray: generateNewArray,
    algorithmInfo,
  } = useSortingAlgorithm(initialArray, selectedAlgorithm);

  // PATTERN: useCallback — stable function reference prevents child re-renders
  const handleAlgorithmChange = useCallback((value: string) => {
    setSelectedAlgorithm(value as AlgorithmType);
    setAlgorithm(value as AlgorithmType);
  }, [setAlgorithm]);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    generateNewArray(size);
  }, [generateNewArray]);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, [setSpeed]);

  const handleCustomValuesBlur = useCallback(() => {
    const values = customValues
      .split(/[,\s]+/)
      .map(v => parseInt(v.trim(), 10))
      .filter(v => !isNaN(v) && v > 0 && v <= 100);

    if (values.length > 0) {
      setArray(values);
      setArraySize(values.length);
    }
  }, [customValues, setArray]);

  const handleRandomize = useCallback(() => {
    generateNewArray(arraySize);
    setCustomValues('');
  }, [arraySize, generateNewArray]);

  const handleReset = useCallback(() => {
    reset();
    setCustomValues('');
  }, [reset]);

  // PATTERN: COMPOSITION — small components nested to build the full UI
  // PATTERN: PROP DRILLING — data & callbacks flow down through props
  return (
    <div className={styles.app}>
      <section className={styles.topPlayback}>
        <PlaybackControls
          isPlaying={isPlaying}
          onPlay={play}
          onPause={pause}
          onStepForward={stepForward}
          onStepBackward={stepBackward}
          onJumpToStart={jumpToStart}
          onJumpToEnd={jumpToEnd}
          onReset={handleReset}
          // PATTERN: Derived boolean props computed inline
          canStepForward={currentStep < steps.length - 1}
          canStepBackward={currentStep > 0}
          // PATTERN: Optional chaining (?.) for nullable values
          description={currentStepData?.description}
        />
      </section>

      <main className={styles.main}>
        <div className={styles.content}>
          <section className={styles.visualizerSection}>
            <ArrayVisualizer
              array={currentStepData?.array || array}
              comparing={currentStepData?.comparing || []}
              swapping={currentStepData?.swapping || []}
              pivot={currentStepData?.pivot}
              sorted={currentStepData?.sorted || []}
              currentStep={currentStep}
              totalSteps={Math.max(steps.length - 1, 1)}
            />
          </section>

          <section className={styles.pseudocodeSection}>
            <Pseudocode
              lines={algorithmInfo.pseudocode}
              currentLine={currentStepData?.highlightLine || 0}
              algorithmName={algorithmInfo.name}
            />
          </section>

        </div>
      </main>

      {/* PATTERN: Inline event handler + ternary for conditional content */}
      <button
        type="button"
        className={styles.shelfHandle}
        onClick={() => setIsShelfOpen((prev) => !prev)}
        aria-expanded={isShelfOpen}
        aria-controls="left-shelf-panel"
        aria-label={isShelfOpen ? 'Hide controls panel' : 'Show controls panel'}
      >
        {isShelfOpen ? '✕' : '≡'}
      </button>

      {/* PATTERN: Template literal with conditional class — common pattern for dynamic styles */}
      <aside
        id="left-shelf-panel"
        className={`${styles.shelfPanel} ${isShelfOpen ? styles.shelfPanelOpen : ''}`}
      >
        <div className={styles.shelfScroll}>
          {/* PATTERN: Compound components — CardHeader/CardBody are children of Card */}
          <Card>
            <CardHeader title="Algorithm" subtitle="Select sorting algorithm" />
            <CardBody>
              {/* PATTERN: Controlled component — value + onChange */}
              <Select
                value={selectedAlgorithm}
                onChange={handleAlgorithmChange}
                options={algorithmOptions}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Parameters" subtitle="Configure visualization" />
            <CardBody>
              <div className={styles.controlStack}>
                {/* PATTERN: Controlled Slider with format callback */}
                <Slider
                  label="Array Size"
                  value={arraySize}
                  onChange={handleArraySizeChange}
                  min={5}
                  max={50}
                />
                <Slider
                  label="Animation Speed"
                  value={speed}
                  onChange={handleSpeedChange}
                  min={50}
                  max={1000}
                  step={50}
                  formatValue={(v) => `${v}ms`}
                  showRangeLabels
                />
                {/* PATTERN: Input with multiple event handlers */}
                <Input
                  label="Custom Values"
                  placeholder="e.g., 5, 3, 8, 1, 9"
                  value={customValues}
                  onChange={(e) => setCustomValues(e.target.value)}
                  onBlur={handleCustomValuesBlur}
                  hint="Enter comma-separated numbers (5-100)"
                />
                {/* PATTERN: Button with variant prop + event handler callback */}
                <Button variant="secondary" onClick={handleRandomize}>
                  Randomize Array
                </Button>
              </div>
            </CardBody>
          </Card>

          <Statistics
            comparisons={comparisons}
            swaps={swaps}
            currentStep={currentStep}
            totalSteps={Math.max(steps.length - 1, 1)}
            complexity={algorithmInfo.complexity}
            algorithmName={algorithmInfo.name}
          />
        </div>
      </aside>
    </div>
  );
}

export default App;
