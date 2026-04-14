# MarCRM — Setup & Deployment Guide

## What This Is

A full-stack CRM built for your 6 business lines with:
- **Real database** (SQLite locally, upgradeable to Postgres for production)
- **Real web scraping** (scrapes actual company websites for tech stack, emails, team info)
- **Your exact ICP scoring model** (Fit 0-50 + Intent 0-50 = 100)
- **6 pipelines**: PR/Marketing, Fund Formation Law, Legal Consulting, Coaching & Ops, Media/Podcast, AI Consulting

## Quick Start (Run Locally)

### Prerequisites
- **Node.js 18+** — download from https://nodejs.org
- **Git** — download from https://git-scm.com

### Steps

```bash
# 1. Navigate to the project folder
cd MarCRM

# 2. Install dependencies
npm install

# 3. Set up the database
npx prisma db push

# 4. Seed it with your starter companies
npm run db:seed

# 5. Start the app
npm run dev
```

Then open **http://localhost:3000** in your browser. That's it — you have a working CRM.

## Deploy to the Internet

### Option A: Vercel (Recommended — Free tier)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial MarCRM"
   git remote add origin https://github.com/YOUR_USERNAME/MarCRM.git
   git push -u origin main
   ```

2. **Go to https://vercel.com** and sign in with GitHub

3. Click **"Add New Project"** → select your MarCRM repo

4. **Important:** For production, you need a cloud database (SQLite won't persist on Vercel). The easiest free option is **Neon** (Postgres):
   - Go to https://neon.tech (free tier)
   - Create a database
   - Copy the connection string
   - In Vercel project settings → Environment Variables, add:
     - `DATABASE_URL` = your Neon connection string
   - In `prisma/schema.prisma`, change `provider = "sqlite"` to `provider = "postgresql"`
   - Run `npx prisma db push` against your Neon database

5. Deploy! Vercel auto-deploys on every push to GitHub.

### Option B: Railway (Also easy, has built-in Postgres)

1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub Repo"
3. Railway gives you a free Postgres database — just add it to your project
4. Set `DATABASE_URL` environment variable to the Railway Postgres URL
5. Update `prisma/schema.prisma` provider to `"postgresql"`

## Adding Real Scraping API Keys (Optional, enhances data)

Edit your `.env` file (or set these in your Vercel/Railway dashboard):

```
# LinkedIn company enrichment (names, size, industry, employees)
# Sign up at https://proxycurl.com — starts at $10/100 credits
PROXYCURL_API_KEY=your_key_here

# Crunchbase funding & investor data
# Apply at https://data.crunchbase.com/docs
CRUNCHBASE_API_KEY=your_key_here
```

Without these keys, the scraper still works — it scrapes company websites directly for tech stack, emails, meta info, and social links. The API keys just add richer LinkedIn and Crunchbase data.

## How It Works

### Architecture
```
Browser (React frontend)
    ↕ fetch() calls
Next.js API Routes (server)
    ↕ Prisma ORM
Database (SQLite local / Postgres production)
    ↕ axios + cheerio
Web scraping (real websites)
```

### Key Files
- `src/components/AgencyCRM.jsx` — the full CRM interface
- `src/app/api/companies/route.js` — company CRUD endpoints
- `src/app/api/contacts/route.js` — contact CRUD endpoints
- `src/app/api/scrape/route.js` — real web scraping endpoint
- `src/lib/scraper.js` — scraping engine (cheerio, axios, API integrations)
- `src/lib/constants.js` — your 6 pipelines, scoring criteria, signal categories
- `prisma/schema.prisma` — database schema
- `prisma/seed.mjs` — starter data
