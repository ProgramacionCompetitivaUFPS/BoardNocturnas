import type { TeamEntry } from '../types'

function detectDelimiter(headerLine: string): string {
  if (headerLine.includes('\t')) return '\t'
  if (headerLine.includes(';')) return ';'
  return ','
}

function normalizeHeader(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '')
}

function parseNumber(value: string): number {
  const cleaned = value.trim().replace(',', '.')
  const n = Number(cleaned)
  return Number.isFinite(n) ? n : 0
}

export function parseCsv(content: string): Omit<TeamEntry, 'rank'>[] {
  const lines = content
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length < 2) return []

  const delimiter = detectDelimiter(lines[0])
  const headers = lines[0].split(delimiter).map(normalizeHeader)

  const teamIdx = headers.findIndex((h) => h === 'team' || h === 'equipo')
  const scoreIdx = headers.findIndex((h) => h === 'score' || h === 'puntos' || h === 'pts')
  const penaltyIdx = headers.findIndex(
    (h) => h === 'penalty' || h === 'penalizacion' || h === 'penalización',
  )

  if (teamIdx === -1 || scoreIdx === -1) {
    throw new Error('El CSV debe incluir columnas Team y Score.')
  }

  return lines.slice(1).map((line) => {
    const cols = line.split(delimiter)
    return {
      team: cols[teamIdx]?.trim() ?? '',
      score: parseNumber(cols[scoreIdx] ?? '0'),
      penalty: penaltyIdx === -1 ? 0 : parseNumber(cols[penaltyIdx] ?? '0'),
    }
  })
}

export function rankEntries(
  rows: { team: string; score: number; penalty: number }[],
): TeamEntry[] {
  const sorted = [...rows]
    .filter((row) => row.team.length > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.penalty - b.penalty
    })

  return sorted.map((row, index) => ({
    rank: index + 1,
    team: row.team,
    score: row.score,
    penalty: row.penalty,
  }))
}

export function parseAndRankCsv(content: string): TeamEntry[] {
  const parsed = parseCsv(content)
  return rankEntries(parsed)
}
