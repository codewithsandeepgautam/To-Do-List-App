# To-Do List App (MERN)

Mobile-first To-Do app: weekly task cards (Mon–Sun), create / edit / delete / search, status updates and weekly progress.

## Stack
React 18 + Vite + Tailwind CSS · Express · MongoDB (Mongoose)

## Run locally
```bash
# API
cd server && cp .env.example .env   # add your MongoDB URI
npm install && npm run dev          # http://localhost:5000

# Client (new terminal)
cd client && npm install && npm run dev   # http://localhost:5173 (proxies /api → :5000)
```

## Seed data
`cd server && npm run seed` clears the collection and inserts ~180 demo tasks (4 weeks back, current week, 3 weeks ahead, relative to today).
With `AUTO_SEED=true` in `server/.env`, an empty database is seeded automatically on startup (handy for the deployed demo).

## Responsive
Phones follow the Figma mobile screens exactly; tablets/desktops use the full screen (split welcome page, two-column home, week-card grid, centered modal).

## API
| Method | Route | Purpose |
|---|---|---|
| GET | `/api/tasks` | List tasks (sorted by date) |
| POST | `/api/tasks` | Create task `{ title, description?, dueAt, endsAt?, priority? }` |
| PATCH | `/api/tasks/:id` | Edit task / update `status` (`In Progress` \| `Completed`) |
| DELETE | `/api/tasks/:id` | Delete task |

## Deploy
1. **API** → Render/Railway: root `server`, start `npm start`, env `MONGO_URI`, `CLIENT_URL=<netlify url>`.
2. **Client** → Netlify: base `client`, build `npm run build`, publish `dist`, env `VITE_API_URL=https://<api-host>/api`.
