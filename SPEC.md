# DSA Visualizer - Sorting Algorithm Step-by-Step Visualization

## Concept & Vision

A pedagogical tool designed to demystify sorting algorithms for students by exposing the inner workings: every comparison, every swap, every decision. The interface feels like a well-designed IDE merged with an interactive whiteboard — clean, focused, and surgical. The experience should evoke the clarity of a computer science textbook brought to life, where pseudocode and visualization breathe in perfect synchrony.

The aesthetic is **"Digital Blueprint"** — technical precision meets visual elegance. Dark backgrounds suggest focus and concentration; accent colors act as visual syntax highlighting, drawing attention to the algorithmic "hot spots" in real-time.

## Design Language

### Aesthetic Direction
Inspired by modern code editors (VS Code, JetBrains) and technical documentation. Clean lines, generous whitespace, monospace typography for code, and a dark mode that reduces eye strain during study sessions.

### Color Palette
```
--bg-primary: #0d1117        /* Deep space black */
--bg-secondary: #161b22      /* Elevated surfaces */
--bg-tertiary: #21262d       /* Cards, panels */
--border: #30363d            /* Subtle borders */
--text-primary: #e6edf3      /* High contrast text */
--text-secondary: #8b949e    /* Muted text */
--text-muted: #6e7681        /* Disabled/hints */

--accent-blue: #58a6ff        /* Primary actions, active elements */
--accent-green: #3fb950      /* Comparisons, success states */
--accent-yellow: #d29922      /* Swaps, warnings */
--accent-purple: #a371f7     /* Current line highlight */
--accent-red: #f85149        /* Pivot elements, errors */

--gradient-start: #1a1f29
--gradient-end: #0d1117
```

### Typography
- **Headings**: JetBrains Mono (600 weight) — technical, distinctive, legible
- **Body**: Inter (400, 500) — clean, highly readable
- **Code/Pseudocode**: JetBrains Mono (400) — optimized for code readability
- **Scale**: 12px base, 1.25 ratio (12, 15, 19, 24, 30, 37)

### Spatial System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64
- Border radius: 4px (buttons), 8px (cards), 12px (panels)
- Max content width: 1400px

### Motion Philosophy
- **Deliberate transitions**: 200ms ease-out for UI state changes
- **Data animations**: 300ms cubic-bezier(0.4, 0, 0.2, 1) for array bar movements
- **Highlight pulses**: Subtle glow animation (2s infinite) on active elements
- **Step transitions**: Smooth interpolation between array states, never jarring jumps

### Visual Assets
- **Icons**: Lucide React — consistent 1.5px stroke weight
- **Decorative**: Subtle grid pattern on background, thin separator lines
- **Code highlighting**: Syntax-style color coding for pseudocode lines

## Layout & Structure

### Main Application Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Header: Logo + Title                              Theme Toggle │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────────────────────────┐  │
│  │   Controls      │  │                                     │  │
│  │   Panel         │  │        Array Visualization          │  │
│  │                 │  │        (Bar Chart Canvas)           │  │
│  │  Algorithm      │  │                                     │  │
│  │  Selector       │  │                                     │  │
│  │                 │  └─────────────────────────────────────┘  │
│  │  Parameters     │                                           │
│  │  - Array Size   │  ┌─────────────────────────────────────┐  │
│  │  - Speed        │  │       Pseudocode Display            │  │
│  │  - Values       │  │       (with step highlighting)      │  │
│  │                 │  └─────────────────────────────────────┘  │
│  │  Statistics     │                                           │
│  │  - Comparisons  │  ┌─────────────────────────────────────┐  │
│  │  - Swaps        │  │       Control Panel                 │  │
│  │  - Step #       │  │   [|<] [<] [▶/⏸] [>] [>|]          │  │
│  └─────────────────┘  └─────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Responsive Strategy
- **Desktop (1200px+)**: Full layout as shown
- **Tablet (768-1199px)**: Controls panel collapses to top bar, visualization and pseudocode stack vertically
- **Mobile (< 768px)**: Simplified single-column, controls in expandable drawer

### Visual Pacing
- Header: Minimal, 48px height, anchors the experience
- Controls Panel: 280px fixed width, dense but organized
- Visualization: Hero section, maximum visual prominence
- Pseudocode: Secondary focus, clean and readable
- Controls: Always accessible, 64px footer bar

## Features & Interactions

### Algorithm Selection
- **Supported Algorithms**:
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort
  - Heap Sort
- **Behavior**: Dropdown selector with algorithm name and brief complexity badge (O(n²))
- **On Change**: Generates new random array, resets step to 0

### Parameter Configuration
| Parameter | Type | Range | Default |
|-----------|------|-------|---------|
| Array Size | Slider | 5-50 | 15 |
| Animation Speed | Slider | 50ms-1000ms | 300ms |
| Custom Values | Input | Comma-separated | Random |

- **Array Size Slider**: Real-time preview updates
- **Speed Slider**: Affects auto-play interval, immediate effect (even mid-animation)
- **Custom Values**: Text input, validates numbers, regenerates array on blur/enter

