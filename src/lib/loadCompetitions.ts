import type { Competition } from '../types'
import { parseAndRankCsv } from './parseCsv'

const csvModules = import.meta.glob('../data/*.csv', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function pathToId(path: string): string {
  const fileName = path.split('/').pop() ?? path
  return fileName.replace(/\.csv$/i, '')
}

function pathToName(path: string): string {
  const id = pathToId(path)
  const nocturnaMatch = id.match(/^nocturna[-_]?(\d+)$/i)
  if (nocturnaMatch) {
    return `Noctura #${nocturnaMatch[1]}`
  }
  return id
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function pathToSortKey(path: string): number {
  const id = pathToId(path)
  const nocturnaMatch = id.match(/^nocturna[-_]?(\d+)$/i)
  if (nocturnaMatch) return Number(nocturnaMatch[1])
  return Number.MAX_SAFE_INTEGER
}

export function loadCompetitions(): Competition[] {
  return Object.entries(csvModules)
    .map(([path, content]) => ({
      id: pathToId(path),
      name: pathToName(path),
      entries: parseAndRankCsv(content),
    }))
    .sort((a, b) => pathToSortKey(a.id) - pathToSortKey(b.id) || a.name.localeCompare(b.name, 'es'))
}
