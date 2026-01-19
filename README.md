# AdPilot

A comprehensive Facebook Ads management platform for consultants and coaches. Built with React, TypeScript, and Tailwind CSS featuring a Neo-Brutalism design style.

![AdPilot](https://img.shields.io/badge/AdPilot-v1.0.0-purple)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-teal)

## Live Demo

**Production URL:** [https://adpilot-alpha.vercel.app](https://adpilot-alpha.vercel.app)

## Features

### Audience Intelligence
- **Customer Avatar Builder** - Create detailed customer profiles with demographics, psychographics, and messaging guidelines
- **Targeting Strategy Builder** - Plan Facebook targeting with interests, behaviors, and custom audiences
- **Exclusion Matrix** - Define and manage audience exclusions
- **Lookalike Audience Builder** - Create and track lookalike audiences
- **Export to PDF** - Export avatars for sharing with team members

### Copy Lab
- **Copy Generator** - Generate ad copy using proven frameworks (PAS, AIDA, BAB, etc.)
- **Hook Library** - Browse and use proven hook templates
- **Swipe File** - Save and analyze winning ads for inspiration
- **Compliance Checker** - Check ad copy for Facebook policy violations
- **Copy Analyzer** - Score and analyze ad copy effectiveness

### Creative Studio
- **Brief Builder** - Create detailed creative briefs for designers
- **Format Recommender** - Get AI-powered format recommendations
- **Creative Matrix** - Plan and track creative variations for testing

### Campaign Management
- **Campaign Builder** - Build campaigns with proper structure
- **Funnel Mapper** - Visualize campaigns across funnel stages
- **Budget Calculator** - Plan budgets with forecasting
- **Launch Checklist** - Pre-launch checklist with progress tracking

### Analytics
- **Performance Dashboard** - Track key metrics with charts
- **Weekly Review** - Document weekly performance and learnings
- **Diagnostic Engine** - Identify issues and get recommendations
- **Benchmarks** - Compare performance against industry standards

### Testing
- **Test Planner** - Plan A/B tests with hypotheses
- **Significance Calculator** - Calculate statistical significance
- **Learning Log** - Document test results and learnings

### Library
- **Winner Library** - Document winning ads, hooks, and strategies
- **Failure Log** - Learn from what didn't work
- **Campaign Archive** - Historical record of campaigns

### Additional Features
- **Notifications Panel** - Alerts for budget, performance, and tests
- **Mobile Responsive** - Bottom navigation for mobile devices
- **Neo-Brutalism Design** - Bold, modern UI with hard shadows and bright colors

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Shadcn UI
- **State Management:** Zustand, TanStack Query
- **Charts:** Recharts
- **Icons:** Lucide React
- **Routing:** React Router v6
- **Backend (optional):** Supabase

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/adpilot.git

# Navigate to the project
cd adpilot

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables (Optional)

Create a `.env` file for Supabase integration:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
vercel --prod
```

## Project Structure

```
src/
├── components/
│   ├── analytics/      # Analytics components
│   ├── audience/       # Audience/Avatar components
│   ├── campaigns/      # Campaign components
│   ├── copy/           # Copy Lab components
│   ├── creative/       # Creative Studio components
│   ├── dashboard/      # Dashboard components
│   ├── layout/         # Layout components
│   ├── library/        # Library components
│   ├── settings/       # Settings components
│   ├── testing/        # Testing components
│   └── ui/             # Shadcn UI components
├── data/               # Static data and constants
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
├── pages/              # Page components
├── store/              # Zustand store
└── types/              # TypeScript types
```

## Design System

AdPilot uses a **Neo-Brutalism** design style:

- **Colors:** Yellow (#FFD700), Purple (#7C3AED), White, Black
- **Borders:** Bold 2-4px black borders
- **Shadows:** Hard offset shadows (no blur)
- **Typography:** Space Grotesk font family
- **No rounded corners** - Sharp, bold aesthetic

## License

MIT License

## Author

Built with Cascade AI
