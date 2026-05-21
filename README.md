# CR Mölkky

Score tracker for the game Mölkky, built as a progressive web app.

**[molkky.crundberg.se](http://molkky.crundberg.se/)**

## Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Router v6](https://reactrouter.com/)

## Getting started

```sh
npm install
npm start
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start the dev server |
| `npm run build` | Build for production to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Deploy to GitHub Pages |

## Rules

Mölkky is played with numbered pins (1–12). Knocking down a single pin scores its
number; knocking down multiple pins scores the count. First to reach exactly 50 wins.
Going over 50 drops the score to 25. Three consecutive misses means disqualification.

## License

MIT
