import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Select } from './Select';
import { useState } from 'react';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const algorithmOptions = [
  { value: 'bubble', label: 'Bubble Sort', badge: 'O(n²)' },
  { value: 'selection', label: 'Selection Sort', badge: 'O(n²)' },
  { value: 'insertion', label: 'Insertion Sort', badge: 'O(n²)' },
  { value: 'merge', label: 'Merge Sort', badge: 'O(n log n)' },
  { value: 'quick', label: 'Quick Sort', badge: 'O(n log n)' },
  { value: 'heap', label: 'Heap Sort', badge: 'O(n log n)' },
];

export const Default: Story = {
  args: {
    label: 'Algorithm',
    value: 'bubble',
    options: algorithmOptions,
  },
};

export const WithState: Story = {
  render: () => {
    const [value, setValue] = useState('bubble');
    return (
      <div style={{ maxWidth: '300px' }}>
        <Select
          label="Sorting Algorithm"
          value={value}
          onChange={setValue}
          options={algorithmOptions}
        />
        <p style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
          Selected: {value}
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Algorithm',
    value: 'bubble',
    options: algorithmOptions,
    disabled: true,
  },
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '300px' }}>
      <Select
        label="Primary Algorithm"
        value="bubble"
        onChange={() => {}}
        options={algorithmOptions}
      />
      <Select
        label="Secondary Algorithm"
        value="quick"
        onChange={() => {}}
        options={algorithmOptions}
      />
    </div>
  ),
};

export const InteractionSelect: Story = {
  render: () => {
    const [value, setValue] = useState('bubble');

    return (
      <div style={{ maxWidth: '300px' }}>
        <Select
          label="Sorting Algorithm"
          value={value}
          onChange={setValue}
          options={algorithmOptions}
        />
        <p data-testid="selected-value" style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
          Selected: {value}
        </p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    await userEvent.selectOptions(select, 'quick');

    await expect(canvas.getByTestId('selected-value')).toHaveTextContent('Selected: quick');
  },
};
