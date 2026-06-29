# React Retail

React Retail is a modern ecommerce frontend built for Udacity's Intermediate React capstone. It separates client state from server state, includes a mock login flow and protected checkout, and uses a local Express API during full local development.

Live site: https://devin-thomas.github.io/react-retail/

## Features

- Product catalog and detail pages powered by TanStack Query
- Shared cart state with reducer-driven add, update, remove, and total behaviors
- Mock authentication with redirect-back protected checkout
- Order submission flow with loading, error, and success states
- Recently viewed products restored from local storage
- GitHub Pages landing view for the static portfolio deployment

## Stack

- React 19
- React Router
- TanStack Query
- Vite
- Express mock API
- Vitest and Testing Library

## Local Setup

```bash
npm install
npm run dev:api
```

In a second terminal:

```bash
npm run dev
```

## Validation

```bash
npm run lint
npm run test -- --run
npm run build
```

## Implementation Notes

- Server state is handled with React Query for products and order submission.
- Client state is managed with Context plus a reducer for cart, auth, and recently viewed items.
- The GitHub Pages deployment intentionally serves a hosted overview page because the checkout API is local-only.

## Deployment

GitHub Actions validates the app and publishes the static landing build to GitHub Pages from `main`.
