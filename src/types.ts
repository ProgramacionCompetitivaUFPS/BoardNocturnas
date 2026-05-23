export interface TeamEntry {
  rank: number
  team: string
  score: number
  penalty: number
}

export interface Competition {
  id: string
  name: string
  entries: TeamEntry[]
}
