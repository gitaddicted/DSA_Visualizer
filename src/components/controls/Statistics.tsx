import styles from './Statistics.module.css';

export interface StatisticsProps {
  comparisons: number;
  swaps: number;
  currentStep: number;
  totalSteps: number;
  complexity: string;
  algorithmName: string;
}

export function Statistics({
  comparisons,
  swaps,
  currentStep,
  totalSteps,
  complexity,
  algorithmName,
}: StatisticsProps) {
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Statistics</h3>
        <span className={styles.subtitle}>{algorithmName}</span>
      </div>
      <div className={styles.stats}>
        <div className={`${styles.stat} ${styles.statComparisons}`}>
          <span className={styles.statLabel}>Comparisons</span>
          <span className={styles.statValue}>{comparisons}</span>
        </div>
        <div className={`${styles.stat} ${styles.statSwaps}`}>
          <span className={styles.statLabel}>Swaps</span>
          <span className={styles.statValue}>{swaps}</span>
        </div>
        <div className={`${styles.stat} ${styles.statSteps}`}>
          <span className={styles.statLabel}>Step</span>
          <span className={styles.statValue}>{currentStep}</span>
        </div>
        <div className={`${styles.stat} ${styles.statComplexity}`}>
          <span className={styles.statLabel}>Complexity</span>
          <span className={styles.statValue}>{complexity}</span>
        </div>
      </div>
      <div className={styles.progress}>
        <div className={styles.progressLabel}>
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
