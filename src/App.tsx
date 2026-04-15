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
  const [arraySize, setArraySize] = useState(15);
  const [customValues, setCustomValues] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('bubble');

  const [initialArray] = useState(() => generateRandomArray(15));

  const {
    array,
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
    generateRandomArray: generateNewArray,
    algorithmInfo,
  } = useSortingAlgorithm(initialArray, selectedAlgorithm);

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

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <svg className={styles.logoIcon} viewBox="0 0 32 32" fill="none">
            <rect x="2" y="16" width="6" height="14" rx="1" fill="#3fb950"/>
            <rect x="10" y="10" width="6" height="20" rx="1" fill="#58a6ff"/>
            <rect x="18" y="4" width="6" height="26" rx="1" fill="#a371f7"/>
            <rect x="26" y="12" width="4" height="18" rx="1" fill="#d29922"/>
          </svg>
          <span className={styles.logoText}>
            DSA Visualizer
            <span className={styles.logoSubtext}>Sorting Algorithms</span>
          </span>
        </div>
      </header>

      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <Card>
            <CardHeader title="Algorithm" subtitle="Select sorting algorithm" />
            <CardBody>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                <Input
                  label="Custom Values"
                  placeholder="e.g., 5, 3, 8, 1, 9"
                  value={customValues}
                  onChange={(e) => setCustomValues(e.target.value)}
                  onBlur={handleCustomValuesBlur}
                  hint="Enter comma-separated numbers (5-100)"
                />
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
        </aside>

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

          <section className={styles.controlsSection}>
            <PlaybackControls
              isPlaying={isPlaying}
              onPlay={play}
              onPause={pause}
              onStepForward={stepForward}
              onStepBackward={stepBackward}
              onJumpToStart={jumpToStart}
              onJumpToEnd={jumpToEnd}
              onReset={handleReset}
              canStepForward={currentStep < steps.length - 1}
              canStepBackward={currentStep > 0}
              description={currentStepData?.description}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
