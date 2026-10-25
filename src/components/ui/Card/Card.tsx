import { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive';
  children: ReactNode;
}

export interface CardHeaderProps {
  title: string;
  subtitle?: string;
}

// PATTERN: Reusable container — accepts variant prop to switch visual style
export function Card({
  variant = 'default',
  className,
  children,
  ...props
}: CardProps) {
  const classes = [
    styles.card,
    variant === 'elevated' && styles.elevated,
    variant === 'interactive' && styles.interactive,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

// PATTERN: COMPOUND COMPONENT — CardHeader, CardBody, CardFooter
// These are designed to be used as children of <Card>
export function CardHeader({ title, subtitle }: CardHeaderProps) {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{title}</h3>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {/* ^ PATTERN: Conditional render with && — only renders when subtitle is truthy */}
    </div>
  );
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  children: ReactNode;
}

export function CardBody({
  noPadding,
  className,
  children,
  ...props
}: CardBodyProps) {
  const classes = [
    styles.body,
    noPadding && styles.noPadding,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={`${styles.footer} ${className || ''}`} {...props}>
      {children}
    </div>
  );
}
