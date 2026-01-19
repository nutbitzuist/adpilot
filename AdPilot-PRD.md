# AdPilot - Facebook Ads Command Center
## Product Requirements Document (PRD)

**Version:** 1.0  
**Last Updated:** January 2026  
**Product Owner:** [Your Name]  
**Target Users:** Business owners, consultants, course creators running Facebook/Meta ads

---

## 1. Executive Summary

### 1.1 Product Vision
AdPilot is a comprehensive Facebook/Meta advertising management platform designed to help business owners, consultants, and course creators plan, execute, track, and optimize their Facebook ad campaigns systematically. The platform consolidates audience research, copywriting, creative briefing, campaign planning, performance analytics, and testing into one unified dashboard.

### 1.2 Problem Statement
Most businesses fail at Facebook ads because of:
- No clear customer understanding before launching campaigns
- Weak messaging that doesn't resonate with target audiences
- Poor creative that doesn't stop the scroll
- Messy campaign structures that waste budget
- Inability to read and interpret performance data correctly
- Random, unsystematic testing that doesn't lead to improvement

### 1.3 Solution
AdPilot provides a structured, expert-guided workflow that takes users from audience research through campaign optimization, ensuring every step is executed with best practices from 20+ years of Facebook advertising expertise.

### 1.4 Target Business Vertical
Primary focus on B2B consulting and online course businesses, with frameworks and benchmarks specifically tailored for:
- Business consultants
- Coaches
- Course creators
- Service providers targeting business owners

---

## 2. User Personas

### 2.1 Primary User: Solo Business Owner
- **Profile:** Consultant or course creator running their own ads
- **Pain Points:** Limited time, not an ads expert, needs guidance
- **Goals:** Get profitable campaigns running without hiring an agency
- **Usage Pattern:** Daily check-ins, weekly deep analysis

### 2.2 Secondary User: Team Member (Future)
- **Profile:** Marketing assistant or VA managing ads
- **Pain Points:** Needs structured processes, accountability
- **Goals:** Execute campaigns according to established playbooks
- **Usage Pattern:** Task-based usage, follows workflows

---

## 3. Technical Architecture

### 3.1 Tech Stack

**Frontend:**
- React 18+ with TypeScript
- Tailwind CSS for styling
- Shadcn/ui component library
- Recharts for data visualization
- React Router v6 for navigation
- React Hook Form + Zod for form validation
- Lucide React for icons

**Backend & Database:**
- Supabase (PostgreSQL database)
- Supabase Auth (authentication)
- Supabase Row Level Security (RLS)
- Supabase Realtime (future: real-time updates)

**State Management:**
- Zustand for global state
- TanStack Query (React Query) for server state

**Deployment:**
- Vercel for frontend hosting
- Supabase hosted backend

### 3.2 Project Structure

```
adpilot/
├── src/
│   ├── components/
│   │   ├── ui/                    # Shadcn/ui components
│   │   ├── layout/                # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── dashboard/             # Dashboard components
│   │   │   ├── MetricCard.tsx
│   │   │   ├── CampaignList.tsx
│   │   │   ├── ActiveTests.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   └── WeeklyInsight.tsx
│   │   ├── audience/              # Audience module components
│   │   │   ├── AvatarBuilder.tsx
│   │   │   ├── AvatarForm.tsx
│   │   │   ├── TargetingPlanner.tsx
│   │   │   ├── InterestSuggestions.tsx
│   │   │   ├── LookalikeStrategy.tsx
│   │   │   └── ExclusionMatrix.tsx
│   │   ├── copy/                  # Copy Lab components
│   │   │   ├── CopyGenerator.tsx
│   │   │   ├── CopyAnalyzer.tsx
│   │   │   ├── HookLibrary.tsx
│   │   │   ├── OfferArchitect.tsx
│   │   │   └── SwipeFile.tsx
│   │   ├── creative/              # Creative module components
│   │   │   ├── BriefGenerator.tsx
│   │   │   ├── BriefForm.tsx
│   │   │   ├── FormatRecommender.tsx
│   │   │   └── CreativeMatrix.tsx
│   │   ├── campaigns/             # Campaign module components
│   │   │   ├── CampaignBuilder.tsx
│   │   │   ├── FunnelMapper.tsx
│   │   │   ├── StructurePlanner.tsx
│   │   │   ├── BudgetCalculator.tsx
│   │   │   └── LaunchChecklist.tsx
│   │   ├── analytics/             # Analytics module components
│   │   │   ├── PerformanceDashboard.tsx
│   │   │   ├── MetricsTracker.tsx
│   │   │   ├── MetricsInput.tsx
│   │   │   ├── DiagnosticEngine.tsx
│   │   │   ├── BenchmarkReference.tsx
│   │   │   └── WeeklyReview.tsx
│   │   ├── testing/               # Testing module components
│   │   │   ├── TestPlanner.tsx
│   │   │   ├── HypothesisBuilder.tsx
│   │   │   ├── TestTracker.tsx
│   │   │   ├── SignificanceCalc.tsx
│   │   │   └── LearningLibrary.tsx
│   │   └── library/               # Library components
│   │       ├── CampaignArchive.tsx
│   │       ├── WinnerLibrary.tsx
│   │       └── FailureLog.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Audience.tsx
│   │   ├── CopyLab.tsx
│   │   ├── Creative.tsx
│   │   ├── Campaigns.tsx
│   │   ├── Analytics.tsx
│   │   ├── Testing.tsx
│   │   ├── Library.tsx
│   │   ├── Settings.tsx
│   │   └── Auth.tsx
│   ├── hooks/
│   │   ├── useAudiences.ts
│   │   ├── useCampaigns.ts
│   │   ├── useCopy.ts
│   │   ├── useCreatives.ts
│   │   ├── useMetrics.ts
│   │   ├── useTests.ts
│   │   └── useAuth.ts
│   ├── lib/
│   │   ├── supabase.ts            # Supabase client
│   │   ├── utils.ts               # Utility functions
│   │   ├── constants.ts           # App constants
│   │   └── benchmarks.ts          # Industry benchmarks data
│   ├── store/
│   │   └── useStore.ts            # Zustand store
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   ├── data/
│   │   ├── targeting-suggestions.ts
│   │   ├── hook-templates.ts
│   │   ├── copy-frameworks.ts
│   │   └── funnel-templates.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── .env.example
```

---

## 4. Database Schema

### 4.1 Core Tables

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & PROFILES
-- ============================================

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    company_name TEXT,
    industry TEXT DEFAULT 'consulting',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- AUDIENCE MODULE
-- ============================================

