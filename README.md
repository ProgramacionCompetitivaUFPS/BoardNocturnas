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

El workflow sube el build a la rama `gh-pages`. Cada push a `main` vuelve a desplegar.

**URL:** https://programacioncompetitivaufps.github.io/BoardNocturnas/

### Activar Pages (obligatorio la primera vez)

El error `Failed to create deployment (status: 404)` aparece si **Pages no está activado** en el repo.

1. Abre [Settings → Pages](https://github.com/ProgramacionCompetitivaUFPS/BoardNocturnas/settings/pages).
2. En **Build and deployment → Source**, elige **Deploy from a branch**.
3. **Branch:** `gh-pages` · **Folder:** `/ (root)` · Guardar.
4. Ejecuta el workflow: **Actions → Deploy to GitHub Pages → Run workflow** (o haz un push a `main`).

Si no ves la sección Pages, un admin de la organización debe permitir GitHub Pages en  
[Organization settings → Member privileges → Pages](https://github.com/organizations/ProgramacionCompetitivaUFPS/settings/member_privileges).

Tras el primer despliegue correcto, la web puede tardar 1–2 minutos en estar disponible.
