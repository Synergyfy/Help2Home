# Help2Home Monorepo

Welcome to the Help2Home monorepo. This project contains both the frontend and backend applications for the Help2Home platform.

## Project Structure

- `apps/web`: The Next.js frontend application (formerly Help2Home-FE).
- `apps/api`: The NestJS backend application (formerly Help2Home-BE).

## Tech Stack

- **Monorepo Management**: [pnpm Workspaces](https://pnpm.io/workspaces)
- **Build System**: [Turbo](https://turbo.build/)
- **Frontend**: Next.js, TypeScript, Tailwind CSS, Recharts
- **Backend**: NestJS, TypeScript, TypeORM, PostgreSQL

## Getting Started

### Prerequisites

- Node.js (v24.13.0 or higher recommended)
- pnpm (v10.29.1 or higher)

### Installation

```bash
pnpm install
```

### Development

To run all applications in development mode:

```bash
pnpm dev
```

To run a specific application:

```bash
pnpm --filter @help-2-home/web dev
# or
pnpm --filter @help-2-home/api dev
```

### Build

To build all applications:

```bash
pnpm build
```

## Scripts

- `pnpm dev`: Runs the development server for all apps.
- `pnpm build`: Builds all apps for production.
- `pnpm lint`: Lints all apps.
- `pnpm format`: Formats code using Prettier.
