import styles from './Slider.module.css';

export interface SliderProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  formatValue?: (value: number) => string;
  showRangeLabels?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  formatValue,
  showRangeLabels = false,
  disabled,
  className,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  const displayValue = formatValue ? formatValue(value) : value.toString();

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <div className={styles.header}>
        {label && <span className={styles.label}>{label}</span>}
        <span className={styles.value}>{displayValue}</span>
      </div>
      <div className={styles.sliderWrapper}>
        <div className={styles.track} />
        <div className={styles.fill} style={{ width: `${percentage}%` }} />
        <input
          type="range"
          className={styles.input}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
        <div
          className={styles.thumb}
          style={{ left: `calc(${percentage}% - 8px)` }}
        >
          <span className={styles.tooltip}>{displayValue}</span>
        </div>
      </div>
      {showRangeLabels && (
        <div className={styles.rangeLabels}>
          <span className={styles.rangeLabel}>{formatValue ? formatValue(min) : min}</span>
          <span className={styles.rangeLabel}>{formatValue ? formatValue(max) : max}</span>
        </div>
      )}
    </div>
  );
}
