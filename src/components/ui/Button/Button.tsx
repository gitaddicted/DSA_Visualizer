import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

// PATTERN: Extends native HTML attributes — component accepts ALL native button props
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

// PATTERN: Destructuring with default values — props without a value fall back
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  ...props               // PATTERN: Rest spread — captures remaining native props
}: ButtonProps) {
  // PATTERN: Conditional class array — filter(Boolean).join(' ') is idiomatic React
  const classes = [
    styles.button,          // always applied
    styles[variant],        // dynamic lookup in CSS Module object
    styles[size],
    loading && styles.loading,  // only included when truthy
    className,              // allows consumers to pass extra classes
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}  // PATTERN: Computed disabled — loading implies disabled
      {...props}                      // PATTERN: Spread remaining props onto the native element
    >
      {loading && <span className={styles.spinner} />}  // PATTERN: Conditional render with &&
      {children}                                        // PATTERN: children prop renders nested content
    </button>
  );
}
