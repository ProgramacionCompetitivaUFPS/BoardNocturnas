# Board Nocturnas

Tablero web de rankings para competencias nocturnas. Cada competencia es un archivo CSV; la app muestra un board por competencia y un ranking general con la suma de puntos y penalizaciones.

## Inicio rápido

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite (normalmente `http://localhost:5173`).

## Añadir competencias

1. Crea un archivo `.csv` en `src/data/`.
2. El nombre del archivo será el título del board (por ejemplo `nocturna-3.csv` → **Nocturna 3**).
3. Usa tabuladores o comas como separador.

Formato esperado:

```csv
Rank	Team	Score	Penalty
1	TheRealOneAle	6	388
2	santyCorredor58	5	304
```

Columnas admitidas (mayúsculas/minúsculas indiferente):

| Columna   | Alias                          |
|-----------|--------------------------------|
| Team      | Equipo                         |
| Score     | Puntos, Pts                    |
| Penalty   | Penalizacion, Penalización     |
| Rank      | Pos, Puesto (opcional)         |

El orden en pantalla se calcula por **Score** (mayor primero) y, en empate, **Penalty** (menor primero).

## Ranking general

Suma el **Score** y la **Penalty** de cada equipo en todos los CSV de `src/data/`, y vuelve a ordenar con las mismas reglas.

## Build

```bash
npm run build
npm run preview
```

## Despliegue en GitHub Pages

La app se publica automáticamente al hacer push a `main` (workflow en `.github/workflows/deploy.yml`).

**URL:** https://programacioncompetitivaufps.github.io/BoardNocturnas/

### Primera vez (en el repositorio de GitHub)

1. **Settings → Pages → Build and deployment**
2. En **Source**, elige **GitHub Actions** (no la rama `gh-pages`).
3. Haz push a `main`; el workflow construye y despliega.

Para forzar un despliegue manual: **Actions → Deploy to GitHub Pages → Run workflow**.
