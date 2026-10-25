import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

// PATTERN: Extends native input props — inherits onChange, placeholder, value, etc.
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  variant?: 'default' | 'mono';
}

export function Input({
  label,
  error,
  hint,
  variant = 'default',
  className,
  ...props       // PATTERN: Rest spread — captures all native input attributes
}: InputProps) {
  const inputClasses = [
    styles.input,
    error && styles.error,
    variant === 'mono' && styles.mono,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      {/* PATTERN: Spread native props onto the real <input> element */}
      <input className={inputClasses} {...props} />
      {/* PATTERN: Conditional error vs hint — only one shows at a time */}
      {error && <span className={styles.errorMessage}>{error}</span>}
      {hint && !error && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}