CREATE TABLE customer_avatars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    
    -- Demographics
    age_range_start INTEGER,
    age_range_end INTEGER,
    gender TEXT, -- 'male', 'female', 'all'
    location TEXT,
    income_level TEXT,
    education TEXT,
    job_title TEXT,
    industry TEXT,
    company_size TEXT,
    
    -- Psychographics
    goals JSONB DEFAULT '[]', -- Array of strings
    frustrations JSONB DEFAULT '[]',
    fears JSONB DEFAULT '[]',
    desires JSONB DEFAULT '[]',
    objections JSONB DEFAULT '[]',
    
    -- Behavior
    where_they_hang_out JSONB DEFAULT '[]', -- Platforms, communities
    influencers_they_follow JSONB DEFAULT '[]',
    books_podcasts JSONB DEFAULT '[]',
    buying_triggers JSONB DEFAULT '[]',
    
    -- Language
    phrases_they_use JSONB DEFAULT '[]',
    pain_point_language JSONB DEFAULT '[]',
    
    -- Day in the life
    daily_routine TEXT,
    decision_making_process TEXT,
    
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE targeting_strategies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    avatar_id UUID REFERENCES customer_avatars(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    
    -- Interest Targeting
    interests JSONB DEFAULT '[]', -- [{name, category, size_estimate}]
    
    -- Behavior Targeting
    behaviors JSONB DEFAULT '[]',
    
    -- Demographics
    age_min INTEGER,
    age_max INTEGER,
    genders JSONB DEFAULT '[]',
    locations JSONB DEFAULT '[]',
    languages JSONB DEFAULT '[]',
    
    -- Custom Audiences
    custom_audiences JSONB DEFAULT '[]', -- [{type, name, description}]
    
    -- Lookalikes
    lookalike_sources JSONB DEFAULT '[]', -- [{source, percentage, description}]
    
    -- Exclusions
    exclusions JSONB DEFAULT '[]', -- [{type, name, reason}]
    
    -- Layering Strategy
    layering_notes TEXT,
    
    -- Performance Notes
    performance_notes TEXT,
    estimated_audience_size TEXT,
    
    status TEXT DEFAULT 'draft', -- 'draft', 'active', 'paused', 'archived'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COPY LAB MODULE
-- ============================================

CREATE TABLE offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    
    -- Core Offer
    offer_type TEXT, -- 'lead_magnet', 'low_ticket', 'high_ticket', 'webinar', 'call'
    headline TEXT,
    description TEXT,
    price TEXT,
    
    -- Value Stack
    value_stack JSONB DEFAULT '[]', -- [{item, value, description}]
    total_value TEXT,
    
    -- Bonuses
    bonuses JSONB DEFAULT '[]', -- [{name, value, description}]
    
    -- Guarantees & Risk Reversal
    guarantee_type TEXT,
    guarantee_details TEXT,
    
    -- Urgency & Scarcity
    urgency_type TEXT, -- 'deadline', 'limited_spots', 'price_increase', 'bonus_expiry'
    urgency_details TEXT,
    
    -- Transformation Promise
    before_state TEXT,
    after_state TEXT,
    timeframe TEXT,
    
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ad_copy (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    offer_id UUID REFERENCES offers(id) ON DELETE SET NULL,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    
    name TEXT NOT NULL,
    copy_type TEXT, -- 'primary_text', 'headline', 'description', 'full_ad'
    
    -- Content
    hook TEXT,
    body TEXT,
    cta TEXT,
    full_text TEXT,
    
    -- Metadata
    hook_type TEXT, -- 'question', 'bold_claim', 'story', 'pattern_interrupt', 'statistic'
    tone TEXT, -- 'professional', 'casual', 'urgent', 'empathetic'
    length TEXT, -- 'short', 'medium', 'long'
    
    -- Analysis Scores (1-10)
    clarity_score INTEGER,
    emotion_score INTEGER,
    cta_strength INTEGER,
    overall_score INTEGER,
    
    -- Performance
    performance_notes TEXT,
    is_winner BOOLEAN DEFAULT FALSE,
    
    -- Tags
    tags JSONB DEFAULT '[]',
    
    status TEXT DEFAULT 'draft', -- 'draft', 'active', 'testing', 'winner', 'archived'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE swipe_file (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    
    source TEXT, -- Where you found it
    source_url TEXT,
    screenshot_url TEXT,
    
    -- Content
    primary_text TEXT,
    headline TEXT,
    description TEXT,
    
    -- Analysis
    hook_type TEXT,
    why_it_works TEXT,
    industry TEXT,
    format_type TEXT, -- 'image', 'video', 'carousel'
    
    -- Tags
    tags JSONB DEFAULT '[]',
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CREATIVE MODULE
-- ============================================

CREATE TABLE creative_briefs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    
    name TEXT NOT NULL,
    format_type TEXT, -- 'static', 'carousel', 'video', 'ugc', 'story', 'reel'
    
    -- Objective
    objective TEXT,
    target_audience TEXT,
    
    -- Structure
    hook_concept TEXT,
    hook_text_overlay TEXT,
    body_concept TEXT,
    cta_concept TEXT,
    
    -- Visual Direction
    visual_style TEXT, -- 'professional', 'casual', 'bold', 'minimal', 'ugc'
    color_palette JSONB DEFAULT '[]',
    typography_notes TEXT,
    
    -- For Video
    video_length TEXT,
    scene_breakdown JSONB DEFAULT '[]', -- [{scene_num, duration, description, text_overlay}]
    music_style TEXT,
    
    -- For Carousel
    carousel_slides JSONB DEFAULT '[]', -- [{slide_num, concept, text_overlay}]
    
    -- Technical Specs
    dimensions TEXT, -- '1080x1080', '1080x1920', '1200x628'
    file_format TEXT,
    
    -- Reference
    reference_links JSONB DEFAULT '[]',
    reference_notes TEXT,
    
    -- Status
    status TEXT DEFAULT 'draft', -- 'draft', 'in_production', 'ready', 'live'
    designer_notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CAMPAIGNS MODULE
-- ============================================

CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    
    -- Basic Info
    name TEXT NOT NULL,
    objective TEXT, -- 'awareness', 'traffic', 'engagement', 'leads', 'conversions', 'sales'
    funnel_stage TEXT, -- 'tof', 'mof', 'bof'
    
    -- Offer & Targeting Links
    offer_id UUID REFERENCES offers(id) ON DELETE SET NULL,
    targeting_strategy_id UUID REFERENCES targeting_strategies(id) ON DELETE SET NULL,
    
    -- Structure
    campaign_type TEXT, -- 'cbo', 'abo'
    
    -- Budget
    daily_budget DECIMAL(10,2),
    total_budget DECIMAL(10,2),
    budget_type TEXT, -- 'daily', 'lifetime'
    
    -- Schedule
    start_date DATE,
    end_date DATE,
    
    -- Ad Sets
    ad_sets JSONB DEFAULT '[]', -- [{name, targeting_variant, budget_allocation}]
    
    -- Status
    status TEXT DEFAULT 'planning', -- 'planning', 'ready', 'active', 'paused', 'completed'
    
    -- Platform IDs (if synced)
    meta_campaign_id TEXT,
    
    -- Notes
    notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE campaign_ads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    
    name TEXT NOT NULL,
    ad_set_name TEXT,
    
    -- Creative Links
    copy_id UUID REFERENCES ad_copy(id) ON DELETE SET NULL,
    creative_brief_id UUID REFERENCES creative_briefs(id) ON DELETE SET NULL,
    
    -- Ad Details
    format_type TEXT,
    creative_url TEXT,
    landing_page_url TEXT,
    utm_parameters JSONB DEFAULT '{}',
    
    -- Status
    status TEXT DEFAULT 'draft',
    
    -- Platform ID
    meta_ad_id TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ANALYTICS MODULE
-- ============================================

CREATE TABLE campaign_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    
    -- Time Period
    date DATE NOT NULL,
    period_type TEXT DEFAULT 'daily', -- 'daily', 'weekly', 'monthly'
    
    -- Spend
    spend DECIMAL(10,2) DEFAULT 0,
    
    -- Reach & Impressions
    impressions INTEGER DEFAULT 0,
    reach INTEGER DEFAULT 0,
    frequency DECIMAL(5,2) DEFAULT 0,
    
    -- Engagement
    clicks INTEGER DEFAULT 0,
    link_clicks INTEGER DEFAULT 0,
    
    -- Conversions (adjust based on your objectives)
    leads INTEGER DEFAULT 0,
    purchases INTEGER DEFAULT 0,
    registrations INTEGER DEFAULT 0,
    add_to_carts INTEGER DEFAULT 0,
    
    -- Revenue
    revenue DECIMAL(10,2) DEFAULT 0,
    
    -- Calculated Metrics (can be computed or stored)
    cpm DECIMAL(10,2) DEFAULT 0,
    cpc DECIMAL(10,2) DEFAULT 0,
    ctr DECIMAL(5,4) DEFAULT 0,
    cpl DECIMAL(10,2) DEFAULT 0,
    cpa DECIMAL(10,2) DEFAULT 0,
    roas DECIMAL(5,2) DEFAULT 0,
    
    -- Notes
    notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(campaign_id, date, period_type)
);

CREATE TABLE ad_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_ad_id UUID REFERENCES campaign_ads(id) ON DELETE CASCADE,
    
    date DATE NOT NULL,
    
    spend DECIMAL(10,2) DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    link_clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    revenue DECIMAL(10,2) DEFAULT 0,
    
    cpm DECIMAL(10,2) DEFAULT 0,
    cpc DECIMAL(10,2) DEFAULT 0,
    ctr DECIMAL(5,4) DEFAULT 0,
    cpa DECIMAL(10,2) DEFAULT 0,
    roas DECIMAL(5,2) DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(campaign_ad_id, date)
);

-- ============================================
-- TESTING MODULE
-- ============================================

CREATE TABLE tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    
    name TEXT NOT NULL,
    
    -- Hypothesis
    hypothesis TEXT,
    variable_type TEXT, -- 'hook', 'copy', 'creative', 'audience', 'offer', 'landing_page'
    variable_details TEXT,
    
    -- Control & Variants
    control_description TEXT,
    control_ad_id UUID REFERENCES campaign_ads(id) ON DELETE SET NULL,
    variants JSONB DEFAULT '[]', -- [{name, description, ad_id}]
    
    -- Success Criteria
    primary_metric TEXT, -- 'ctr', 'cpl', 'cpa', 'roas'
    target_improvement DECIMAL(5,2), -- e.g., 20 for 20%
    minimum_sample_size INTEGER,
    minimum_spend DECIMAL(10,2),
    
    -- Duration
    start_date DATE,
    planned_end_date DATE,
    actual_end_date DATE,
    
    -- Results
    status TEXT DEFAULT 'planning', -- 'planning', 'running', 'completed', 'inconclusive'
    winner TEXT, -- 'control', 'variant_1', etc.
    statistical_significance DECIMAL(5,2),
    results_summary TEXT,
    
    -- Learnings
    key_learning TEXT,
    apply_to_future TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_id UUID REFERENCES tests(id) ON DELETE CASCADE,
    variant_name TEXT NOT NULL, -- 'control', 'variant_1', etc.
    
    -- Metrics
    spend DECIMAL(10,2) DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    
    -- Calculated
    ctr DECIMAL(5,4) DEFAULT 0,
    cvr DECIMAL(5,4) DEFAULT 0,
    cpa DECIMAL(10,2) DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LIBRARY & LEARNINGS
-- ============================================

CREATE TABLE learnings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    
    category TEXT, -- 'audience', 'copy', 'creative', 'campaign', 'general'
    title TEXT NOT NULL,
    description TEXT,
    
    -- Context
    source TEXT, -- 'test', 'observation', 'external'
    test_id UUID REFERENCES tests(id) ON DELETE SET NULL,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    
    -- Impact
    impact_level TEXT, -- 'high', 'medium', 'low'
    
    -- Tags
    tags JSONB DEFAULT '[]',
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_customer_avatars_user ON customer_avatars(user_id);
CREATE INDEX idx_targeting_strategies_user ON targeting_strategies(user_id);
CREATE INDEX idx_offers_user ON offers(user_id);
CREATE INDEX idx_ad_copy_user ON ad_copy(user_id);
CREATE INDEX idx_creative_briefs_user ON creative_briefs(user_id);
CREATE INDEX idx_campaigns_user ON campaigns(user_id);
CREATE INDEX idx_campaign_metrics_campaign ON campaign_metrics(campaign_id);
CREATE INDEX idx_campaign_metrics_date ON campaign_metrics(date);
CREATE INDEX idx_tests_user ON tests(user_id);
CREATE INDEX idx_learnings_user ON learnings(user_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_avatars ENABLE ROW LEVEL SECURITY;
ALTER TABLE targeting_strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_copy ENABLE ROW LEVEL SECURITY;
ALTER TABLE creative_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE learnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE swipe_file ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Generic policies for user-owned tables
DO $$
DECLARE
    tbl TEXT;
BEGIN
    FOREACH tbl IN ARRAY ARRAY['customer_avatars', 'targeting_strategies', 'offers', 'ad_copy', 'creative_briefs', 'campaigns', 'tests', 'learnings', 'swipe_file']
    LOOP
        EXECUTE format('CREATE POLICY "Users can view own %s" ON %s FOR SELECT USING (auth.uid() = user_id)', tbl, tbl);
        EXECUTE format('CREATE POLICY "Users can insert own %s" ON %s FOR INSERT WITH CHECK (auth.uid() = user_id)', tbl, tbl);
        EXECUTE format('CREATE POLICY "Users can update own %s" ON %s FOR UPDATE USING (auth.uid() = user_id)', tbl, tbl);
        EXECUTE format('CREATE POLICY "Users can delete own %s" ON %s FOR DELETE USING (auth.uid() = user_id)', tbl, tbl);
    END LOOP;
END $$;

-- Campaign-linked tables need join-based policies
CREATE POLICY "Users can view own campaign_ads" ON campaign_ads FOR SELECT 
    USING (EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = campaign_ads.campaign_id AND campaigns.user_id = auth.uid()));
CREATE POLICY "Users can insert own campaign_ads" ON campaign_ads FOR INSERT 
    WITH CHECK (EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = campaign_ads.campaign_id AND campaigns.user_id = auth.uid()));
