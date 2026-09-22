# Viossa Dictionary

A personal dictionary for [Viossa](https://en.wikipedia.org/wiki/Viossa). Rather than providing one centralized dictionary, the app gives each user an initially empty word list that they can build themselves.

[viossa-dict.vercel.app](https://viossa-dict.vercel.app/)

## Features

- Personal dictionaries with Discord authentication
- Markdown-formatted definitions
- Word search and alternate spellings
- Shareable word lists
- Definition creation, editing, and deletion

## Tech Stack

- Next.js, React, and TypeScript
- tRPC and TanStack Query
- PostgreSQL with Drizzle ORM
- NextAuth.js
- Tailwind CSS

## Local Development

### Prerequisites

- Node.js 20 or later
- pnpm 8
- PostgreSQL, or Docker for the included database script
- A Discord OAuth application

### Setup

1. Install dependencies:

   ```sh
   pnpm install
   ```

2. Create the local environment file:

   ```sh
   cp .env.example .env
   ```

3. Set `DISCORD_CLIENT_ID` and `DISCORD_CLIENT_SECRET` in `.env`. For local development, configure the Discord OAuth redirect URL as:

   ```text
   http://localhost:3000/api/auth/callback/discord
   ```

4. Start PostgreSQL. To create and run the included Docker container, use:

   ```sh
   ./start-database.sh
   ```

   If you use an existing PostgreSQL server instead, update `DATABASE_URL` in `.env`.

5. Apply the database schema:

   ```sh
   pnpm db:push
   ```

6. Start the development server:

   ```sh
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection URL |
| `NEXTAUTH_URL` | Public URL of the application |
| `NEXTAUTH_SECRET` | Secret used to sign authentication data; required in production |
| `DISCORD_CLIENT_ID` | Discord OAuth application client ID |
| `DISCORD_CLIENT_SECRET` | Discord OAuth application client secret |

Generate a `NEXTAUTH_SECRET` with `openssl rand -base64 32`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the production server |
| `pnpm lint` | Run Next.js linting |
| `pnpm db:generate` | Generate Drizzle migrations |
| `pnpm db:migrate` | Apply Drizzle migrations |
| `pnpm db:push` | Push the schema directly to the database |
| `pnpm db:studio` | Open Drizzle Studio |
