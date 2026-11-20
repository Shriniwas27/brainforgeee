# Brainqueue

Brainqueue is a collaborative coding practice workspace for developers who want to
solve problems, compete in timed rooms, and improve together. The application
combines DSA challenges, aptitude questions, CS fundamentals, live room
leaderboards, community contributions, and developer performance statistics in a
single interface.

> **Project status:** Brainqueue is currently a frontend prototype. The interface
> includes local demo data and mock interactions, with optional API integration
> for the problem library and code execution flows.

## Features

- **Problem library** with DSA, Aptitude, and CS Fundamentals categories
- Search and difficulty filters for Easy, Medium, and Hard problems
- **Coding workspace** for programming challenges with run and submit actions
- **MCQ workspace** for aptitude and CS fundamentals questions
- **Multiplayer rooms** with room creation, room joining, friend search, and
  leaderboard views
- **Contribution Studio** for proposing problems, test cases, and issue reports
- **Performance profile** with ratings, contest history, solved-question
  breakdowns, and activity heatmap
- **Assessment builder** for MCQ or coding assessments, scheduling, invitations,
  browser-lock settings, and QR-code display
- Responsive UI built with React, Tailwind CSS, and Material Symbols

## Tech stack

- [React](https://react.dev/) 19
- [React Router](https://reactrouter.com/) 7
- [Vite](https://vite.dev/) 8
- [Tailwind CSS](https://tailwindcss.com/) 3
- [Axios](https://axios-http.com/) for API requests
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) for linting

## Getting started

### Prerequisites

- Node.js 20.19 or newer (required by Vite 8)
- npm 9 or newer
- A backend listening on `http://localhost:8000` if you want to use the API
  endpoints

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local URL, usually
[`http://localhost:5173`](http://localhost:5173).

The Vite development server proxies requests beginning with `/api` to
`http://localhost:8000`. The frontend still loads its local fallback problem
data when the problem-list request cannot reach the backend.

### Create a production build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

### Run the linter

```bash
npm run lint
```

## Application routes

| Route | Description | Authentication |
| --- | --- | --- |
| `/` | Landing page | Public |
| `/signup` | Create-account form | Public |
| `/login` | Sign-in form | Public |
| `/rooms` | Multiplayer room hub | Required |
| `/rooms/:roomId/leaderboard` | Room leaderboard | Required |
| `/problems` | Filterable problem library | Required |
| `/problems/:problemId` | Coding or MCQ workspace | Required |
| `/studio` | Community contribution tools | Required |
| `/profile` | Performance statistics | Required |
| `/create-test` | Assessment builder | Required |

The current demo authentication flow stores the authenticated state in browser
`localStorage` under `devsolve-authenticated`. It is intended for demonstration
only and is not a production authentication system.

## Backend integration

The frontend expects the following API paths when a backend is available:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/problems` | Load the problem library |
| `GET` | `/api/problems/:problemId` | Load a problem |
| `POST` | `/api/problems/:problemId/run` | Run a coding submission |
| `POST` | `/api/problems/:problemId/submit` | Submit a coding solution |
| `POST` | `/api/problems/:problemId/submit-mcq` | Submit an MCQ answer |

Configure the backend separately to provide these endpoints. The proxy target is
defined in [`vite.config.js`](./vite.config.js).

## Project structure

```text
.
├── public/                 # Static icons and public assets
├── src/
│   ├── assets/             # Imported images and assets
│   ├── components/         # Shared navigation components
│   ├── pages/              # Route-level screens
│   ├── App.jsx             # Router and authentication gate
│   ├── App.css             # Application styles
│   └── index.css           # Global styles and Tailwind layers
├── index.html              # HTML entry point
├── vite.config.js          # Vite and API proxy configuration
├── tailwind.config.js      # Tailwind theme configuration
└── package.json            # Scripts and dependencies
```

## Development notes

- Most screens currently use local mock data so the UI can be explored without a
  backend.
- API-backed screens use Axios and fall back to local problem data where
  supported.
- The UI uses browser history routing. Configure the production host to serve
  `index.html` for client-side routes when deploying.
- Do not commit generated `dist/` output or `node_modules/`; both are ignored by
  Git.

## Contributing

1. Create a feature branch.
2. Keep changes focused and follow the existing React and Tailwind patterns.
3. Run `npm run lint` and `npm run build` before opening a pull request.
4. Describe any backend contract changes alongside the frontend changes.

## License

No license has been declared for this project yet. Add a license file before
distributing Brainqueue or accepting external contributions under defined terms.