### Visualization Behavior
- **Bar Chart**: Vertical bars representing array values
- **Bar Heights**: Proportional to value, normalized to container
- **Color Coding**:
  - Default: `--bg-tertiary`
  - Comparing: `--accent-green` with glow
  - Swapping: `--accent-yellow` with pulse
  - Pivot: `--accent-red`
  - Sorted: `--accent-blue`
- **Transitions**: Bars smoothly animate to new positions, never teleport

### Pseudocode Display
- **Structure**: Line-by-line display of current algorithm's pseudocode
- **Highlighting**: Current line has `--accent-purple` background glow
- **Variable Tracking**: Inline annotations showing current i, j, key values
- **Line Count**: Subtle line numbers on left margin

### Step Control
- **Play/Pause (▶/⏸)**: Toggle auto-advance through steps
- **Step Forward (>)**: Advance one step, respect current speed delay
- **Step Backward (<)**: Return to previous step, instant (no delay)
- **Jump to Start (|<)**: Reset to step 0
- **Jump to End (>|)**: Skip to final sorted state (analyze only)

### Statistics Panel
- **Comparisons**: Running count of value comparisons
- **Swaps**: Running count of element swaps/exchanges
- **Current Step**: "Step X of Y" indicator
- **Time Complexity**: Static display of algorithm's complexity

### Edge Cases
- **Empty Array**: Show placeholder message "Add elements to visualize"
- **Single Element**: Show "Already sorted!" message
- **All Same Values**: Visualize normally, final state identical to initial
- **Mid-Sort Reset**: Confirm dialog if array modified during visualization
- **Algorithm Change During Play**: Pause, show warning, reset

## Component Inventory

### Button
- **Variants**: primary (blue), secondary (outlined), ghost (text only), icon-only
- **States**: default, hover (lighten 10%), active (darken 5%), disabled (50% opacity), loading (spinner)
- **Sizes**: sm (32px), md (40px), lg (48px)

### Select
- **Appearance**: Dropdown with custom styling matching dark theme
- **States**: default, open, focused, disabled
- **Features**: Searchable for algorithms, clear indicator

### Slider
- **Appearance**: Custom track (4px) with filled portion, thumb (16px circle)
- **States**: default, hover (thumb grows), dragging, disabled
- **Labels**: Value tooltip on hover/drag

### Card
- **Appearance**: `--bg-secondary` background, 1px border, 8px radius
- **Variants**: default, elevated (subtle shadow), interactive (hover lift)

### Input
- **Appearance**: Dark input field with subtle border
- **States**: default, focus (blue border), error (red border + message), disabled

### IconButton
- **Appearance**: Circular button containing icon only
- **States**: Same as Button
- **Sizes**: sm (28px), md (36px), lg (44px)

### StatBadge
- **Appearance**: Small pill showing label + value
- **Variants**: neutral, comparisons (green), swaps (yellow), step (purple)

### ProgressBar
- **Appearance**: Thin horizontal bar showing step progress
- **States**: empty, partial, complete

### Tooltip
- **Appearance**: Dark popup with arrow
- **Behavior**: 300ms delay on hover, follows cursor

## Technical Approach

### Framework & Tools
- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: CSS Modules with CSS custom properties
- **State Management**: React hooks (useState, useReducer, useContext)
- **Animation**: CSS transitions + requestAnimationFrame for smooth updates
- **Testing**: Vitest + React Testing Library
- **Storybook**: Component documentation and showcase

### Project Structure
```
src/
├── components/
│   ├── ui/                 # Design system components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Select/
│   │   ├── Slider/
│   │   ├── Input/
│   │   └── ...
│   ├── visualization/      # Visualization components
│   │   ├── ArrayVisualizer/
│   │   ├── Bar/
│   │   └── Pseudocode/
│   └── controls/           # Control components
│       ├── PlaybackControls/
│       └── Statistics/
├── algorithms/
│   ├── types.ts
│   ├── bubbleSort.ts
│   ├── selectionSort.ts
│   ├── insertionSort.ts
│   ├── mergeSort.ts
│   ├── quickSort.ts
│   └── heapSort.ts
├── hooks/
│   ├── useSortingAlgorithm.ts
│   └── useAnimationFrame.ts
├── context/
│   └── VisualizerContext.tsx
├── styles/
│   ├── globals.css
│   ├── variables.css
│   └── animations.css
├── App.tsx
└── main.tsx
```

### Algorithm Engine Architecture
Each sorting algorithm exports:
1. `pseudocode`: Array of strings representing each step
2. `sort(array)`: Generator function yielding `{ array, comparing, swapping, pivot?, step }` objects

The `useSortingAlgorithm` hook manages:
- Step indexing and history
- Auto-play interval
- Speed control
- Forward/backward navigation

### Key Implementation Details
- **Immutable Updates**: Array state always creates new reference
- **Step History**: Store all steps upfront for instant backward navigation
- **Animation Timing**: Use `setInterval` with configurable delay for auto-play
- **Performance**: Memoize components, use `React.memo` for Bar components

### Storybook Integration
- Each UI component documented with:
  - Component code
  - Prop definitions
  - Variant showcase
  - Interaction examples
- Automated visual regression testing (optional)
