# Banko Kontrolplade - AI Coding Agent Instructions

## Project Overview
This is a single-file, vanilla JavaScript bingo control board (Danish "banko") for tracking numbers drawn from a physical bag. The entire application lives in `index.html` with inline CSS and JavaScript - no build process, frameworks, or external dependencies.

## Core Architecture Principles
- **Zero dependencies**: No frameworks, libraries, or external scripts - pure HTML/CSS/JavaScript only
- **Single-file application**: All code (HTML, CSS, JS) is contained in `index.html`
- **Privacy-first**: No tracking, cookies, analytics, data storage, or network requests
- **Simplicity**: The app is intentionally minimal - no feature creep beyond basic bingo number tracking

## Key Design Patterns

### State Management
- The only application state is `drawnNumbers` array (line 46) - tracks clicked numbers in order
- DOM is the source of truth for visual state (`.marked` class on cells)
- No localStorage, sessionStorage, or persistence - games reset on refresh

### UI Structure
```
├── Main board: 10x9 grid (numbers 1-90)
├── Sidebar:
│   ├── Drawn numbers list (comma-separated display)
│   ├── Row selector (currently unused but present)
│   └── New game button (clears state with confirmation)
```

### Event Handling
- Board cells use direct click listeners (line 54) - toggle `marked` class
- Clicking marked cells removes them from `drawnNumbers` array
- No event delegation - each cell has its own listener (acceptable for fixed 90 cells)

## Development Workflow

### Testing
Open `index.html` directly in a browser - no build step needed:
```bash
open index.html  # macOS
```

### Making Changes
1. Edit `index.html` directly
2. Refresh browser to see changes
3. No compilation, bundling, or transpilation required

## Code Conventions

### Styling
- Inline `<style>` block in `<head>` (lines 7-16)
- CSS Grid for board layout: `grid-template-columns: repeat(10, 40px)`
- Color scheme: Green (#4caf50) for marked numbers

### JavaScript
- Vanilla ES6+ JavaScript in inline `<script>` tag (lines 42-85)
- No semicolons (mostly) - follow existing style
- Danish language for UI text and comments
- Simple imperative style - no classes or modules

### Language
- **UI text**: Danish (e.g., "Nyt spil", "Udtrukne numre")
- **Code**: English variable names (`drawnNumbers`, `toggleCell`)
- **Comments**: Can be Danish or English but keep UI consistent

## Important Constraints

When adding features, respect these hard constraints from README.md:
- ❌ No frameworks or third-party libraries
- ❌ No backend or data persistence
- ❌ No tracking, analytics, or cookies
- ❌ No build tools or installation requirements
- ✅ Must work by opening `index.html` in a browser
- ✅ Desktop and tablet optimized (not mobile-first)

## Common Modifications

### Adding Features
- Insert new HTML in appropriate section (board area or sidebar)
- Add CSS rules to inline `<style>` block
- Add JavaScript to inline `<script>` block maintaining global scope pattern
- Test by refreshing browser

### Styling Changes
- Modify CSS in `<style>` block (lines 7-16)
- Use simple selectors - avoid complex CSS
- Maintain responsive design with flexbox/grid

### Unused Features
The row selector (`#rowSelect`) is present in the UI but not functionally implemented - this appears to be a placeholder for future row-based game modes.
