# 1DAY

Build habits. Track streaks. One day at a time.

## Features

- **Streak Tracking**: Track consecutive days of habit completion
- **Contribution Grid**: GitHub-style visualization of your year
- **Momentum Score**: See your weekly consistency at a glance
- **Daily Messages**: Personalized motivation based on your progress
- **Cloud Sync**: Sign in with Google to sync across devices

## Tech Stack

- [Astro](https://astro.build) - Full-stack framework
- [React](https://react.dev) - UI components
- [Supabase](https://supabase.com) - Auth & database
- [Vercel](https://vercel.com) - Deployment

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Supabase credentials to .env

# Run development server
npm run dev
```

## Environment Variables

Create a `.env` file with:

```
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Setup

Run `supabase-setup.sql` in your Supabase SQL Editor to create the required tables.

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |



need to work on the contribution-wrapper.

I need a professional clean grid for desktop and mobile.

Not sure how it goes currently but initially i would like to have the days of the month current month and an option that will give you the year.

nice clean and responsive