CREATE POLICY "Users can update own campaign_ads" ON campaign_ads FOR UPDATE 
    USING (EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = campaign_ads.campaign_id AND campaigns.user_id = auth.uid()));
CREATE POLICY "Users can delete own campaign_ads" ON campaign_ads FOR DELETE 
    USING (EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = campaign_ads.campaign_id AND campaigns.user_id = auth.uid()));

CREATE POLICY "Users can view own campaign_metrics" ON campaign_metrics FOR SELECT 
    USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own campaign_metrics" ON campaign_metrics FOR INSERT 
    WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own campaign_metrics" ON campaign_metrics FOR UPDATE 
    USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own campaign_metrics" ON campaign_metrics FOR DELETE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view own ad_metrics" ON ad_metrics FOR SELECT 
    USING (EXISTS (
        SELECT 1 FROM campaign_ads 
        JOIN campaigns ON campaigns.id = campaign_ads.campaign_id 
        WHERE campaign_ads.id = ad_metrics.campaign_ad_id AND campaigns.user_id = auth.uid()
    ));
CREATE POLICY "Users can manage own ad_metrics" ON ad_metrics FOR ALL 
    USING (EXISTS (
        SELECT 1 FROM campaign_ads 
        JOIN campaigns ON campaigns.id = campaign_ads.campaign_id 
        WHERE campaign_ads.id = ad_metrics.campaign_ad_id AND campaigns.user_id = auth.uid()
    ));

CREATE POLICY "Users can view own test_results" ON test_results FOR SELECT 
    USING (EXISTS (SELECT 1 FROM tests WHERE tests.id = test_results.test_id AND tests.user_id = auth.uid()));
CREATE POLICY "Users can manage own test_results" ON test_results FOR ALL 
    USING (EXISTS (SELECT 1 FROM tests WHERE tests.id = test_results.test_id AND tests.user_id = auth.uid()));

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
DO $$
DECLARE
    tbl TEXT;
BEGIN
    FOREACH tbl IN ARRAY ARRAY['profiles', 'customer_avatars', 'targeting_strategies', 'offers', 'ad_copy', 'creative_briefs', 'campaigns', 'campaign_ads', 'tests', 'test_results']
    LOOP
        EXECUTE format('CREATE TRIGGER update_%s_updated_at BEFORE UPDATE ON %s FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()', tbl, tbl);
    END LOOP;
END $$;

-- Create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

---

## 5. Feature Specifications

### 5.1 Dashboard (Home)

**Purpose:** Central command center showing key metrics, active campaigns, and quick actions.

**Components:**
1. **Performance Overview Cards**
   - This Week's Spend (with % change)
   - Total Leads/Conversions (with % change)
   - Average CPL/CPA (with % change)
   - Overall ROAS (with % change)
   - Compare to previous period

2. **Active Campaigns List**
   - Campaign name
   - Status indicator (green/yellow/red based on performance)
   - Daily budget
   - Key metric (depends on objective)
   - Quick action buttons (pause, edit, view)

3. **Quick Actions Grid**
   - New Audience
   - Generate Copy
   - Create Brief
   - Log Metrics
   - Start Test
   - Add Learning

4. **Active Tests Panel**
   - Test name
   - Variable being tested
   - Days remaining
   - Current leader (if significant)

5. **Weekly Insight Card**
   - Auto-generated insight based on data
   - Pattern recognition
   - Actionable recommendation

6. **Notifications/Alerts**
   - Budget alerts
   - Underperforming campaigns
   - Tests ready for analysis
   - Scheduled reviews

---

### 5.2 Audience Intelligence Hub

**Purpose:** Deeply understand your target customer and plan precise targeting.

#### 5.2.1 Customer Avatar Builder

**Form Sections:**

**Demographics:**
- Avatar Name (for reference)
- Age Range (slider)
- Gender
- Location (countries, cities)
- Income Level (select)
- Education Level
- Job Title / Role
- Industry
- Company Size

