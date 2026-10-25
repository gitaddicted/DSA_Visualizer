import { memo, useMemo } from 'react';
import styles from './ArrayVisualizer.module.css';

export interface ArrayVisualizerProps {
  array: number[];
  comparing: number[];
  swapping: number[];
  pivot?: number;
  sorted: number[];
  currentStep: number;
  totalSteps: number;
}

// PATTERN: INTERNAL COMPONENT — defined in the same file, only used here
function Bar({
  value,
  maxValue,
  isComparing,
  isSwapping,
  isPivot,
  isSorted,
  index,
}: {
  value: number;
  maxValue: number;
  isComparing: boolean;
  isSwapping: boolean;
  isPivot: boolean;
  isSorted: boolean;
  index: number;
}) {
  const heightPercentage = (value / maxValue) * 100;

  // PATTERN: Conditional class array with priority — sorted only applies when no other state
  const barClasses = [
    styles.barRect,
    isComparing && styles.comparing,
    isSwapping && styles.swapping,
    isPivot && styles.pivot,
    isSorted && !isComparing && !isSwapping && !isPivot && styles.sorted,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.bar} data-testid={`array-bar-${index}`}>
      <span className={styles.barValue}>{value}</span>
      <div
        className={barClasses}
        data-testid={`array-bar-fill-${index}`}
        style={{ height: `${Math.max(heightPercentage, 5)}%` }}
      />
    </div>
  );
}

// PATTERN: React.memo — prevents re-render when props haven't changed (performance optimization)
const MemoizedBar = memo(Bar);

export function ArrayVisualizer({
  array,
  comparing,
  swapping,
  pivot,
  sorted,
  currentStep,
  totalSteps,
}: ArrayVisualizerProps) {
  // PATTERN: useMemo — caches computed value, only re-computes when dependency (array) changes
  const maxValue = useMemo(() => Math.max(...array, 1), [array]);

  // PATTERN: Early return for empty state — renders a placeholder instead of the chart
  if (array.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          Add elements to visualize sorting
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Array Visualization</h3>
        <span className={styles.stepInfo}>
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className={styles.visualizer}>
        {/* PATTERN: Array.map to render a list — each MemoizedBar gets a unique key */}
        {array.map((value, index) => (
          <MemoizedBar
            key={`${index}-${value}`}   // PATTERN: Composite key (index + value) for stability
            value={value}
            maxValue={maxValue}
            isComparing={comparing.includes(index)}
            isSwapping={swapping.includes(index)}
            isPivot={pivot === index}
            isSorted={sorted.includes(index)}
            index={index}
          />
        ))}
      </div>
      {/* PATTERN: Static legend — pure presentational JSX, no logic */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.legendComparing}`} />
          Comparing
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.legendSwapping}`} />
          Swapping
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.legendPivot}`} />
          Pivot
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.legendSorted}`} />
          Sorted
        </div>
      </div>
    </div>
  );
}
