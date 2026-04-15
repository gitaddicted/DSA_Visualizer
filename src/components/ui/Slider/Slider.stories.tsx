import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    label: 'Array Size',
    value: 15,
    min: 5,
    max: 50,
  },
};

export const WithRangeLabels: Story = {
  args: {
    label: 'Animation Speed',
    value: 300,
    min: 50,
    max: 1000,
    formatValue: (v) => `${v}ms`,
    showRangeLabels: true,
  },
};

export const WithState: Story = {
  render: () => {
    const [size, setSize] = useState(15);
    const [speed, setSpeed] = useState(300);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
        <Slider
          label="Array Size"
          value={size}
          onChange={setSize}
          min={5}
          max={50}
        />
        <Slider
          label="Animation Speed"
          value={speed}
          onChange={setSpeed}
          min={50}
          max={1000}
          step={50}
          formatValue={(v) => `${v}ms`}
          showRangeLabels
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Slider',
    value: 50,
    min: 0,
    max: 100,
    disabled: true,
  },
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '400px' }}>
      <Slider label="Small Range" value={25} min={0} max={50} onChange={() => {}} />
      <Slider label="Large Range" value={500} min={100} max={1000} step={100} formatValue={(v) => `${v}%`} onChange={() => {}} />
      <Slider label="With Ticks" value={3} min={1} max={5} formatValue={(v) => `Level ${v}`} onChange={() => {}} />
    </div>
  ),
};
