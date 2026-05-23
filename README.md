# Chatchawan Portfolio

Standalone Next.js App Router portfolio and online service sales site. It includes public portfolio pages, service packages, hiring/contact forms, and a password-protected CMS backoffice.

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

- `/about` - personal profile page
- `/services` - online service package catalog
- `/services/[slug]` - service detail and hiring request form
- `/demo` - public client demo with live lead intake
- `/demo/backoffice` - operations-style demo backoffice view
- `/projects/ai-service-crm` - playable mini project for Upwork clients
- `/en`, `/th`, `/zh` - localized portfolio routes
- `/th/about`, `/zh/about`, `/th/services`, `/zh/services` - localized about/services routes
- `/en/projects/ai-service-crm`, `/th/projects/ai-service-crm`, `/zh/projects/ai-service-crm` - localized playable project routes
- `/admin` - password-protected CMS for content, services, projects, settings, and requests
- `/admin/login` - admin login screen
- `/api/contact` - create a contact message
- `/api/hiring-requests` - create an online hiring request
- `/api/admin/cms` - admin-only CMS mutations
- `/api/demo/overview` - read live demo data
- `/api/demo/leads` - create a demo lead

Required environment variables:

```bash
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

The service role key and admin credentials must stay server-side only. Do not expose them as `NEXT_PUBLIC_...`.

Run the Supabase migrations in `supabase/migrations` before using CMS storage in production. The app has built-in fallback content, so public pages still render before the CMS tables exist.

## Verification

```bash
npm run lint
npm run build
```

## Deploy

Deploy this folder to Vercel as a new project. After deployment, use the live URL in Upwork proposals as the Next.js App Router project link.
