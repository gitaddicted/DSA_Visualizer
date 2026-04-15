import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: '400px' }}>
      <CardHeader title="Card Title" subtitle="Optional subtitle text" />
      <CardBody>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          This is the card body content. Cards are used to group and display content in a clean, organized manner.
        </p>
      </CardBody>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" style={{ maxWidth: '400px' }}>
      <CardHeader title="Elevated Card" />
      <CardBody>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          This card has an elevated shadow effect for visual emphasis.
        </p>
      </CardBody>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card variant="interactive" style={{ maxWidth: '400px' }}>
      <CardHeader title="Interactive Card" subtitle="Hover me!" />
      <CardBody>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          This card has hover effects and can be clicked.
        </p>
      </CardBody>
    </Card>
  ),
};

export const NoPadding: Story = {
  render: () => (
    <Card style={{ maxWidth: '400px' }}>
      <CardHeader title="No Padding Body" />
      <CardBody noPadding>
        <div style={{ padding: '20px', background: 'var(--bg-tertiary)' }}>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            This body has no default padding.
          </p>
        </div>
      </CardBody>
    </Card>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
      <Card>
        <CardHeader title="Bubble Sort" subtitle="O(n²)" />
        <CardBody>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Simple comparison-based algorithm that repeatedly steps through the list.
          </p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Quick Sort" subtitle="O(n log n)" />
        <CardBody>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Divide-and-conquer algorithm using a pivot element to partition the array.
          </p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Merge Sort" subtitle="O(n log n)" />
        <CardBody>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Stable divide-and-conquer algorithm that splits and merges arrays.
          </p>
        </CardBody>
      </Card>
    </div>
  ),
};
