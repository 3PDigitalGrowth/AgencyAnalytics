# 3P Digital Growth — Client Dashboard

A real-time, multi-channel marketing performance dashboard built with Next.js 14.

## Data Sources
- Google Search Console (GSC)
- Google Analytics 4 (GA4)
- Google Ads
- Google Business Profile (GBP)
- Meta Ads (Facebook & Instagram)
- Microsoft Clarity

## Tech Stack
- **Framework:** Next.js 14 (App Router) + TypeScript
- **UI:** Tailwind CSS + Radix UI
- **Charts:** Recharts
- **Auth:** NextAuth.js v5
- **Database:** PostgreSQL + Prisma ORM
- **Caching:** DB-level metric cache (1-hour TTL)

## Setup

### 1. Clone & install
```bash
git clone https://github.com/3PDigitalGrowth/AgencyAnalytics.git
cd AgencyAnalytics
npm install
```

### 2. Environment
```bash
cp .env.example .env.local
# Fill in all values — see comments in .env.example
```

### 3. Database
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Google Cloud Setup
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project → Enable APIs:
   - Google Search Console API
   - Google Analytics Data API
   - Google Ads API
   - Business Profile Performance API
3. Create OAuth 2.0 credentials (Web application)
4. Add redirect URI: `http://localhost:3000/api/auth/callback/google`

### 5. Meta App Setup
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create an app → Add Marketing API product
3. Copy App ID and App Secret to `.env.local`

### 6. Run
```bash
npm run dev
```

## Deployment (Vercel)
1. Push to GitHub
2. Import repo in Vercel
3. Add all env vars from `.env.example`
4. Deploy

## Adding a Client
Use Prisma Studio or a seed script to create a `Client` record and assign users.
```bash
npx prisma studio
```
