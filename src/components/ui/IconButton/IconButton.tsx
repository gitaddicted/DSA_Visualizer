import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './IconButton.module.css';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost' | 'control' | 'active';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  children: ReactNode;
  label: string;
}

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
      aria-label={label}
      title={label}
      {...props}
    >
      {children}
    </button>
  );
}
