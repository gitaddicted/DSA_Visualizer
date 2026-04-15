import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { 
  Play, Pause, SkipBack, SkipForward, 
  ChevronsLeft, ChevronsRight, RefreshCw 
} from 'lucide-react';

const meta: Meta<typeof IconButton> = {
  title: 'UI/IconButton',
  component: IconButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    size: 'md',
    label: 'Button',
    children: <Play size={18} />,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small button',
    children: <Play size={14} />,
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium button',
    children: <Play size={18} />,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large button',
    children: <Play size={22} />,
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Play',
    children: <Play size={18} />,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost button',
    children: <RefreshCw size={18} />,
  },
};

export const Control: Story = {
  args: {
    variant: 'control',
    label: 'Control button',
    children: <Pause size={18} />,
  },
};

export const Active: Story = {
  args: {
    variant: 'control',
    active: true,
    label: 'Active button',
    children: <Pause size={18} />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled button',
    children: <Play size={18} />,
  },
};

export const PlaybackControls: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <IconButton variant="control" size="sm" label="Jump to start">
        <ChevronsLeft size={18} />
      </IconButton>
      <IconButton variant="control" size="sm" label="Step backward">
        <SkipBack size={18} />
      </IconButton>
      <IconButton variant="primary" label="Play/Pause">
        <Play size={18} />
      </IconButton>
      <IconButton variant="control" size="sm" label="Step forward">
        <SkipForward size={18} />
      </IconButton>
      <IconButton variant="control" size="sm" label="Jump to end">
        <ChevronsRight size={18} />
      </IconButton>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <IconButton variant="default" label="Default">
        <Play size={18} />
      </IconButton>
      <IconButton variant="primary" label="Primary">
        <Play size={18} />
      </IconButton>
      <IconButton variant="ghost" label="Ghost">
        <RefreshCw size={18} />
      </IconButton>
      <IconButton variant="control" label="Control">
        <Pause size={18} />
      </IconButton>
    </div>
  ),
};
