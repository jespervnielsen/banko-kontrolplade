const cardCountInput = document.getElementById('cardCount')
const seedInput = document.getElementById('seedInput')
const generateBtn = document.getElementById('generateBtn')

function createRng(seed) {
  if (!seed) return () => Math.random()

  let h = 1779033703 ^ seed.length
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }

  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16
    return (h >>> 0) / 4294967296
  }
}

function columnRange(idx) {
  const start = idx * 10 + 1
  const end = idx === 8 ? 90 : idx * 10 + 10
  return { start, end }
}

function pickNumbers(count, start, end, rng) {
  const nums = new Set()
  while (nums.size < count) {
    const n = start + Math.floor(rng() * (end - start + 1))
    nums.add(n)
  }
  return Array.from(nums).sort((a, b) => a - b)
}

function createCard(rng) {
  for (let attempt = 0; attempt < 200; attempt++) {
    const columnCounts = Array(9).fill(1)
    let remaining = 6

    while (remaining > 0) {
      const idx = Math.floor(rng() * 9)
      if (columnCounts[idx] < 3) {
        columnCounts[idx]++
        remaining--
      }
    }

    const columns = columnCounts.map((count, idx) => {
      const { start, end } = columnRange(idx)
      return pickNumbers(count, start, end, rng)
    })

    const grid = Array.from({ length: 3 }, () => Array(9).fill(''))
    const rowCounts = [0, 0, 0]
    let failed = false

    for (let col = 0; col < 9 && !failed; col++) {
      const needed = columnCounts[col]
      const availableRows = [0, 1, 2].filter((r) => rowCounts[r] < 5)
      if (availableRows.length < needed) {
        failed = true
        break
      }

      const orderedRows = availableRows.sort((a, b) => {
        if (rowCounts[a] === rowCounts[b]) return rng() - 0.5
        return rowCounts[a] - rowCounts[b]
      })

      const chosenRows = orderedRows.slice(0, needed).sort((a, b) => a - b)

      chosenRows.forEach((rowIdx, i) => {
        grid[rowIdx][col] = columns[col][i]
        rowCounts[rowIdx]++
      })
    }

    if (!failed && rowCounts.every((c) => c === 5)) return grid
  }

  return Array.from({ length: 3 }, () => Array(9).fill(''))
}

function generateCards(count, seed) {
  const rng = createRng(seed)
  const cards = []
  for (let i = 0; i < count; i++) {
    cards.push(createCard(rng))
  }
  return cards
}

function cardToHTML(card, idx, seed) {
  const rows = card
    .map(
      (row) =>
        `<tr>${row
          .map((n) => `<td>${n || ''}</td>`)
          .join('')}</tr>`
    )
    .join('')

  const seedLabel = seed ? `Seed: ${seed}` : 'Tilfældig'

  return `
    <div class="card">
      <div class="card-header">Plade #${idx + 1} - ${seedLabel}</div>
      <table class="card-grid">
        ${rows}
      </table>
    </div>
  `
}

function buildPrintPage(cards, seed) {
  const pages = []
  for (let i = 0; i < cards.length; i += 3) {
    const slice = cards.slice(i, i + 3)
    const cardsHTML = slice
      .map((card, offset) => cardToHTML(card, i + offset, seed))
      .join('')

    pages.push(`<div class="page">${cardsHTML}</div>`)
  }

  const createdAt = new Date().toLocaleString('da-DK')

  return `<!DOCTYPE html>
  <html lang="da">
  <head>
    <meta charset="UTF-8" />
    <title>Banko plader</title>
    <style>
      * { box-sizing: border-box; }
      @page { size: A4; margin: 12mm; }
      body { font-family: Arial, sans-serif; margin: 0; padding: 12mm; background: #f8f8f8; }
      .meta { font-size: 12px; color: #555; margin-bottom: 8px; }
      .page { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8mm; margin-bottom: 14mm; page-break-after: always; }
      .page:last-child { page-break-after: auto; }
      .card { border: 1px solid #333; padding: 6px; background: white; }
      .card-header { font-weight: bold; font-size: 12px; margin-bottom: 6px; display: flex; justify-content: space-between; }
      .card-grid { width: 100%; border-collapse: collapse; table-layout: fixed; }
      .card-grid td { border: 1px solid #333; width: 1%; height: 22px; text-align: center; font-size: 13px; padding: 2px 0; }
    </style>
  </head>
  <body>
    <div class="meta">Genereret: ${createdAt}${seed ? ` - Seed: ${seed}` : ''}</div>
    ${pages.join('')}
    <script>window.onload = () => { window.focus(); window.print(); };</script>
  </body>
  </html>`
}

function openPrintWindow(cards, seed) {
  const html = buildPrintPage(cards, seed)
  const printWindow = window.open('', '_blank')
  if (!printWindow) return alert('Pop-up blev blokeret. Tillad pop-ups for at printe pladerne.')

  printWindow.document.write(html)
  printWindow.document.close()
}

if (generateBtn) {
  generateBtn.addEventListener('click', () => {
    const raw = parseInt(cardCountInput.value, 10) || 0
    const count = Math.max(3, Math.ceil(raw / 3) * 3)
    cardCountInput.value = count

    const seed = seedInput.value.trim()

    const cards = generateCards(count, seed)
    openPrintWindow(cards, seed)
  })
}
