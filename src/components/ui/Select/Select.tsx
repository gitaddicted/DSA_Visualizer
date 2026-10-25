import { ChevronDown } from 'lucide-react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  badge?: string;
}

export interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;   // PATTERN: onChange passes value, not event
  options: SelectOption[];
  disabled?: boolean;
  className?: string;
}

// PATTERN: CONTROLLED COMPONENT — React controls value, native <select> just displays it
export function Select({
  label,
  value,
  onChange,
  options,
  disabled,
  className,
}: SelectProps) {
  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.selectWrapper}>
        <select
          className={styles.select}
          value={value}                     // controlled by React state
          onChange={(e) => onChange(e.target.value)}  // propagates new value upward
          disabled={disabled}
        >
          {/* PATTERN: Array.map to render a list — every child needs a unique key */}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* PATTERN: Decorative icon overlaid on the native select */}
        <ChevronDown size={16} className={styles.chevron} />
      </div>
    </div>
  );
}
