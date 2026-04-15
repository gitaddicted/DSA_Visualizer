import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

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
  ...props
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
      <input className={inputClasses} {...props} />
      {error && <span className={styles.errorMessage}>{error}</span>}
      {hint && !error && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}
