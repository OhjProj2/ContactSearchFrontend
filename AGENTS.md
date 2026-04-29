# AGENTS.md - ContactSearch Frontend

This repository contains the React frontend for the ContactSearch application. It provides the user interface for initiating contact scrapes, viewing results, and managing found data from the ContactSearchBackend.

## Tech Stack
- **Framework:** React (Vite)
- **Language:** TypeScript
- **Package Manager:** npm (or pnpm/yarn - update based on your preference)
- **Styling:** Tailwind CSS / Gravity UI / HeroUI
- **State Management:** React Hooks / Context API
- **API Fetching:** TanStack Query (React Query)
- **Testing:** Vitest / Playwright (for E2E)

## Core Commands
The following commands should be used for development and verification. 

- **Install dependencies:** `npm install`
- **Run dev server:** `npm run dev`
- **Build for production:** `npm run build`
- **Run unit tests:** `npm run test`
- **Run linting:** `npm run lint`
- **Type check:** `npm run type-check`

## Coding Conventions
- **Component Structure:** Use functional components with TypeScript interfaces for Props.
- **Naming:** Use PascalCase for components (`ContactTable.tsx`) and camelCase for hooks (`useContactData.ts`).
- **Styling:** Use Tailwind utility classes. Avoid writing custom CSS files unless absolutely necessary.
- **API Communication:** All requests should go to the `ContactSearchBackend`. Use environment variables for the API Base URL.
- **State:** Prefer local state (`useState`) or Context for global UI state. Keep business logic separate from UI components when possible.

## Project Structure
- `/src/components`: Reusable UI components (Buttons, Inputs, Modals).
- `/src/hooks`: Custom React hooks for API calls and logic.
- `/src/pages`: Top-level page views.
- `/src/services`: API client definitions and Axios instances.
- `/src/types`: TypeScript interfaces and types.

## Boundaries & Constraints
- **Responsiveness:** All new UI elements must be mobile-friendly (responsive design).
- **Environment Variables:** Access the backend URL via `VITE_API_URL`. Do not hardcode localhost strings.
- **Icons:** Use `lucide-react` for consistent iconography.
- **Error States:** Always implement loading spinners and error alerts for asynchronous API calls.

## Testing Rules
- New UI features must include unit tests for logic-heavy components.
- Run `npm run lint` before suggesting any code changes to ensure style consistency.
- If modifying the API service, verify that the data interfaces match the Pydantic models in the backend.

## Deployment Context
- The frontend is typically built as a static site and served via Nginx or a platform like Rahti.
- Ensure the `dist/` folder remains clean and the build command passes without TypeScript errors.