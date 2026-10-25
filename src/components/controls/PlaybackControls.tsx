import {
  ChevronsLeft, SkipBack, Play, Pause,
  SkipForward, ChevronsRight, RotateCcw
} from 'lucide-react';
import { IconButton } from '../ui';
import styles from './PlaybackControls.module.css';

export interface PlaybackControlsProps {
  // PATTERN: Callback props — functions the parent provides; child calls them on interaction
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onJumpToStart: () => void;
  onJumpToEnd: () => void;
  onReset: () => void;
  canStepForward: boolean;    // PATTERN: Boolean props control disabled state
  canStepBackward: boolean;
  description?: string;
}

// PATTERN: CONTROLS COMPONENT — composed entirely from smaller UI components
export function PlaybackControls({
  isPlaying,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onJumpToStart,
  onJumpToEnd,
  onReset,
  canStepForward,
  canStepBackward,
  description,
}: PlaybackControlsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Playback Controls</h3>
      </div>
      <div className={styles.controls}>
        <IconButton variant="control" size="sm" onClick={onReset} label="Reset algorithm">
          <RotateCcw size={18} />
        </IconButton>
        <div className={styles.divider} />
        <IconButton variant="control" size="sm" onClick={onJumpToStart}
          disabled={!canStepBackward} label="Jump to start">
          <ChevronsLeft size={18} />
        </IconButton>
        <IconButton variant="control" size="sm" onClick={onStepBackward}
          disabled={!canStepBackward} label="Step backward">
          <SkipBack size={18} />
        </IconButton>
        {/* PATTERN: Play/Pause toggle — ternary switches icon and handler */}
        <IconButton variant="primary"
          onClick={isPlaying ? onPause : onPlay}
          label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </IconButton>
        <IconButton variant="control" size="sm" onClick={onStepForward}
          disabled={!canStepForward} label="Step forward">
          <SkipForward size={18} />
        </IconButton>
        <IconButton variant="control" size="sm" onClick={onJumpToEnd}
          disabled={!canStepForward} label="Jump to end">
          <ChevronsRight size={18} />
        </IconButton>
      </div>
      {/* PATTERN: Conditional description — only renders when description is truthy */}
      {description && (
        <div className={styles.description}>
          <span className={styles.descriptionText}>{description}</span>
        </div>
      )}
    </div>
  );
}
