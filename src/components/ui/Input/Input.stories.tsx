import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter value...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Array Values',
    placeholder: 'e.g., 5, 3, 8, 1, 9',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Array Values',
    placeholder: 'e.g., 5, 3, 8, 1, 9',
    hint: 'Enter comma-separated numbers',
  },
};

export const WithError: Story = {
  args: {
    label: 'Array Values',
    placeholder: 'e.g., 5, 3, 8, 1, 9',
    value: 'abc, 123',
    error: 'Invalid input. Please enter valid numbers.',
  },
};

export const Monospace: Story = {
  args: {
    label: 'Code Input',
    placeholder: 'Enter code...',
    variant: 'mono',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    value: 'Fixed value',
  },
};

export const WithState: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      
      if (newValue && !/^[\d,\s]+$/.test(newValue)) {
        setError('Only numbers and commas are allowed');
      } else {
        setError('');
      }
    };
    
    return (
      <div style={{ maxWidth: '400px' }}>
        <Input
          label="Custom Array Values"
          placeholder="e.g., 5, 3, 8, 1, 9"
          value={value}
          onChange={handleChange}
          error={error}
          hint="Enter comma-separated numbers"
        />
      </div>
    );
  },
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <Input label="Name" placeholder="Your name" />
      <Input label="Email" type="email" placeholder="your@email.com" />
      <Input label="Code" variant="mono" placeholder="const x = 5;" />
    </div>
  ),
};
