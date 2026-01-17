# Banko Kontrolplade - AI Agent Instructions

## Project Overview
This is a vanilla JavaScript bingo control board (Danish "banko") with two main components:
- **Main app** (`index.html` + `assets/js/app.js` + `assets/js/settings.js` + `assets/css/style.css`): Interactive bingo number tracking board with settings panel
- **Generator** (`generator.html` + `assets/js/generator.js` + `assets/css/generator.css` + `assets/css/print.css`): Bingo card generator for printing

The project follows strict principles: zero external dependencies, no build tools, no tracking, and works by opening HTML files directly in browsers.

## Build/Test/Development Commands

### Testing
```bash
# No automated tests - manual testing only
open index.html              # macOS - open main app
open generator.html          # macOS - open generator
# On Windows: start index.html or double-click files
```

### Development
```bash
# No build process - edit files directly and refresh browser
# Live reload not available - manual refresh required
```

### Validation
```bash
# No linting/formatting tools configured
# Manual code review following style guidelines below
```

## Code Style Guidelines

### File Structure & Organization
```
banko-kontrolplade/
├── index.html                 # Main application entry point
├── generator.html             # Card generator entry point
├── assets/
│   ├── js/
│   │   ├── app.js             # Main app logic
│   │   ├── settings.js        # Settings & localStorage handling
│   │   └── generator.js       # Card generation logic
│   ├── css/
│   │   ├── style.css          # Main app styles (includes themes, settings panel)
│   │   ├── generator.css      # Generator styles
│   │   └── print.css          # Print-specific styles
│   └── images/
│       ├── christmas-border.png  # Jul theme
│       ├── easter-border.svg     # Påske theme
│       └── newyear-border.svg    # Nytår theme
├── README.md
├── AGENTS.md
└── .github/
    └── copilot-instructions.md
```

### JavaScript Conventions
- **Vanilla ES6+ only** - no frameworks, libraries, or transpilation
- **Global scope pattern** - use `const` for DOM element references at top level
- **Semicolons optional** - follow existing mixed style (mostly present in generator.js, absent in app.js)
- **Function naming**: camelCase, descriptive verbs (`createBoard`, `toggleCell`, `updateDrawnNumbers`)
- **Variable naming**: camelCase, English (`drawnNumbers`, `cardCountInput`, `rng`)
- **No classes/modules** - simple imperative style with functions and arrays
- **Error handling**: minimal - use `confirm()` for user confirmations, `alert()` for blocking issues

### CSS Conventions
- **Vanilla CSS only** - no preprocessors or frameworks
- **CSS Custom Properties**: Use `--marked-color` for theme-dependent colors
- **Class naming**: kebab-case for utilities (`.content-row`, `.row-split`), camelCase for components (`.numbers-list`)
- **Units**: px for precise UI elements, mm for print styles, vh for responsive background
- **Layout**: CSS Grid for main board (`grid-template-columns: repeat(10, 40px)`), Flexbox for layouts
- **Colors**: Green (#4caf50) default for marked numbers, theme-dependent via CSS variables
- **Print styles**: Separate print.css with @page rules, mm units, table-layout: fixed

### HTML Conventions
- **Semantic HTML5** - use appropriate elements (`<main>`, `<header>`, `<section>`)
- **Danish lang attribute**: `<html lang="da">`
- **Accessibility**: Include `rel="noopener"` on external links, proper form labels
- **No inline styles/scripts** - keep CSS in separate files, JS in separate files

### Import/Dependency Patterns
- **Zero external dependencies** - no npm packages, CDNs, or external scripts
- **Internal dependencies**: Use relative paths for assets (`assets/js/app.js`, `assets/css/style.css`)
- **Script load order**: `settings.js` must load before `app.js`
- **No module system** - global scope with script tags
- **Print CSS**: Load print styles twice with media queries for compatibility

### State Management Patterns
- **Game state**: `drawnNumbers` array - source of truth for clicked numbers (resets on refresh)
- **Settings state**: Stored in localStorage under key `banko-settings`
- **DOM as state**: Visual state via `.marked` CSS class on cells
- **Generator**: Stateless functions - cards generated on demand

### localStorage Structure
```javascript
{
  "banko-settings": {
    "theme": "standard",           // "standard" | "jul" | "paaske" | "nytaar"
    "settingsOpen": false           // Whether settings panel is expanded
  }
}
```

### Event Handling Patterns
- **Direct listeners**: Each cell gets individual click listener (acceptable for fixed 90 cells)
- **No event delegation**: Simpler but slightly more memory usage
- **Form handling**: Direct value access with fallbacks (`parseInt(cardCountInput.value, 10) || 0`)

### Error Handling & Validation
- **User input**: Use `parseInt()` with fallbacks, clamp values to valid ranges
- **Pop-up blocking**: Check `window.open()` return value, alert user if blocked

### Language & Localization
- **UI text**: Danish only (e.g., "Nyt spil", "Udtrukne numre", "Generer banko plader")
- **Code comments**: Can be English or Danish, but keep consistent within files
- **Variable names**: English only - maintain separation of UI language and code language
- **Date formatting**: Use Danish locale (`toLocaleString('da-DK')`)

### Performance Guidelines
- **No optimization needed**: Small codebase, simple DOM operations
- **Print generation**: Build HTML strings efficiently, avoid excessive DOM manipulation

### Security & Privacy
- **No network requests**: Zero external calls, no analytics, no tracking
- **Local storage only**: Settings stored in browser localStorage (never sent anywhere)
- **XSS prevention**: Use `textContent` instead of `innerHTML` when possible
- **Pop-up security**: Include `rel="noopener"` on external links

### Browser Compatibility
- **Modern browsers only**: ES6+ features (arrow functions, const/let, template literals)
- **Fullscreen API**: Used for projector mode
- **No polyfills**: Keep code simple, avoid complex browser-specific code
- **Print compatibility**: Test print functionality across browsers
- **Responsive design**: Desktop/tablet focus, not mobile-first

### Code Review Checklist
- [ ] No external dependencies added
- [ ] Danish UI text maintained
- [ ] localStorage used only for settings (not game state)
- [ ] Works by opening HTML directly in browser
- [ ] Follows existing naming conventions
- [ ] Print styles work correctly if modified
- [ ] No tracking/analytics code added
- [ ] Error handling is simple and user-friendly

### Common Modifications
- **Adding themes**: Add CSS class in style.css, add option in settings, create border image
- **Adding settings**: Add to `defaultSettings` in settings.js, add UI in index.html
- **Styling changes**: Modify CSS in corresponding stylesheet, maintain responsive design
- **New functionality**: Add to existing JS files following global scope pattern
- **Print modifications**: Update print.css and generator.js HTML generation

### Hard Constraints (DO NOT VIOLATE)
- ❌ No frameworks, libraries, or build tools
- ❌ No npm packages or package.json
- ❌ No tracking, analytics, or cookies
- ❌ No backend or network requests
- ❌ No storing game state (drawn numbers must reset on refresh)
- ✅ localStorage allowed for user settings only
- ✅ Must work by opening HTML files directly
- ✅ Desktop and tablet optimized
- ✅ Zero external dependencies philosophy
