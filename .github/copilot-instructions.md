# Banko Kontrolplade - AI Coding Agent Instructions

## Project Overview
This is a vanilla JavaScript bingo control board (Danish "banko") with two main components:
- **Main app** (`index.html` + `assets/js/app.js` + `assets/js/settings.js`): Interactive bingo number tracking board with settings panel
- **Generator** (`generator.html` + `assets/js/generator.js`): Bingo card generator for printing

The project follows strict principles: zero dependencies, no build tools, no tracking, and works by opening HTML files directly in browsers.

## Core Architecture Principles
- **Zero dependencies**: No frameworks, libraries, or external scripts - pure HTML/CSS/JavaScript only
- **Privacy-first**: No tracking, cookies, analytics, or network requests
- **Simplicity**: Minimal, focused functionality for bingo number tracking
- **Local storage**: User settings (theme) stored in localStorage only

## Key Design Patterns

### State Management
- `drawnNumbers` array (app.js) - tracks clicked numbers in order, resets on refresh
- `banko-settings` (localStorage) - persists user settings between sessions
- DOM `.marked` class provides visual state for marked cells

### UI Structure
```
├── Settings Panel (left sidebar, collapsible)
│   └── Theme selector (Standard, Jul, Påske, Nytår)
├── Main board: 10x9 grid (numbers 1-90)
├── Right sidebar:
│   ├── Last drawn number (large display)
│   ├── Drawn numbers list
│   ├── Number input (keyboard entry)
│   └── Controls (fullscreen, new game, generator link)
```

### Event Handling
- Board cells use direct click listeners
- Settings panel toggle via gear icon
- Keyboard input: Enter to mark typed number
- Fullscreen toggle via Fullscreen API

## Development Workflow

### Testing
Open HTML files directly in a browser - no build step needed:
```bash
open index.html  # macOS
```

### Making Changes
1. Edit files directly
2. Refresh browser to see changes
3. No compilation, bundling, or transpilation required

## Code Conventions

### JavaScript
- Vanilla ES6+ in separate files
- `settings.js` loads before `app.js`
- Danish language for UI text, English for variable names
- Simple imperative style - no classes or modules

### CSS
- CSS Custom Properties for theme colors (`--marked-color`)
- Theme classes on body: `.theme-standard`, `.theme-jul`, `.theme-paaske`, `.theme-nytaar`
- Separate styles for settings panel, fullscreen mode

### localStorage
```javascript
{
  "banko-settings": {
    "theme": "standard",
    "settingsOpen": false
  }
}
```

## Important Constraints

When adding features, respect these hard constraints:
- ❌ No frameworks or third-party libraries
- ❌ No backend or network requests
- ❌ No tracking, analytics, or cookies
- ❌ No build tools or installation requirements
- ❌ No storing game state (drawn numbers must reset on refresh)
- ✅ localStorage allowed for user settings only
- ✅ Must work by opening HTML files in a browser
- ✅ Desktop and tablet optimized (not mobile-first)

## Common Modifications

### Adding Themes
1. Create border image in `assets/images/`
2. Add CSS class in `style.css` (`.theme-newname`)
3. Add option in `index.html` theme selector
4. Add to `themes` object in `settings.js`

### Adding Settings
1. Add to `defaultSettings` in `settings.js`
2. Add UI controls in `index.html` settings panel
3. Add handler in `initSettingsPanel()`

### Styling Changes
- Modify CSS in corresponding stylesheet
- Use CSS custom properties for theme-dependent values
- Maintain responsive design with flexbox/grid
