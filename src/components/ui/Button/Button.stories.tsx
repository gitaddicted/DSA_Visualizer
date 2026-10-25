import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { Button } from './Button';

// PATTERN: STORYBOOK META — defines the component, its title, and controls
const meta: Meta<typeof Button> = {
  title: 'UI/Button',       // PATTERN: Naming convention — Category/Component
  component: Button,
  tags: ['autodocs'],        // PATTERN: autodocs tag — auto-generates documentation page
  argTypes: {                // PATTERN: argTypes — configures the Controls addon UI
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// PATTERN: VARIANT STORIES — each exported story demonstrates one prop configuration
export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary Button' },
};
// ^ PATTERN: args — maps directly to the component's props

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary Button' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost Button' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Danger Button' },
};

// PATTERN: SIZE STORIES — showcase each size variant
export const Small: Story = {
  args: { size: 'sm', children: 'Small Button' },
};

export const Medium: Story = {
  args: { size: 'md', children: 'Medium Button' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large Button' },
};

// PATTERN: STATE STORIES — demonstrate loading and disabled states
export const Loading: Story = {
  args: { loading: true, children: 'Loading...' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled Button' },
};

// PATTERN: COMPOSITE STORY — uses render function to show multiple variants together
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

// PATTERN: INTERACTION TEST — uses play function + @storybook/test for in-browser testing
export const InteractionClick: Story = {
  args: {
    children: 'Run Test Click',
    onClick: fn(),     // PATTERN: fn() creates a mock function that records calls
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Run Test Click' });

    await userEvent.click(button);

    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
