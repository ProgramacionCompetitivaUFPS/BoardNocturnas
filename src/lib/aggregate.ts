import type { Competition, TeamEntry } from '../types'
import { rankEntries } from './parseCsv'

export function buildGeneralRanking(competitions: Competition[]): TeamEntry[] {
  const totals = new Map<string, { score: number; penalty: number }>()

  for (const competition of competitions) {
    for (const entry of competition.entries) {
      const current = totals.get(entry.team) ?? { score: 0, penalty: 0 }
      totals.set(entry.team, {
        score: current.score + entry.score,
        penalty: current.penalty + entry.penalty,
      })
    }
  }

  const rows = Array.from(totals.entries()).map(([team, values]) => ({
    team,
    score: values.score,
    penalty: values.penalty,
  }))

  return rankEntries(rows)
}
