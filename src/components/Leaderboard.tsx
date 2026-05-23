import type { TeamEntry } from '../types'
import './Leaderboard.css'

interface LeaderboardProps {
  title: string
  subtitle?: string
  entries: TeamEntry[]
  highlightTop?: number
}

export function Leaderboard({
  title,
  subtitle,
  entries,
  highlightTop = 3,
}: LeaderboardProps) {
  return (
    <section className="board">
      <header className="board__header">
        <h2 className="board__title">{title}</h2>
        {subtitle ? <p className="board__subtitle">{subtitle}</p> : null}
      </header>

      <div className="board__table-wrap">
        <table className="board__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Equipo</th>
              <th>Puntos</th>
              <th>Penalización</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={4} className="board__empty">
                  Sin datos en el CSV
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr
                  key={entry.team}
                  className={
                    entry.rank <= highlightTop ? `board__row--top-${entry.rank}` : ''
                  }
                >
                  <td className="board__rank">{entry.rank}</td>
                  <td className="board__team">{entry.team}</td>
                  <td className="board__score">{entry.score}</td>
                  <td className="board__penalty">{entry.penalty}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
