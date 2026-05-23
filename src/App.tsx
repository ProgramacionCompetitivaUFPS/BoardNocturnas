import { Leaderboard } from './components/Leaderboard'
import { buildGeneralRanking } from './lib/aggregate'
import { loadCompetitions } from './lib/loadCompetitions'
import './App.css'

const competitions = loadCompetitions()
const generalRanking = buildGeneralRanking(competitions)

function App() {
  return (
    <div className="app">
      <header className="app__hero">
        <p className="app__eyebrow">Board</p>
        <h1 className="app__title">Ranking de competencias Nocturnas</h1>
      </header>

      <section className="app__section app__section--general">
        <Leaderboard
          title="Ranking general"
          subtitle={`Suma de ${competitions.length} competencia${competitions.length === 1 ? '' : 's'}`}
          entries={generalRanking}
        />
      </section>

      {competitions.length > 0 ? (
        <section className="app__section">
          <h2 className="app__section-title">Por competencia</h2>
          <div className="app__grid">
            {competitions.map((competition) => (
              <Leaderboard
                key={competition.id}
                title={competition.name}
                entries={competition.entries}
              />
            ))}
          </div>
        </section>
      ) : (
        <p className="app__hint">
          No hay CSV en <code>src/data/</code>. Crea uno con columnas Rank, Team,
          Score y Penalty.
        </p>
      )}
    </div>
  )
}

export default App
