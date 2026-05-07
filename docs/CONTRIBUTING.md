# Contributing to Digital Logics Studio

Thank you for your interest in contributing. This project is an interactive digital logic and electronics learning platform built with React. Whether you're adding a new topic page, fixing a bug in the simulator, or improving an interactive demo, this guide will get you from zero to a merged pull request.

---

## Table of Contents

1. [Before You Start](#1-before-you-start)
2. [Development Setup](#2-development-setup)
3. [Project Structure](#3-project-structure)
4. [Adding a New Page](#4-adding-a-new-page)
5. [Adding a New Section](#5-adding-a-new-section)
6. [Component Conventions](#6-component-conventions)
7. [Styling Guidelines](#7-styling-guidelines)
8. [Interactive Demos & Simulators](#8-interactive-demos--simulators)
9. [Testing](#9-testing)
10. [Commit Messages](#10-commit-messages)
11. [Opening a Pull Request](#11-opening-a-pull-request)

---

## 1. Before You Start

- **Search existing issues and PRs** before opening a new one — the topic you want to add may already be in progress.
- **Open an issue first** for any non-trivial change — new sections, large refactors, or changes to shared components like `ToolLayout` or `ThemeContext`.
- For bug fixes and small improvements, you can go straight to a PR.

---

## 2. Development Setup

### Prerequisites

| Tool    | Minimum Version |
| ------- | --------------- |
| Node.js | 16+             |
| npm     | 8+              |

### Clone and run

```bash
git clone https://github.com/your-org/digital-logics-studio.git
cd digital-logics-studio
npm install
npm start
```

The dev server starts at `http://localhost:3000`. Changes hot-reload automatically.

### Build for production

```bash
npm run build
```

### Run tests

```bash
npm test
```

---

## 3. Project Structure

```
src/
├── pages/                     ← One folder per topic section
│   ├── Home/                  ← Landing page, navbar, footer
│   ├── BooleanAlgebra/        ← Boolean algebra topic pages
│   ├── NumberSystems/         ← Number system tools and pages
│   ├── ArithmeticFunctionsAndHDLs/  ← Arithmetic pages + shared components
│   ├── EncoderAndDecoder/     ← Encoder/decoder with encoder/, decoder/, shared/
│   ├── MultiplexersAndDemultiplexers/ ← MUX/DEMUX (routes not yet wired)
│   ├── SequentialCircuits/    ← Sequential circuit pages
│   ├── RegistersAndTransfers/ ← Register and counter pages
│   ├── Memory/                ← Memory system pages
│   ├── Book/                  ← Chapter problem solvers
│   ├── Boolforge.jsx          ← Interactive circuit simulator
│   ├── TrainerBoard.jsx        ← DLD trainer board simulation
│   └── [standalone tool pages]
├── components/                ← Shared UI components
├── context/                   ← ThemeContext (dark/light mode)
├── data/                      ← Static data (gates.js, etc.)
├── hooks/                     ← Custom React hooks
├── utils/                     ← Helper functions
├── App.js                     ← Router — all routes registered here
└── index.css                  ← Global CSS variables and base styles
```

Each section folder follows one of two patterns:

**Self-contained section** (e.g. `SequentialCircuits/`, `RegistersAndTransfers/`):

```
SectionName/
├── components/     ← Section-specific UI components
├── data/           ← Section-specific data files
├── SectionLayout.jsx ← Shared layout/wrapper for this section
├── SectionLayout.css ← Section-specific styles
└── PageName.jsx    ← One file per topic page
```

**Multi-subsection** (e.g. `EncoderAndDecoder/`, `MultiplexersAndDemultiplexers/`):

```
SectionName/
├── encoder/
│   ├── components/
│   ├── encoderData.js
│   └── EncoderPage.jsx
├── decoder/
│   ├── components/
│   └── DecoderPage.jsx
└── shared/
    ├── components/
    └── theme.js
```

---

## 4. Adding a New Page

### Step 1 — Create the page file

Place your new page in the correct section folder. If the section doesn't exist yet, see [Adding a New Section](#5-adding-a-new-section).

For sections that use `ToolLayout` (standalone tools):

```jsx
// src/pages/BooleanAlgebra/MyNewPage.jsx
import React from "react";
import ToolLayout from "../../components/ToolLayout";
import ExplanationBlock from "../../components/ExplanationBlock";

const MyNewPage = () => {
  return (
    <ToolLayout title="My Topic" subtitle="A short, clear subtitle">
      <ExplanationBlock title="Section Heading">
        <p className="explanation-intro">Introductory paragraph...</p>
        {/* content */}
      </ExplanationBlock>
    </ToolLayout>
  );
};

export default MyNewPage;
```

For sections that use their own layout (e.g. `SeqLayout`, `RegLayout`, `MemoryLayout`), follow the pattern of existing pages in that section.

### Step 2 — Register the route in `App.js`

Add an import and a `<Route>` in `src/App.js`:

```jsx
// At the top, in the correct import group:
import MyNewPage from "./pages/BooleanAlgebra/MyNewPage";

// Inside the <Routes> block:
<Route path="/my-new-topic" element={<MyNewPage />} />;
```

Follow the URL naming conventions already in use:

- Boolean algebra: `/boolean-*` or `/my-topic`
- Arithmetic: `/arithmetic/topic-name`
- Sequential circuits: `/sequential/topic-name`
- Registers: `/registers/topic-name`
- Memory: `/memory/topic-name`

### Step 3 — Add a link from the Home page

Open `src/pages/Home/HomeData.js` and add an entry to the appropriate section card. Each section card has a `links` array — add an object with `label` and `to`.

### Step 4 — (Optional) Add to the section's sidebar navigation

If the section has a sidebar (like Sequential Circuits or Registers), add your page to the navigation data file in that section's `data/` folder.

---

## 5. Adding a New Section

1. Create a new folder under `src/pages/SectionName/`
2. Create a layout component (`SectionLayout.jsx`) that wraps all pages with consistent nav, breadcrumbs, and styling — follow `SeqLayout.jsx` or `RegLayout.jsx` as a template
3. Create a CSS file (`SectionLayout.css` or `SectionStyles.css`) with section-specific variables and component styles
4. Create your first page file
5. Register routes in `App.js`
6. Add a new card to the Home page in `HomeData.js`
7. If the section has multiple sub-topics, create a `data/` folder with navigation data so the layout can render a sidebar

---

## 6. Component Conventions

### Shared components (in `src/components/`)

These are used across all pages. Do not modify their API without checking every usage.

| Component                          | Purpose                                                      |
| ---------------------------------- | ------------------------------------------------------------ |
| `ToolLayout`                       | Standard page wrapper with title, subtitle, and back-to-home |
| `ExplanationBlock`                 | Collapsible or static content section with a heading         |
| `CircuitModal`                     | Full-screen circuit simulator modal (Boolforge)              |
| `TruthTable` / `TruthTableDisplay` | Renders a truth table from data                              |
| `KMapDisplay`                      | Renders a K-map grid with optional group highlights          |
| `InteractiveDemo`                  | Generic wrapper for interactive demonstrations               |
| `InteractiveCalculator`            | Input + result layout for calculators                        |
| `ControlPanel` / `ControlGroup`    | Sidebar-style control layout                                 |
| `ResultCard`                       | Highlighted result display card                              |
| `WhiteboardAnimation`              | SVG-based animated diagram                                   |

### Section-specific components

Live inside the section folder (e.g. `SequentialCircuits/components/`). Prefix them with the section abbreviation to avoid naming conflicts: `SeqTable`, `RegBox`, `AFHDLCard`, etc.

### General rules

- **Functional components only** — no class components.
- **Props over state** where possible — lift state up to the page level and pass it down.
- All interactive components (simulators, calculators) should manage their own local state inside the page file unless the state needs to be shared.
- Extract repeated UI patterns into components after the third use.
- Every new component needs a clear, descriptive name. No `Component1.jsx` or `Helper.jsx`.

---

## 7. Styling Guidelines

### CSS variables

All design tokens are defined in `public/css/styles.css` (Boolforge-specific) and `src/index.css` (site-wide). **Never hardcode colors, spacing, or font sizes** that are already defined as variables.

Key variables:

```css
/* Dark backgrounds */
--bg-dark, --bg-medium, --bg-light

/* Accent colors */
--accent-primary     /* #00ff88 — green */
--accent-secondary   /* #00d4ff — cyan */
--accent-danger      /* #ff3366 — red */

/* Text */
--text-primary, --text-secondary

/* Light/dark theme (index.css) */
--bg-color, --text-color, --card-bg, --border-color, --accent-color, --nav-bg
```

### Dark/light mode

The site uses `ThemeContext` to switch between `dark` (default) and `light` modes. The root `<div>` in `App.js` receives a `data-theme` attribute.

- Use `var(--bg-color)` and `var(--text-color)` for any element that must respect the user's theme preference.
- Use the Boolforge-specific variables (`--bg-dark`, `--accent-primary`) only inside Boolforge tool pages and the circuit simulator.
- Test every new page in both light and dark mode before opening a PR.

### Section CSS files

Each section has its own CSS file (e.g. `SeqLayout.css`, `RegStyles.css`, `MemorySystem.css`). Add section-specific styles here, not in `index.css` or `styles.css`.

Use a unique class prefix for every section to avoid conflicts:

- Sequential Circuits: `.seq-`
- Registers & Transfers: `.reg-`
- Memory Systems: `.mem-`
- Arithmetic: `.afhdl-`
- Encoder/Decoder: `.enc-`, `.dec-`

### Typography

The site uses `"Azeret Mono"` as the primary font with `"JetBrains Mono"` for code and monospaced elements. Do not introduce new font families without discussion.

---

## 8. Interactive Demos & Simulators

Many pages include live simulators (SR latch, binary adder, encoder, etc.). Follow these conventions when building new interactive demos:

**State management**

- Keep simulator state local to the component. Use `useState` for inputs and derived outputs.
- Use `useMemo` for expensive computations that depend on input state.
- Use `useEffect` only for side effects (e.g. updating output after delay animation).

**Truth table highlighting**

- Interactive truth tables should highlight the active row based on current inputs — see `SRLatchSim` in `SeqLatches.jsx` for the pattern.

**Forbidden / invalid states**

- Always validate inputs and display a clear warning for invalid or undefined states (e.g. SR latch forbidden state). Use a distinct visual style (`.seq-row-warn`, danger colors) to differentiate invalid outputs from valid ones.

**Circuit modals**

- For pages that demonstrate a Boolean expression, add a "Experiment with Circuit" button that opens `CircuitModal` with the relevant expression and variables. This gives students a hands-on way to verify the theory.

---

## 9. Testing

```bash
npm test
```

Tests use React Testing Library. The test file for `App.js` is `src/App.test.js`.

- Add at least a smoke test for any new page: render it and assert that the page title or a key heading is present.
- For utility functions (e.g. in `src/utils/` or `ArithmeticFunctionsAndHDLs/utils/`), add unit tests covering normal inputs, edge cases, and invalid inputs.
- Simulators should be tested by asserting output values for known input combinations.

---

## 10. Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>
```

| Type       | Use for                                                      |
| ---------- | ------------------------------------------------------------ |
| `feat`     | New page, new section, new interactive feature               |
| `fix`      | Bug fix in simulator logic, calculation error, broken layout |
| `style`    | CSS changes with no behaviour change                         |
| `refactor` | Code restructuring, no behaviour change                      |
| `content`  | Corrections or additions to educational text/data            |
| `test`     | Adding or updating tests                                     |
| `docs`     | Documentation only                                           |
| `chore`    | Config, dependencies, tooling                                |

Examples:

```
feat(sequential): add state reduction page with interactive table
fix(kmap): correct grouping for 4-variable don't-care minterms
content(boolean-laws): add De Morgan's theorem examples
style(registers): fix mobile overflow on sync-binary-counters table
feat(boolforge): add XNOR gate to palette
```

---

## 11. Opening a Pull Request

1. Create a branch from `main`: `git checkout -b feat/your-feature-name`
2. Make your changes and commit with descriptive messages
3. Push: `git push origin feat/your-feature-name`
4. Open a PR against `main` and fill in the template
5. Ensure the build passes: `npm run build`
6. Test manually in both dark and light mode on at least one mobile and one desktop viewport
7. One approval is required to merge

---

Thank you for contributing to Digital Logics Studio. Every improvement makes digital logic more accessible to students worldwide.
