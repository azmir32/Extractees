# Extractees Web (React + Vite + TypeScript)

Clean, open-sourced landing site using React, TypeScript, Vite, Tailwind v4, TanStack Router/Query, and Clerk.

## Requirements
- Node 18+ (recommend LTS)

## Getting Started
```
cd web
npm install
echo "VITE_CLERK_PUBLISHABLE_KEY=YOUR_KEY" > .env.local
npm run dev
```

Open `http://localhost:5174`.

## Scripts
- `npm run dev` – Start dev server (fixed port 5174)
- `npm run build` – Type-check and build
- `npm run typecheck` – TypeScript project references build (no emit)
- `npm run lint` – ESLint
- `npm run preview` – Preview production build

## Stack
- React + Vite + TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- TanStack Router + React Query
- Clerk auth

## Project Structure
```
src/
  components/   # UI primitives
  routes/        # Single-page landing
  sections/      # Site-level sections (e.g., SocialFooter)
  index.css      # Theme tokens and Tailwind
```

## Coding Standards
- Strict TypeScript and ESLint rules
- Accessible, semantic markup
- Small, composable components

## License
MIT
