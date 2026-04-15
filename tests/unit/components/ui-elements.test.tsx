import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  ArrayVisualizer,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Input,
  PlaybackControls,
  Select,
  Slider,
  Statistics,
} from '../../../src/components';

describe('UI elements', () => {
  it('renders and activates the primary button', () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Run</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Run' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables a loading button', () => {
    render(<Button loading>Saving</Button>);

    expect(screen.getByRole('button', { name: 'Saving' })).toBeDisabled();
  });

  it('renders an accessible icon button', () => {
    const onClick = vi.fn();

    render(
      <IconButton label="Open menu" onClick={onClick}>
        <span aria-hidden="true">+</span>
      </IconButton>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders card sections', () => {
    render(
      <Card>
        <CardHeader title="Controls" subtitle="Configure the run" />
        <CardBody>Body content</CardBody>
        <CardFooter>Footer content</CardFooter>
      </Card>
    );

    expect(screen.getByText('Controls')).toBeInTheDocument();
    expect(screen.getByText('Configure the run')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('updates a select value', () => {
    const onChange = vi.fn();

    render(
      <Select
        label="Algorithm"
        value="bubble"
        onChange={onChange}
        options={[
          { value: 'bubble', label: 'Bubble Sort' },
          { value: 'merge', label: 'Merge Sort' },
        ]}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'merge' },
    });

    expect(onChange).toHaveBeenCalledWith('merge');
  });

  it('updates a slider value', () => {
    const onChange = vi.fn();

    render(
      <Slider
        label="Speed"
        value={300}
        onChange={onChange}
        min={50}
        max={1000}
        step={50}
        formatValue={(value) => `${value}ms`}
        showRangeLabels
      />
    );

    fireEvent.change(screen.getByRole('slider'), {
      target: { value: '700' },
    });

    expect(onChange).toHaveBeenCalledWith(700);
    expect(screen.getAllByText('300ms')).toHaveLength(2);
    expect(screen.getByText('50ms')).toBeInTheDocument();
    expect(screen.getByText('1000ms')).toBeInTheDocument();
  });

  it('renders input help text and forwards changes', () => {
    const onChange = vi.fn();

    render(
      <Input
        label="Custom values"
        placeholder="1, 2, 3"
        value=""
        onChange={onChange}
        hint="Use comma-separated numbers"
      />
    );

    fireEvent.change(screen.getByPlaceholderText('1, 2, 3'), {
      target: { value: '4, 5, 6' },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Use comma-separated numbers')).toBeInTheDocument();
  });

  it('shows playback controls and toggles the main action', () => {
    const onPlay = vi.fn();
    const onPause = vi.fn();

    render(
      <PlaybackControls
        isPlaying={false}
        onPlay={onPlay}
        onPause={onPause}
        onStepForward={vi.fn()}
        onStepBackward={vi.fn()}
        onJumpToStart={vi.fn()}
        onJumpToEnd={vi.fn()}
        onReset={vi.fn()}
        canStepForward={false}
        canStepBackward={false}
        description="Comparing values"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Play' }));

    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Comparing values')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Jump to start' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Jump to end' })).toBeDisabled();

    render(
      <PlaybackControls
        isPlaying
        onPlay={onPlay}
        onPause={onPause}
        onStepForward={vi.fn()}
        onStepBackward={vi.fn()}
        onJumpToStart={vi.fn()}
        onJumpToEnd={vi.fn()}
        onReset={vi.fn()}
        canStepForward
        canStepBackward
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Pause' }));

    expect(onPause).toHaveBeenCalledTimes(1);
  });

  it('renders statistics progress and values', () => {
    render(
      <Statistics
        comparisons={12}
        swaps={4}
        currentStep={5}
        totalSteps={10}
        complexity="O(n log n)"
        algorithmName="Merge Sort"
      />
    );

    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('O(n log n)')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders the array visualizer with proportional bars', () => {
    render(
      <ArrayVisualizer
        array={[10, 20]}
        comparing={[0]}
        swapping={[1]}
        pivot={1}
        sorted={[0, 1]}
        currentStep={2}
        totalSteps={8}
      />
    );

    expect(screen.getByText('Array Visualization')).toBeInTheDocument();
    expect(screen.getByText('Step 2 of 8')).toBeInTheDocument();
    expect(screen.getByText('Comparing')).toBeInTheDocument();
    expect(screen.getByText('Swapping')).toBeInTheDocument();
    expect(screen.getByText('Pivot')).toBeInTheDocument();
    expect(screen.getByText('Sorted')).toBeInTheDocument();
    expect(screen.getByTestId('array-bar-fill-0')).toHaveStyle({ height: '50%' });
    expect(screen.getByTestId('array-bar-fill-1')).toHaveStyle({ height: '100%' });
  });

  it('shows an empty visualizer state when there is no array', () => {
    render(
      <ArrayVisualizer
        array={[]}
        comparing={[]}
        swapping={[]}
        sorted={[]}
        currentStep={0}
        totalSteps={0}
      />
    );

    expect(screen.getByText('Add elements to visualize sorting')).toBeInTheDocument();
  });
});