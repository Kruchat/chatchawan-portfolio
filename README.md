# Chatchawan Portfolio

Standalone Next.js App Router portfolio for Upwork proposals. This project is separate from the HONGKONGMODE booking system.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- lucide-react
- Supabase

## Local Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Live Demo Backend

The demo backoffice uses a real Supabase project and server-side Next.js route handlers.

- `/demo` - public client demo with live lead intake
- `/demo/backoffice` - operations-style backoffice view
- `/api/demo/overview` - read live demo data
- `/api/demo/leads` - create a demo lead

Required environment variables:

```bash
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

The service role key must stay server-side only. Do not expose it as `NEXT_PUBLIC_...`.

## Verification

```bash
npm run lint
npm run build
```

## Deploy

Deploy this folder to Vercel as a new project. After deployment, use the live URL in Upwork proposals as the Next.js App Router project link.
