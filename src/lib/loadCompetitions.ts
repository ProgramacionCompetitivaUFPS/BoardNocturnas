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
  return id
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function loadCompetitions(): Competition[] {
  return Object.entries(csvModules)
    .map(([path, content]) => ({
      id: pathToId(path),
      name: pathToName(path),
      entries: parseAndRankCsv(content),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'es'))
}