**Psychographics:**
- Goals (what they want to achieve) - multi-input field
- Frustrations (what annoys them) - multi-input field
- Fears (what they're afraid of) - multi-input field
- Desires (what they dream about) - multi-input field
- Objections (why they might not buy) - multi-input field

**Behavior:**
- Where they hang out online (platforms, groups, forums)
- Influencers/thought leaders they follow
- Books, podcasts, publications they consume
- What triggers them to buy

**Language:**
- Phrases they use to describe their problems
- Phrases they use to describe their desired outcome
- Exact quotes (if you have them from research/calls)

**Day in the Life:**
- Rich text field for narrative description
- Decision-making process description

**Features:**
- Mark one avatar as "Primary"
- Duplicate avatar
- Export avatar to PDF
- View completion percentage

#### 5.2.2 Targeting Strategy Planner

**Sections:**

**Interest Targeting:**
- Interest suggestion engine based on avatar
- Category browser (Business, Entrepreneurship, Marketing, etc.)
- Interest stacking builder
- Estimated audience size calculator

**Behavior Targeting:**
- Business page admins
- Small business owners
- Engaged shoppers
- Technology behaviors
- Purchase behaviors

**Custom Audiences:**
- Customer list strategy
- Website visitors (pixel segments)
- Video viewers (%, duration)
- Lead form engagers
- Page/profile engagers

**Lookalike Audiences:**
- Source audience selector
- Percentage slider (1-10%)
- Stacking strategy (1%, 1-2%, 2-5%)
- Country selection

**Exclusion Matrix:**
- Existing customers
- Recent purchasers
- Email list segments
- Engaged non-buyers
- Competitor exclusions

**Pre-loaded Suggestions for Consulting/Courses:**
```javascript
const CONSULTING_INTERESTS = [
    { name: "Business consulting", category: "Business", size: "large" },
    { name: "Entrepreneurship", category: "Business", size: "large" },
    { name: "Small business", category: "Business", size: "large" },
    { name: "Business coach", category: "Business", size: "medium" },
    { name: "Marketing strategy", category: "Marketing", size: "medium" },
    { name: "Personal development", category: "Self-improvement", size: "large" },
    { name: "Tony Robbins", category: "Influencers", size: "large" },
    { name: "Gary Vaynerchuk", category: "Influencers", size: "medium" },
    { name: "Russell Brunson", category: "Influencers", size: "medium" },
    { name: "Online courses", category: "Education", size: "medium" },
    // ... more suggestions
];

const CONSULTING_BEHAVIORS = [
    "Business page admins",
    "Small business owners",
    "Engaged shoppers",
    "Facebook payments users (active)",
];
```

---

### 5.3 Copy Lab

**Purpose:** Generate, analyze, and store high-converting ad copy.

#### 5.3.1 Offer Architect

**Form Fields:**
- Offer Name
- Offer Type (Lead Magnet, Low-Ticket, High-Ticket, Webinar, Call)
- Main Headline
- Description
- Price/Investment

**Value Stack Builder:**
- Item name
- Perceived value
- Description
- Add/remove items
- Total value calculator

**Bonuses Section:**
- Bonus name
- Value
- Why it's valuable
- Time-limited toggle

**Guarantee Section:**
- Guarantee type (Money-back, Results, Satisfaction)
- Duration
- Terms
- Risk reversal messaging

**Urgency/Scarcity:**
- Type (Deadline, Limited Spots, Price Increase, Bonus Expiry)
- Specific details
- FOMO trigger language

**Transformation:**
- Before State (where they are now)
- After State (where they'll be)
- Timeframe (how long to achieve)

#### 5.3.2 Copy Generator

**Input:**
- Select Offer (from saved offers)
- Select Avatar (from saved avatars)
- Copy Length (Short, Medium, Long)
- Hook Type (Question, Bold Claim, Story, Pattern Interrupt, Statistic)
- Tone (Professional, Casual, Urgent, Empathetic)
- Funnel Stage (Cold, Warm, Hot)

**Output Generation:**
The system should generate:
- 3 Primary Text variations
- 5 Headline variations
- 3 Description variations
- CTA recommendations

**Hook Templates (Pre-loaded):**
```javascript
const HOOK_TEMPLATES = {
    question: [
        "Are you still {struggling_with_problem}?",
        "What if you could {desired_outcome} in {timeframe}?",
        "Why do most {avatar_role}s fail at {topic}?",
        "Do you ever feel like {pain_point}?",
        "What would change if you {transformation}?",
    ],
    bold_claim: [
        "I help {avatar_role}s {outcome} without {common_obstacle}",
        "{Number}% of {avatar_role}s don't know this about {topic}...",
        "The {topic} industry doesn't want you to know this...",
        "After working with {number} clients, here's what I discovered...",
        "Stop {wrong_action}. Start {right_action}.",
    ],
    story: [
        "3 years ago, I was {relatable_situation}...",
        "When I first started {journey}, I made every mistake possible...",
        "My client {name} was about to {dramatic_situation}...",
        "Nobody believed me when I said {bold_prediction}...",
        "I still remember the day I {pivotal_moment}...",
    ],
    pattern_interrupt: [
        "STOP scrolling if you're a {avatar_role}",
        "This isn't another {common_content_type}",
        "WARNING: This will change how you think about {topic}",
        "Unpopular opinion: {contrarian_view}",
        "Delete your {common_tool} right now. Here's why...",
    ],
    statistic: [
        "{percentage}% of {avatar_role}s {surprising_stat}",
        "The average {avatar_role} {concerning_stat}. Here's how to be different.",
        "We analyzed {number} {thing} and found {insight}",
        "{number} out of {number} {avatar_role}s {stat}",
        "In {timeframe}, {number} clients achieved {result}",
    ],
};

const COPY_FRAMEWORKS = {
    PAS: {
        name: "Problem-Agitate-Solution",
        structure: ["Problem", "Agitate", "Solution"],
        description: "Start with the problem, twist the knife, offer the solution"
    },
    AIDA: {
        name: "Attention-Interest-Desire-Action",
        structure: ["Attention", "Interest", "Desire", "Action"],
        description: "Grab attention, build interest, create desire, call to action"
    },
    BAB: {
        name: "Before-After-Bridge",
        structure: ["Before (current state)", "After (desired state)", "Bridge (your solution)"],
        description: "Show transformation from current to desired state"
    },
    QUEST: {
        name: "Qualify-Understand-Educate-Stimulate-Transition",
        structure: ["Qualify", "Understand", "Educate", "Stimulate", "Transition"],
        description: "Filter audience, show understanding, educate, excite, CTA"
    },
    StoryBrand: {
        name: "StoryBrand Framework",
        structure: ["Character", "Problem", "Guide", "Plan", "Call to Action", "Success", "Failure"],
        description: "Position customer as hero, you as guide"
    }
};
```

#### 5.3.3 Copy Analyzer

**Input:** Paste ad copy text

**Analysis Output:**
- **Clarity Score (1-10):** Is the message clear?
- **Emotional Trigger Score (1-10):** Does it evoke emotion?
- **Specificity Score (1-10):** Are there specific details/numbers?
- **CTA Strength (1-10):** Is the call-to-action compelling?
- **Reading Level:** Grade level of the copy
- **Word Count:** Total words
- **Overall Score:** Weighted average

**Recommendations:**
- Specific suggestions for improvement
- Missing elements
- Compliance warnings (words that might trigger ad disapproval)

**Compliance Checker:**
```javascript
const COMPLIANCE_WARNINGS = {
    personal_attributes: ["you are", "you're overweight", "you're struggling", "your debt", "your credit"],
    guarantees: ["guaranteed results", "100% guaranteed", "guaranteed to work"],
    exaggerated_claims: ["lose 30 pounds", "make $10,000", "get rich", "overnight success"],
    medical_claims: ["cure", "treat", "diagnose", "prevent disease"],
    before_after: ["before and after", "transformation photo"],
};
```

#### 5.3.4 Swipe File

**Features:**
- Save competitor/inspiration ads
- Screenshot upload
- Tag by hook type, industry, format
- Notes on why it works
- Search and filter
- Quick-use button to use as inspiration

---

### 5.4 Creative Command Center

**Route:** `/creative`

**Sub-routes:**
- `/creative/briefs` - List briefs
- `/creative/briefs/new` - Create brief
- `/creative/briefs/:id` - Edit/view brief

**Brief Generator Form:**
1. Basic info (name, format type, objective)
2. Hook section (concept, text overlay)
3. Body concept
4. CTA concept
5. Visual direction (style, colors, typography)
6. Video-specific (scene breakdown, length, music)
7. Carousel-specific (slide breakdown)
8. Technical specs (dimensions, format)
9. References

### Module 5: Campaigns

**Route:** `/campaigns`

**Sub-routes:**
- `/campaigns` - List all campaigns
- `/campaigns/new` - Campaign builder wizard
- `/campaigns/:id` - Campaign details
- `/campaigns/:id/ads` - Manage ads in campaign

**Campaign Builder:**
1. Basic info (name, objective, funnel stage)
2. Link to offer and targeting
3. Budget setup (CBO/ABO, daily/lifetime)
4. Ad set structure
5. Launch checklist

**Funnel Templates (pre-loaded):**
```typescript
export const FUNNEL_TEMPLATES = {
  lead_magnet_webinar: {
    name: "Lead Magnet → Webinar → Offer",
    stages: [
      { name: "Lead Magnet", objective: "leads", budget_pct: 40 },
      { name: "Webinar Registration", objective: "leads", budget_pct: 30 },
      { name: "Sales Conversion", objective: "conversions", budget_pct: 30 },
    ],
  },
  direct_to_call: {
    name: "Direct to Strategy Call",
    stages: [
      { name: "Awareness", objective: "video_views", budget_pct: 30 },
      { name: "Consideration", objective: "traffic", budget_pct: 30 },
      { name: "Conversion", objective: "leads", budget_pct: 40 },
    ],
  },
};
```

### Module 6: Analytics

**Route:** `/analytics`

**Sub-routes:**
- `/analytics` - Performance dashboard
- `/analytics/input` - Log metrics
- `/analytics/diagnose` - Diagnostic tool
- `/analytics/benchmarks` - Benchmark reference
- `/analytics/review` - Weekly review

**Metrics Input Form:**
- Select campaign
- Select date
- Input: spend, impressions, reach, clicks, link_clicks, leads, purchases, revenue
- Auto-calculate: CPM, CPC, CTR, CPL, CPA, ROAS

**Diagnostic Engine Logic:**
```typescript
export const DIAGNOSTIC_RULES = {
  high_cpm: {
    condition: (metrics) => metrics.cpm > 30,
    diagnosis: "CPM is high - targeting may be too narrow or competitive",
    recommendations: ["Broaden targeting", "Test new interests", "Check relevance score"],
  },
  low_ctr: {
    condition: (metrics) => metrics.ctr < 0.8,
    diagnosis: "CTR is low - ad isn't compelling enough",
    recommendations: ["Test new hooks", "Try different creative formats", "Check audience-message match"],
  },
  high_cpl: {
    condition: (metrics) => metrics.cpl > 50,
    diagnosis: "CPL is high - check funnel for bottlenecks",
    recommendations: ["Diagnose: Is it CPM, CTR, or landing page CVR?", "Fix weakest link first"],
  },
};
```

**Benchmarks for Consulting/Courses:**
```typescript
export const BENCHMARKS = {
  lead_magnet: { cpm: [10, 25], ctr: [0.8, 2.0], cpl: [5, 25] },
  webinar: { cpm: [15, 35], ctr: [0.5, 1.5], cpl: [15, 50] },
  strategy_call: { cpm: [20, 50], ctr: [0.3, 1.0], cpl: [50, 200] },
  course: { cpm: [15, 40], ctr: [0.5, 1.5], roas: [2, 5] },
};
```

### Module 7: Testing

**Route:** `/testing`

**Sub-routes:**
- `/testing` - Active tests
- `/testing/new` - Create test
- `/testing/:id` - Test details
- `/testing/learnings` - Learning library

**Test Hypothesis Format:**
"IF we change [VARIABLE] FROM [CONTROL] TO [VARIANT], THEN we expect [METRIC] to [INCREASE/DECREASE] by [TARGET%] BECAUSE [RATIONALE]"

**Significance Calculator:**
```typescript
export function calculateSignificance(control, variant) {
  const p1 = control.conversions / control.traffic;
  const p2 = variant.conversions / variant.traffic;
  const pooledP = (control.conversions + variant.conversions) / (control.traffic + variant.traffic);
  const se = Math.sqrt(pooledP * (1 - pooledP) * (1/control.traffic + 1/variant.traffic));
  const z = (p2 - p1) / se;
  
  let confidence;
  if (Math.abs(z) >= 2.58) confidence = 99;
  else if (Math.abs(z) >= 1.96) confidence = 95;
  else if (Math.abs(z) >= 1.65) confidence = 90;
  else confidence = Math.round(Math.abs(z) / 1.96 * 95);
  
  return {
    controlRate: (p1 * 100).toFixed(2),
    variantRate: (p2 * 100).toFixed(2),
    lift: (((p2 - p1) / p1) * 100).toFixed(1),
    confidence,
    winner: confidence >= 95 ? (p2 > p1 ? 'variant' : 'control') : 'inconclusive',
  };
}
```

### Module 8: Library

**Route:** `/library`

**Sub-routes:**
- `/library/campaigns` - Campaign archive
- `/library/winners` - Winner library
- `/library/failures` - Failure log

## UI/UX Requirements

### Design System

**Colors:**
- Primary: Indigo (#4F46E5)
- Success: Green (#22C55E)
- Warning: Yellow (#EAB308)
- Danger: Red (#EF4444)
- Neutrals: Gray scale

**Typography:**
- Font: Inter
- Headings: 600-700 weight
- Body: 400-500 weight

### Layout

**Sidebar (Left - Collapsible):**
- Logo
- Dashboard
- Audience
- Copy Lab
- Creative
- Campaigns
- Analytics
- Testing
- Library
- Settings
- User (bottom)

**Main Content:**
- Page header with title + actions
- Content area
- Responsive (mobile: bottom nav)

## Development Instructions

### Phase 1: Start Here

1. **Initialize project:**
```bash
npm create vite@latest adpilot -- --template react-ts
cd adpilot
npm install
```

2. **Install dependencies:**
```bash
npm install @supabase/supabase-js @tanstack/react-query zustand react-router-dom react-hook-form @hookform/resolvers zod recharts lucide-react clsx tailwind-merge
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Install Shadcn/ui:**
```bash
npx shadcn@latest init
npx shadcn@latest add button card input select textarea dialog tabs table badge progress toast dropdown-menu tooltip form label
```

4. **Set up Supabase:**
- Create project at supabase.com
- Run the database schema
- Enable RLS and create policies
- Get API keys

5. **Create .env:**
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### Build Order

1. **Foundation:** Project setup, Supabase client, auth, layout, routing
2. **Dashboard:** Metric cards, campaign list, quick actions
3. **Audience:** Avatar builder, targeting planner
4. **Copy Lab:** Offer architect, copy generator, analyzer
5. **Creative:** Brief generator
6. **Campaigns:** Campaign builder, launch checklist
7. **Analytics:** Metrics tracker, diagnostic engine
8. **Testing:** Test planner, significance calculator
9. **Library:** Archives

### Code Quality Standards

- Use TypeScript strictly (no `any`)
- Create reusable components
- Use custom hooks for data fetching
- Handle loading and error states
- Mobile-responsive design
- Accessible (proper labels, ARIA)

## How to Work With Me

1. **Start with Phase 1** - Get the foundation working first
2. **One module at a time** - Complete each module before moving on
3. **Show me the code** - I'll review and we'll iterate
4. **Ask questions** - If anything is unclear, ask before building

## Ready?

Let's start! Please begin with:

1. Project initialization and setup
2. Supabase client configuration
3. Authentication (signup, login, logout)
4. Main layout with sidebar navigation
5. Basic routing structure
6. Dashboard page shell

Show me the code for these foundational pieces first, and we'll build from there.

# END PROMPTtopic}?",
        "Do you ever feel like {pain_point}?",
        "What would change if you {transformation}?",
    ],
    bold_claim: [
        "I help {avatar_role}s {outcome} without {common_obstacle}",
        "{Number}% of {avatar_role}s don't know this about {topic}...",
        "The {topic} industry doesn't want you to know this...",
        "After working with {number} clients, here's what I discovered...",
        "Stop {wrong_action}. Start {right_action}.",
    ],
    story: [
        "3 years ago, I was {relatable_situation}...",
        "When I first started {journey}, I made every mistake possible...",
        "My client {name} was about to {dramatic_situation}...",
        "Nobody believed me when I said {bold_prediction}...",
        "I still remember the day I {pivotal_moment}...",
    ],
    pattern_interrupt: [
        "STOP scrolling if you're a {avatar_role}",
        "This isn't another {common_content_type}",
        "WARNING: This will change how you think about {topic}",
        "Unpopular opinion: {contrarian_view}",
        "Delete your {common_tool} right now. Here's why...",
    ],
    statistic: [
        "{percentage}% of {avatar_role}s {surprising_stat}",
        "The average {avatar_role} {concerning_stat}. Here's how to be different.",
        "We analyzed {number} {thing} and found {insight}",
        "{number} out of {number} {avatar_role}s {stat}",
        "In {timeframe}, {number} clients achieved {result}",
    ],
};

const COPY_FRAMEWORKS = {
    PAS: {
        name: "Problem-Agitate-Solution",
        structure: ["Problem", "Agitate", "Solution"],
        description: "Start with the problem, twist the knife, offer the solution"
    },
    AIDA: {
        name: "Attention-Interest-Desire-Action",
        structure: ["Attention", "Interest", "Desire", "Action"],
        description: "Grab attention, build interest, create desire, call to action"
    },
    BAB: {
        name: "Before-After-Bridge",
        structure: ["Before (current state)", "After (desired state)", "Bridge (your solution)"],
        description: "Show transformation from current to desired state"
    },
    QUEST: {
        name: "Qualify-Understand-Educate-Stimulate-Transition",
        structure: ["Qualify", "Understand", "Educate", "Stimulate", "Transition"],
        description: "Filter audience, show understanding, educate, excite, CTA"
    },
    StoryBrand: {
        name: "StoryBrand Framework",
        structure: ["Character", "Problem", "Guide", "Plan", "Call to Action", "Success", "Failure"],
        description: "Position customer as hero, you as guide"
    }
};
```

#### 5.3.3 Copy Analyzer

**Input:** Paste ad copy text

**Analysis Output:**
- **Clarity Score (1-10):** Is the message clear?
- **Emotional Trigger Score (1-10):** Does it evoke emotion?
- **Specificity Score (1-10):** Are there specific details/numbers?
- **CTA Strength (1-10):** Is the call-to-action compelling?
- **Reading Level:** Grade level of the copy
- **Word Count:** Total words
- **Overall Score:** Weighted average

**Recommendations:**
- Specific suggestions for improvement
- Missing elements
- Compliance warnings (words that might trigger ad disapproval)

**Compliance Checker:**
```javascript
const COMPLIANCE_WARNINGS = {
    personal_attributes: ["you are", "you're overweight", "you're struggling", "your debt", "your credit"],
    guarantees: ["guaranteed results", "100% guaranteed", "guaranteed to work"],
    exaggerated_claims: ["lose 30 pounds", "make $10,000", "get rich", "overnight success"],
    medical_claims: ["cure", "treat", "diagnose", "prevent disease"],
    before_after: ["before and after", "transformation photo"],
};
```

#### 5.3.4 Swipe File

**Features:**
- Save competitor/inspiration ads
- Screenshot upload
- Tag by hook type, industry, format
- Notes on why it works
- Search and filter
- Quick-use button to use as inspiration

---

### 5.4 Creative Command Center

**Purpose:** Plan and brief creative assets for your ads.

#### 5.4.1 Creative Brief Generator

**Basic Information:**
- Brief Name
- Format Type (Static, Carousel, Video, UGC-style, Story, Reel)
- Campaign/Offer Link
- Target Audience (link to avatar)

**Objective & Message:**
- Primary objective
- Key message (one sentence)
- Secondary messages

**Structure - Static/Carousel:**
- Hook (what stops the scroll)
- Hook text overlay
- Body concept
- CTA concept
- For carousel: slide-by-slide breakdown

**Structure - Video:**
- Total length target
- Scene-by-scene breakdown:
  - Scene number
  - Duration (seconds)
  - Visual description
  - Text overlay
  - Audio/voiceover notes
- Music/vibe suggestions

**Visual Direction:**
- Style (Professional, Casual, Bold, Minimal, UGC)
- Color palette picker
- Typography style
- Reference images/links
- Brand guidelines notes

**Technical Specifications:**
- Dimensions (preset options):
  - 1:1 Feed (1080x1080)
  - 4:5 Feed (1080x1350)
  - 9:16 Stories/Reels (1080x1920)
  - 16:9 Landscape (1920x1080)
- File format requirements
- Max file size

**Output:**
- Generate formatted PDF brief
- Share link
- Status tracking (Draft → In Production → Ready → Live)

#### 5.4.2 Format Recommender

**Input:**
- Campaign objective
- Funnel stage
- Budget
- Asset availability (what you can produce)

**Output:**
Recommendations with rationale:
- Recommended formats
- Best practices for each
- Example structures

**Pre-loaded Recommendations for Consulting/Courses:**
```javascript
const FORMAT_RECOMMENDATIONS = {
    TOF_awareness: {
        primary: "short_video",
        secondary: ["carousel", "ugc"],
        rationale: "Educational content builds trust with cold audiences"
    },
    TOF_lead_magnet: {
        primary: "carousel",
        secondary: ["static", "video"],
        rationale: "Carousels let you demonstrate value of lead magnet"
    },
    MOF_nurture: {
        primary: "video_testimonial",
        secondary: ["case_study_carousel", "behind_scenes"],
        rationale: "Social proof warms up interested prospects"
    },
    BOF_conversion: {
        primary: "direct_offer_static",
        secondary: ["urgency_video", "testimonial"],
        rationale: "Clear offer presentation with strong CTA"
    }
};

const VIDEO_STRUCTURES = {
    talking_head: {
        name: "Talking Head",
        ideal_for: ["authority building", "education", "personal connection"],
        structure: ["Hook (3s)", "Intro (5s)", "Main points (30-45s)", "CTA (5s)"],
        tips: ["Make eye contact", "Vary energy", "Use pattern interrupts"]
    },
    testimonial: {
        name: "Customer Testimonial",
        ideal_for: ["social proof", "objection handling", "BOF"],
        structure: ["Before state", "Discovery moment", "Experience", "Results", "Recommendation"],
        tips: ["Let them be natural", "Include specific results", "Show transformation"]
    },
    tutorial: {
        name: "Quick Tutorial/Value",
        ideal_for: ["TOF awareness", "lead magnets", "building trust"],
        structure: ["Promise hook", "Step 1-3", "Result preview", "CTA for more"],
        tips: ["Keep it actionable", "One small win", "Tease bigger framework"]
    },
    ugc_style: {
        name: "UGC Style",
        ideal_for: ["authenticity", "younger audiences", "trending feel"],
        structure: ["Native hook", "Story/problem", "Discovery", "Results", "Soft CTA"],
        tips: ["Lo-fi production", "Phone-recorded feel", "Authentic language"]
    }
};
```

#### 5.4.3 Creative Testing Matrix

**Purpose:** Plan which creative variables to test.

**Variables to Test:**
- Hook variations
- Visual style
- Format (static vs video vs carousel)
- Color schemes
- Text overlay vs clean
- Face vs no face
- UGC vs produced

**Matrix Builder:**
- Select variable to test
- Define control
- Define variants
- Link to test tracker

---

### 5.5 Campaign Architecture Studio

**Purpose:** Plan and structure campaigns properly before building in Ads Manager.

#### 5.5.1 Funnel Mapper

**Visual Funnel Builder:**

```
┌─────────────────────────────────────────┐
│           AWARENESS (TOF)               │
│  Objective: Reach / Brand Awareness     │
│  Content: Educational, entertaining     │
│  Audience: Cold, broad interests        │
│  Budget: 20-30% of total               │
└────────────────────┬────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│         CONSIDERATION (MOF)             │
│  Objective: Traffic / Engagement        │
│  Content: Case studies, testimonials    │
│  Audience: Video viewers, engagers      │
│  Budget: 20-30% of total               │
└────────────────────┬────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│          CONVERSION (BOF)               │
│  Objective: Leads / Conversions         │
│  Content: Direct offers, urgency        │
│  Audience: Website visitors, warm       │
│  Budget: 40-50% of total               │
└─────────────────────────────────────────┘
```

**Funnel Templates (Pre-loaded):**
```javascript
const FUNNEL_TEMPLATES = {
    lead_magnet_webinar: {
        name: "Lead Magnet → Webinar → Offer",
        stages: [
            {
                name: "Lead Magnet Acquisition",
                objective: "leads",
                content: "Lead magnet promotion",
                audiences: ["cold_interests", "lookalikes"],
                budget_pct: 40
            },
            {
                name: "Webinar Registration",
                objective: "leads",
                content: "Webinar invitation",
                audiences: ["lead_magnet_downloaders", "email_list"],
                budget_pct: 30
            },
            {
                name: "Sales Conversion",
                objective: "conversions",
                content: "Direct offer, testimonials",
                audiences: ["webinar_attendees", "sales_page_visitors"],
                budget_pct: 30
            }
        ]
    },
    direct_to_call: {
        name: "Direct to Strategy Call",
        stages: [
            {
                name: "Awareness",
                objective: "video_views",
                content: "Value content, expertise showcase",
                audiences: ["cold_interests", "lookalikes"],
                budget_pct: 30
            },
            {
                name: "Consideration",
                objective: "traffic",
                content: "Case studies, testimonials",
                audiences: ["video_viewers_75", "engagers"],
                budget_pct: 30
            },
            {
                name: "Conversion",
                objective: "leads",
                content: "Call booking offer",
                audiences: ["website_visitors", "warm_engagers"],
                budget_pct: 40
            }
        ]
    },
    course_launch: {
        name: "Course Launch Sequence",
        stages: [
            {
                name: "Pre-launch Awareness",
                objective: "engagement",
                content: "Launch content, value posts",
                audiences: ["email_list", "cold_lookalikes"],
                budget_pct: 25
            },
            {
                name: "Cart Open",
                objective: "conversions",
                content: "Sales page, urgency",
                audiences: ["email_list", "engagers", "video_viewers"],
                budget_pct: 50
            },
            {
                name: "Cart Close",
                objective: "conversions",
                content: "Last chance, scarcity",
                audiences: ["sales_page_visitors", "add_to_carts"],
                budget_pct: 25
            }
        ]
    }
};
```

#### 5.5.2 Campaign Structure Builder

**Campaign Details:**
- Campaign Name (with naming convention helper)
- Objective Selection (with guidance)
- Budget Type (CBO vs ABO decision helper)
- Daily/Lifetime Budget

**Naming Convention Generator:**
```
[Objective]_[Funnel Stage]_[Audience Type]_[Date]
Example: LEADS_TOF_Interests_Jan24
```

**Ad Set Builder:**
- Ad Set Name
- Targeting (link to saved targeting strategy)
- Placement selection
- Budget allocation (if ABO)
- Schedule

**CBO vs ABO Decision Tree:**
```javascript
const BUDGET_DECISION = {
    use_cbo_when: [
        "Testing multiple ad sets against each other",
        "Want Meta to optimize automatically",
        "Budget is limited and need efficiency",
        "Ad sets have similar audience sizes"
    ],
    use_abo_when: [
        "Need guaranteed spend per audience",
        "Testing specific targeting strategies",
        "Audiences are very different sizes",
        "Want full control over budget distribution"
    ]
};
```

#### 5.5.3 Budget Calculator

**Inputs:**
- Monthly/Weekly budget
- Number of campaigns
- Funnel stage allocation
- Test budget allocation

**Outputs:**
- Recommended daily budgets per campaign
- Minimum viable test budget
- Estimated results (based on benchmarks)
- Scaling roadmap

**Benchmark Calculations:**
```javascript
const CONSULTING_BENCHMARKS = {
    lead_magnet: {
        cpm_range: [10, 25],
        ctr_range: [0.8, 2.0],
        conversion_rate_range: [20, 40], // Landing page
        cpl_range: [5, 25]
    },
    webinar_registration: {
        cpm_range: [15, 35],
        ctr_range: [0.5, 1.5],
        conversion_rate_range: [15, 35],
        cpl_range: [15, 50]
    },
    strategy_call: {
        cpm_range: [20, 50],
        ctr_range: [0.3, 1.0],
        conversion_rate_range: [5, 20],
        cpl_range: [50, 200]
    },
    course_sale: {
        cpm_range: [15, 40],
        ctr_range: [0.5, 1.5],
        conversion_rate_range: [1, 5],
        cpa_range: [100, 500]
    }
};
```

#### 5.5.4 Launch Checklist

**Pre-Launch Verification:**
- [ ] Pixel installed and verified
- [ ] Conversion events set up
- [ ] UTM parameters configured
- [ ] Landing page tested on mobile
- [ ] Landing page load speed checked
- [ ] Lead form/checkout working
- [ ] Email automation connected
- [ ] Exclusion audiences added
- [ ] Ad copy compliance checked
- [ ] Creative specs verified
- [ ] Budget confirmed
- [ ] Schedule set correctly

**Checklist Features:**
- Save checklist per campaign
- Mark items complete
- Add notes
- Flag issues

---

### 5.6 Performance Analytics Dashboard

**Purpose:** Track, analyze, and interpret campaign performance.

#### 5.6.1 Campaign Tracker

**Metrics Input Form:**
- Select Campaign
- Date/Period
- Input fields for all key metrics:
  - Spend
  - Impressions
  - Reach
  - Clicks
  - Link Clicks
  - Leads/Conversions
  - Revenue

**Auto-Calculated Metrics:**
- CPM (Cost per 1000 impressions)
- CPC (Cost per click)
- CTR (Click-through rate)
- CPL/CPA (Cost per lead/acquisition)
- ROAS (Return on ad spend)
- Frequency

**Visualization:**
- Line charts for trends over time
- Bar charts for comparison
- Metric cards with period-over-period change

#### 5.6.2 Diagnostic Engine

**Input:** Campaign metrics

**Output:** Diagnosis and recommendations

**Diagnostic Logic:**
```javascript
const DIAGNOSTIC_RULES = {
    high_cpm: {
        threshold: { above: 30 }, // $30 CPM for consulting
        diagnosis: "Your CPM is higher than average. This could indicate:",
        causes: [
            "Audience is too narrow",
            "High competition for this audience",
            "Poor relevance score",
            "Saturated audience"
        ],
        recommendations: [
            "Broaden targeting",
            "Test new interest combinations",
            "Improve ad relevance",
            "Test new audiences entirely"
        ]
    },
    low_ctr: {
        threshold: { below: 0.8 }, // 0.8% CTR
        diagnosis: "Your CTR is below average. Your ad isn't compelling enough.",
        causes: [
            "Weak hook",
            "Boring creative",
            "Audience mismatch",
            "Unclear value proposition"
        ],
        recommendations: [
            "Test new hooks",
            "Try different creative formats",
            "Verify audience-message match",
            "Make the benefit clearer"
        ]
    },
    high_cpc: {
        threshold: { above: 3 }, // $3 CPC
        diagnosis: "Your CPC is high. You're paying too much for each click.",
        causes: [
            "Low CTR (not compelling)",
            "High competition",
            "Wrong placements"
        ],
        recommendations: [
            "Improve CTR first",
            "Test automatic placements",
            "Try different ad formats"
        ]
    },
    low_conversion_rate: {
        threshold: { below: 15 }, // 15% landing page conversion
        diagnosis: "People are clicking but not converting. Landing page issue.",
        causes: [
            "Message mismatch between ad and landing page",
            "Landing page too slow",
            "Offer not compelling",
            "Too much friction"
        ],
        recommendations: [
            "Ensure message match",
            "Speed up landing page",
            "Strengthen offer",
            "Simplify form/reduce steps"
        ]
    },
    high_cpl: {
        threshold: { above: 50 }, // $50 CPL for lead magnet
        diagnosis: "Your cost per lead is high.",
        causes: [
            "Check CTR first - if low, fix ad",
            "Check conversion rate - if low, fix landing page",
            "Check CPM - if high, fix targeting"
        ],
        recommendations: [
            "Diagnose the funnel step by step",
            "Calculate: CPL = CPM ÷ CTR ÷ CVR",
            "Fix the weakest link first"
        ]
    },
    good_performance: {
        diagnosis: "Campaign is performing well!",
        recommendations: [
            "Consider scaling budget by 20%",
            "Duplicate winning ad sets",
            "Expand to lookalike audiences",
            "Document what's working"
        ]
    }
};

// Funnel diagnosis calculator
function diagnoseFunnel(metrics) {
    const { cpm, ctr, landing_page_cvr, cpl } = metrics;
    
    // Calculate contribution to CPL
    const cpm_contribution = cpm / 10; // CPM impact
    const ctr_contribution = 1 / (ctr / 100); // CTR impact
    const cvr_contribution = 1 / (landing_page_cvr / 100); // CVR impact
    
    // Find biggest bottleneck
    const bottlenecks = [
        { name: 'CPM (Targeting)', value: cpm_contribution, metric: 'cpm' },
        { name: 'CTR (Ad Creative)', value: ctr_contribution, metric: 'ctr' },
        { name: 'Conversion Rate (Landing Page)', value: cvr_contribution, metric: 'cvr' }
    ].sort((a, b) => b.value - a.value);
    
    return {
        primary_bottleneck: bottlenecks[0],
        all_bottlenecks: bottlenecks,
        formula_breakdown: `CPL = $${cpm}/1000 ÷ ${ctr}% ÷ ${landing_page_cvr}% = $${cpl}`
    };
}
```

#### 5.6.3 Benchmark Reference

**Industry Benchmarks Display:**

| Metric | Poor | Average | Good | Great |
|--------|------|---------|------|-------|
| CPM | >$40 | $20-40 | $10-20 | <$10 |
| CTR | <0.5% | 0.5-1% | 1-2% | >2% |
| CPC | >$3 | $1-3 | $0.50-1 | <$0.50 |
| Lead Magnet CPL | >$30 | $15-30 | $5-15 | <$5 |
| Webinar CPL | >$60 | $30-60 | $15-30 | <$15 |
| Call Booking CPL | >$150 | $75-150 | $50-75 | <$50 |
| Course ROAS | <1x | 1-2x | 2-4x | >4x |

**Benchmark Context:**
- Industry notes
- Funnel stage adjustments
- Seasonal factors

#### 5.6.4 Weekly Review Template

**Structured Review Form:**

**1. Performance Summary**
- Total spend this week
- Total leads/conversions
- Average CPL/CPA
- ROAS

**2. What Worked**
- Top performing campaign
- Top performing ad
- Top performing audience
- Key insight

**3. What Didn't Work**
- Underperforming campaigns
- Failed tests
- Wasted spend areas

**4. Key Learnings**
- Audience insights
- Creative insights
- Offer insights

**5. Action Items for Next Week**
- Tests to run
- Changes to make
- Budget adjustments
- New campaigns to launch

**6. Budget Reallocation**
- Where to increase
- Where to decrease
- Where to pause

---

### 5.7 Testing Laboratory

**Purpose:** Run systematic tests and document learnings.

#### 5.7.1 Test Planner

**Hypothesis Builder:**
```
IF we change [VARIABLE]
FROM [CONTROL]
TO [VARIANT]
THEN we expect [PRIMARY METRIC]
TO [INCREASE/DECREASE] BY [TARGET %]
BECAUSE [RATIONALE]
```

**Test Types:**
- Hook test (different opening lines)
- Creative format test (image vs video vs carousel)
- Audience test (interests vs lookalikes)
- Copy length test (short vs long)
- Offer test (different lead magnets)
- Landing page test (requires external tool)

**Test Priority Matrix:**
| Variable | Potential Impact | Effort | Priority Score |
|----------|------------------|--------|----------------|
| Hook | High | Low | 1 |
| Creative format | High | Medium | 2 |
| Audience | High | Low | 1 |
| Copy body | Medium | Low | 3 |
| CTA | Medium | Low | 3 |
| Offer | Very High | High | 2 |

#### 5.7.2 Test Tracker

**Active Test Card:**
- Test name
- Hypothesis
- Variable being tested
- Control vs Variant(s)
- Start date
- Planned duration
- Minimum spend/sample
- Current results (if running)
- Days remaining

**Test Status:**
- Planning
- Running
- Analyzing
- Completed
- Inconclusive

#### 5.7.3 Statistical Significance Calculator

**Inputs:**
- Control: Conversions, Traffic
- Variant: Conversions, Traffic

**Output:**
- Conversion rate for each
- Lift percentage
- Statistical significance percentage
- Recommendation (winner/continue testing/inconclusive)

**Simple Significance Logic:**
```javascript
function calculateSignificance(control, variant) {
    const { conversions: c1, traffic: n1 } = control;
    const { conversions: c2, traffic: n2 } = variant;
    
    const p1 = c1 / n1;
    const p2 = c2 / n2;
    
    const pooledP = (c1 + c2) / (n1 + n2);
    const se = Math.sqrt(pooledP * (1 - pooledP) * (1/n1 + 1/n2));
    
    const z = (p2 - p1) / se;
    
    // Convert Z-score to confidence percentage
    // Simplified lookup
    let confidence;
    if (Math.abs(z) >= 2.58) confidence = 99;
    else if (Math.abs(z) >= 1.96) confidence = 95;
    else if (Math.abs(z) >= 1.65) confidence = 90;
    else confidence = Math.round((1 - 2 * (1 - normalCDF(Math.abs(z)))) * 100);
    
    const lift = ((p2 - p1) / p1 * 100).toFixed(1);
    
    return {
        controlRate: (p1 * 100).toFixed(2),
        variantRate: (p2 * 100).toFixed(2),
        lift: lift,
        confidence: confidence,
        winner: confidence >= 95 ? (p2 > p1 ? 'variant' : 'control') : 'inconclusive',
        recommendation: confidence >= 95 
            ? `Variant ${p2 > p1 ? 'wins' : 'loses'} with ${confidence}% confidence` 
            : `Continue testing (${confidence}% confidence)`
    };
}
```

#### 5.7.4 Learning Library

**Learning Entry:**
- Title
- Category (Audience, Copy, Creative, Offer, Campaign)
- Description
- Source (Test, Observation, External)
- Link to test (if applicable)
- Impact level (High, Medium, Low)
- Tags
- Date discovered

**Features:**
- Search learnings
- Filter by category
- View all learnings for an avatar/campaign
- Export learnings

---

### 5.8 Campaign Library

**Purpose:** Archive and reference all campaigns, winners, and failures.

#### 5.8.1 Campaign Archive

**Archive Entry:**
- Campaign details
- Date range
- Total spend
- Total results
- Key metrics
- All ads used
- Targeting used
- Learnings

**Filters:**
- By status
- By objective
- By date range
- By performance (winners only)

#### 5.8.2 Winner Library

**Winner Categories:**
- Winning Ads (by CTR, CPL, ROAS)
- Winning Audiences
- Winning Hooks
- Winning Offers

**Winner Card:**
- What it is
- Key metrics achieved
- Why it worked (analysis)
- When to use again

#### 5.8.3 Failure Log

**Failure Entry:**
- What was tested
- What we expected
- What actually happened
- Why it failed (analysis)
- Lesson learned
- How to avoid in future

---

## 6. UI/UX Specifications

### 6.1 Design System

**Color Palette:**
```css
:root {
    /* Primary */
    --primary-50: #EEF2FF;
    --primary-100: #E0E7FF;
    --primary-500: #6366F1;
    --primary-600: #4F46E5;
    --primary-700: #4338CA;
    
    /* Success */
    --success-500: #22C55E;
    --success-600: #16A34A;
    
    /* Warning */
    --warning-500: #EAB308;
    --warning-600: #CA8A04;
    
    /* Danger */
    --danger-500: #EF4444;
    --danger-600: #DC2626;
    
    /* Neutral */
    --gray-50: #F9FAFB;
    --gray-100: #F3F4F6;
    --gray-200: #E5E7EB;
    --gray-300: #D1D5DB;
    --gray-400: #9CA3AF;
    --gray-500: #6B7280;
    --gray-600: #4B5563;
    --gray-700: #374151;
    --gray-800: #1F2937;
    --gray-900: #111827;
}
```

**Typography:**
- Font Family: Inter (Google Fonts)
- Headings: 600-700 weight
- Body: 400-500 weight
- Monospace: JetBrains Mono (for metrics)

**Spacing Scale:**
- Base unit: 4px
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

**Border Radius:**
- Small: 4px
- Medium: 8px
- Large: 12px
- XL: 16px

### 6.2 Component Library

Use Shadcn/ui components:
- Button
- Card
- Input
- Select
- Textarea
- Dialog/Modal
- Tabs
- Table
- Badge
- Progress
- Toast notifications
- Dropdown menu
- Tooltip
- Form components

### 6.3 Layout Structure

**Sidebar Navigation:**
- Logo/Brand
- Dashboard
- Audience Hub
- Copy Lab
- Creative Studio
- Campaigns
- Analytics
- Testing
- Library
- Settings
- User menu (bottom)

**Main Content Area:**
- Page header with title and actions
- Main content
- Responsive grid

**Mobile:**
- Collapsible sidebar → bottom nav
- Stack cards vertically
- Touch-friendly inputs

### 6.4 Dashboard Layout

```
┌────────────────────────────────────────────────────────────────┐
│ [Logo] AdPilot                              [Search] [Profile] │
├──────────┬─────────────────────────────────────────────────────┤
│          │                                                     │
│ Dashboard│  Good morning, [Name]! 👋                          │
│          │                                                     │
│ Audience │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│          │  │  Spend  │ │  Leads  │ │   CPL   │ │  ROAS   │   │
│ Copy Lab │  │ $2,450  │ │   47    │ │ $52.13  │ │  2.8x   │   │
│          │  │  ↑ 12%  │ │  ↑ 23%  │ │  ↓ 8%   │ │ ↑ 15%   │   │
│ Creative │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
│          │                                                     │
│ Campaigns│  ┌─────────────────────┐ ┌─────────────────────┐   │
│          │  │ Active Campaigns    │ │ Quick Actions       │   │
│ Analytics│  │                     │ │                     │   │
│          │  │ • Course Launch     │ │ [+ Audience]        │   │
│ Testing  │  │   ● Running $850/d  │ │ [+ Copy]            │   │
│          │  │ • Retargeting       │ │ [+ Brief]           │   │
│ Library  │  │   ● Running $150/d  │ │ [+ Metrics]         │   │
│          │  │ • Lead Magnet       │ │                     │   │
│ ──────── │  │   ○ Paused          │ │                     │   │
│          │  └─────────────────────┘ └─────────────────────┘   │
│ Settings │                                                     │
│          │  ┌─────────────────────┐ ┌─────────────────────┐   │
│          │  │ Active Tests        │ │ This Week's Insight │   │
│ [User]   │  │                     │ │                     │   │
│          │  │ Hook Test - Day 4/7 │ │ 💡 Video ads are    │   │
│          │  │ Audience Test - 6/7 │ │ outperforming       │   │
│          │  │                     │ │ static by 34%       │   │
│          │  └─────────────────────┘ └─────────────────────┘   │
└──────────┴─────────────────────────────────────────────────────┘
```

---

## 7. Development Phases

### Phase 1: Foundation (Week 1-2)
- Project setup (Vite + React + TypeScript + Tailwind)
- Supabase setup and database schema
- Authentication (login, signup, logout)
- Layout components (sidebar, header, page wrapper)
- Dashboard shell with placeholder data
- Basic routing

### Phase 2: Audience Module (Week 3-4)
- Customer Avatar Builder (full CRUD)
- Avatar form with all sections
- Targeting Strategy Planner
- Interest suggestions data
- Exclusion matrix
- Connect avatars to targeting strategies

### Phase 3: Copy Lab (Week 5-6)
- Offer Architect (full CRUD)
- Ad Copy Generator with templates
- Copy Analyzer with scoring
- Swipe File storage
- Hook library with pre-loaded templates

### Phase 4: Creative & Campaigns (Week 7-8)
- Creative Brief Generator
- Format Recommender
- Campaign Builder
- Funnel Mapper with templates
- Budget Calculator
- Launch Checklist

### Phase 5: Analytics (Week 9-10)
- Campaign Tracker (metrics input)
- Auto-calculations
- Charts and visualizations
- Diagnostic Engine
- Benchmark Reference
- Weekly Review template

### Phase 6: Testing & Library (Week 11-12)
- Test Planner and Tracker
- Significance Calculator
- Learning Library
- Campaign Archive
- Winner/Failure logs
- Search and filtering

### Phase 7: Polish & Launch (Week 13-14)
- UI polish and consistency
- Mobile responsiveness
- Performance optimization
- Bug fixes
- Documentation
- Deployment

---

## 8. Success Metrics

### 8.1 Product Metrics
- User engagement (daily active usage)
- Feature adoption (which modules used most)
- Data completeness (% of campaigns fully tracked)
- Test completion rate

### 8.2 Business Outcome Metrics (for users)
- Reduction in wasted ad spend
- Improvement in CPL/CPA over time
- Increase in ROAS
- Number of successful tests run

---

## 9. Future Enhancements

### 9.1 Phase 2 Features
- Team member access and roles
- Meta Marketing API integration (auto-pull metrics)
- AI-powered copy generation
- AI-powered creative analysis
- Automated insights and alerts
- Email/Slack notifications

### 9.2 Phase 3 Features
- White-label for agencies
- Client reporting dashboards
- Multi-brand management
- Advanced attribution
- Integration with other ad platforms (Google, TikTok, LinkedIn)

---

## 10. Glossary

| Term | Definition |
|------|------------|
| CPM | Cost per 1,000 impressions |
| CPC | Cost per click |
| CTR | Click-through rate (clicks ÷ impressions × 100) |
| CPL | Cost per lead |
| CPA | Cost per acquisition/action |
| ROAS | Return on ad spend (revenue ÷ spend) |
| TOF | Top of funnel (cold audience) |
| MOF | Middle of funnel (warm audience) |
| BOF | Bottom of funnel (hot audience) |
| CBO | Campaign Budget Optimization |
| ABO | Ad Set Budget Optimization |
| Lookalike | Audience similar to source audience |
| Pixel | Facebook tracking code |
| UTM | URL tracking parameters |

---

*End of PRD*
