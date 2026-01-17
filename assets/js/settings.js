const STORAGE_KEY = 'banko-settings'

const defaultSettings = {
  theme: 'standard',
  settingsOpen: false
}

function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) }
    }
  } catch (e) {
    console.warn('Kunne ikke indlæse indstillinger:', e)
  }
  return { ...defaultSettings }
}

function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch (e) {
    console.warn('Kunne ikke gemme indstillinger:', e)
  }
}

function getSettings() {
  return loadSettings()
}

function updateSetting(key, value) {
  const settings = loadSettings()
  settings[key] = value
  saveSettings(settings)
  return settings
}

function setTheme(themeName) {
  return updateSetting('theme', themeName)
}

function setSettingsOpen(isOpen) {
  return updateSetting('settingsOpen', isOpen)
}

// Tema-definitioner
const themes = {
  standard: {
    name: 'Standard',
    border: null,
    markedColor: '#4caf50'
  },
  jul: {
    name: 'Jul',
    border: 'assets/images/christmas-border.png',
    markedColor: '#4caf50'
  },
  paaske: {
    name: 'Påske',
    border: 'assets/images/easter-border.svg',
    markedColor: '#8bc34a'
  },
  nytaar: {
    name: 'Nytår',
    border: 'assets/images/newyear-border.svg',
    markedColor: '#ffd700'
  },
  fastelavn: {
    name: 'Fastelavn',
    border: 'assets/images/fastelavn-border.svg',
    markedColor: '#9C27B0'
  },
  sommer: {
    name: 'Sommer',
    border: 'assets/images/sommer-border.svg',
    markedColor: '#FF9800'
  },
  halloween: {
    name: 'Halloween',
    border: 'assets/images/halloween-border.svg',
    markedColor: '#FF5722'
  },
  sankthans: {
    name: 'Sankt Hans',
    border: 'assets/images/sankthans-border.svg',
    markedColor: '#FF5722'
  },
  fest: {
    name: 'Fest/Jubilæum',
    border: 'assets/images/fest-border.svg',
    markedColor: '#E91E63'
  }
}

function getTheme(themeName) {
  return themes[themeName] || themes.standard
}

function getAllThemes() {
  return themes
}

// Settings panel UI
function initSettingsPanel(panel) {
  const settings = loadSettings()
  
  // Sæt initial tilstand
  if (settings.settingsOpen) {
    panel.classList.add('open')
  }
  
  // Tema-selector
  const themeSelect = panel.querySelector('#themeSelect')
  if (themeSelect) {
    themeSelect.value = settings.theme
    themeSelect.addEventListener('change', (e) => {
      setTheme(e.target.value)
      applyTheme(e.target.value)
    })
  }
  
  // Toggle-knap
  const toggleBtn = panel.querySelector('#settingsToggle')
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('open')
      setSettingsOpen(isOpen)
    })
  }
}

function applyTheme(themeName) {
  const theme = getTheme(themeName)
  const body = document.body
  
  // Fjern eksisterende tema-klasser
  body.classList.remove('theme-standard', 'theme-jul', 'theme-paaske', 'theme-nytaar', 'theme-fastelavn', 'theme-sommer', 'theme-halloween', 'theme-sankthans', 'theme-fest')
  body.classList.add('theme-' + themeName)
  
  // Opdater CSS custom properties
  document.documentElement.style.setProperty('--marked-color', theme.markedColor)
}
