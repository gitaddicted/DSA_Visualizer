import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './IconButton.module.css';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost' | 'control' | 'active';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  children: ReactNode;
  label: string;    // PATTERN: Required label prop — enforces accessibility
}

// PATTERN: ICON BUTTON — no visible text, relies on aria-label for screen readers
export function IconButton({
  variant = 'default',
  size = 'md',
  active,
  disabled,
  className,
  children,
  label,
  ...props
}: IconButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    active && styles.active,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled}
      aria-label={label}    // PATTERN: aria-label provides accessible name for icon-only button
      title={label}          // PATTERN: title shows tooltip on hover
      {...props}
    >
      {children}             {/* PATTERN: children is the icon element (from lucide-react) */}
    </button>
  );
}
