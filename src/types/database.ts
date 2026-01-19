export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          company_name: string | null
          industry: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          company_name?: string | null
          industry?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          company_name?: string | null
          industry?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      customer_avatars: {
        Row: {
          id: string
          user_id: string | null
          name: string
          age_range_start: number | null
          age_range_end: number | null
          gender: string | null
          location: string | null
          income_level: string | null
          education: string | null
          job_title: string | null
          industry: string | null
          company_size: string | null
          goals: Json
          frustrations: Json
          fears: Json
          desires: Json
          objections: Json
          where_they_hang_out: Json
          influencers_they_follow: Json
          books_podcasts: Json
          buying_triggers: Json
          phrases_they_use: Json
          pain_point_language: Json
          daily_routine: string | null
          decision_making_process: string | null
          is_primary: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          age_range_start?: number | null
          age_range_end?: number | null
          gender?: string | null
          location?: string | null
          income_level?: string | null
          education?: string | null
          job_title?: string | null
          industry?: string | null
          company_size?: string | null
          goals?: Json
          frustrations?: Json
          fears?: Json
          desires?: Json
          objections?: Json
          where_they_hang_out?: Json
          influencers_they_follow?: Json
          books_podcasts?: Json
          buying_triggers?: Json
          phrases_they_use?: Json
          pain_point_language?: Json
          daily_routine?: string | null
          decision_making_process?: string | null
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          age_range_start?: number | null
          age_range_end?: number | null
          gender?: string | null
          location?: string | null
          income_level?: string | null
          education?: string | null
          job_title?: string | null
          industry?: string | null
          company_size?: string | null
          goals?: Json
          frustrations?: Json
          fears?: Json
          desires?: Json
          objections?: Json
          where_they_hang_out?: Json
          influencers_they_follow?: Json
          books_podcasts?: Json
          buying_triggers?: Json
          phrases_they_use?: Json
          pain_point_language?: Json
          daily_routine?: string | null
          decision_making_process?: string | null
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      targeting_strategies: {
        Row: {
          id: string
          user_id: string | null
          avatar_id: string | null
          name: string
          interests: Json
          behaviors: Json
          age_min: number | null
          age_max: number | null
          genders: Json
          locations: Json
          languages: Json
          custom_audiences: Json
          lookalike_sources: Json
          exclusions: Json
          layering_notes: string | null
          performance_notes: string | null
          estimated_audience_size: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          avatar_id?: string | null
          name: string
          interests?: Json
          behaviors?: Json
          age_min?: number | null
          age_max?: number | null
          genders?: Json
          locations?: Json
          languages?: Json
          custom_audiences?: Json
          lookalike_sources?: Json
          exclusions?: Json
          layering_notes?: string | null
          performance_notes?: string | null
          estimated_audience_size?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          avatar_id?: string | null
          name?: string
          interests?: Json
          behaviors?: Json
          age_min?: number | null
          age_max?: number | null
          genders?: Json
          locations?: Json
          languages?: Json
          custom_audiences?: Json
          lookalike_sources?: Json
          exclusions?: Json
          layering_notes?: string | null
          performance_notes?: string | null
          estimated_audience_size?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      offers: {
        Row: {
          id: string
          user_id: string | null
          name: string
          offer_type: string | null
          headline: string | null
          description: string | null
          price: string | null
          value_stack: Json
          total_value: string | null
          bonuses: Json
          guarantee_type: string | null
          guarantee_details: string | null
          urgency_type: string | null
          urgency_details: string | null
          before_state: string | null
          after_state: string | null
          timeframe: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          offer_type?: string | null
          headline?: string | null
          description?: string | null
          price?: string | null
          value_stack?: Json
          total_value?: string | null
          bonuses?: Json
          guarantee_type?: string | null
          guarantee_details?: string | null
          urgency_type?: string | null
          urgency_details?: string | null
          before_state?: string | null
          after_state?: string | null
          timeframe?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          offer_type?: string | null
          headline?: string | null
          description?: string | null
          price?: string | null
          value_stack?: Json
          total_value?: string | null
          bonuses?: Json
          guarantee_type?: string | null
          guarantee_details?: string | null
          urgency_type?: string | null
          urgency_details?: string | null
          before_state?: string | null
          after_state?: string | null
          timeframe?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      ad_copy: {
        Row: {
          id: string
          user_id: string | null
          offer_id: string | null
          campaign_id: string | null
          name: string
          copy_type: string | null
          hook: string | null
          body: string | null
          cta: string | null
          full_text: string | null
          hook_type: string | null
          tone: string | null
          length: string | null
          clarity_score: number | null
          emotion_score: number | null
          cta_strength: number | null
          overall_score: number | null
          performance_notes: string | null
          is_winner: boolean
          tags: Json
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          offer_id?: string | null
          campaign_id?: string | null
          name: string
          copy_type?: string | null
          hook?: string | null
          body?: string | null
          cta?: string | null
          full_text?: string | null
          hook_type?: string | null
          tone?: string | null
          length?: string | null
          clarity_score?: number | null
          emotion_score?: number | null
          cta_strength?: number | null
          overall_score?: number | null
          performance_notes?: string | null
          is_winner?: boolean
          tags?: Json
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          offer_id?: string | null
          campaign_id?: string | null
          name?: string
          copy_type?: string | null
          hook?: string | null
          body?: string | null
          cta?: string | null
          full_text?: string | null
          hook_type?: string | null
          tone?: string | null
          length?: string | null
          clarity_score?: number | null
          emotion_score?: number | null
          cta_strength?: number | null
          overall_score?: number | null
          performance_notes?: string | null
          is_winner?: boolean
          tags?: Json
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      swipe_file: {
        Row: {
          id: string
          user_id: string | null
          source: string | null
          source_url: string | null
          screenshot_url: string | null
          primary_text: string | null
          headline: string | null
          description: string | null
          hook_type: string | null
          why_it_works: string | null
          industry: string | null
          format_type: string | null
          tags: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          source?: string | null
          source_url?: string | null
          screenshot_url?: string | null
          primary_text?: string | null
          headline?: string | null
          description?: string | null
          hook_type?: string | null
          why_it_works?: string | null
          industry?: string | null
          format_type?: string | null
          tags?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          source?: string | null
          source_url?: string | null
          screenshot_url?: string | null
          primary_text?: string | null
          headline?: string | null
          description?: string | null
          hook_type?: string | null
          why_it_works?: string | null
          industry?: string | null
          format_type?: string | null
          tags?: Json
          created_at?: string
        }
      }
      creative_briefs: {
        Row: {
          id: string
          user_id: string | null
          campaign_id: string | null
          name: string
          format_type: string | null
          objective: string | null
          target_audience: string | null
          hook_concept: string | null
          hook_text_overlay: string | null
          body_concept: string | null
          cta_concept: string | null
          visual_style: string | null
          color_palette: Json
          typography_notes: string | null
          video_length: string | null
          scene_breakdown: Json
          music_style: string | null
          carousel_slides: Json
          dimensions: string | null
          file_format: string | null
          reference_links: Json
          reference_notes: string | null
          status: string
          designer_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          campaign_id?: string | null
          name: string
          format_type?: string | null
          objective?: string | null
          target_audience?: string | null
          hook_concept?: string | null
          hook_text_overlay?: string | null
          body_concept?: string | null
          cta_concept?: string | null
          visual_style?: string | null
          color_palette?: Json
          typography_notes?: string | null
          video_length?: string | null
          scene_breakdown?: Json
          music_style?: string | null
          carousel_slides?: Json
          dimensions?: string | null
          file_format?: string | null
          reference_links?: Json
          reference_notes?: string | null
          status?: string
          designer_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          campaign_id?: string | null
          name?: string
          format_type?: string | null
          objective?: string | null
          target_audience?: string | null
          hook_concept?: string | null
          hook_text_overlay?: string | null
          body_concept?: string | null
          cta_concept?: string | null
          visual_style?: string | null
          color_palette?: Json
          typography_notes?: string | null
          video_length?: string | null
          scene_breakdown?: Json
          music_style?: string | null
          carousel_slides?: Json
          dimensions?: string | null
          file_format?: string | null
          reference_links?: Json
          reference_notes?: string | null
          status?: string
          designer_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          user_id: string | null
          name: string
          objective: string | null
          funnel_stage: string | null
          offer_id: string | null
          targeting_strategy_id: string | null
          campaign_type: string | null
          daily_budget: number | null
          total_budget: number | null
          budget_type: string | null
          start_date: string | null
          end_date: string | null
          ad_sets: Json
          status: string
          meta_campaign_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          objective?: string | null
          funnel_stage?: string | null
          offer_id?: string | null
          targeting_strategy_id?: string | null
          campaign_type?: string | null
          daily_budget?: number | null
          total_budget?: number | null
          budget_type?: string | null
          start_date?: string | null
          end_date?: string | null
          ad_sets?: Json
          status?: string
          meta_campaign_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          name?: string
          objective?: string | null
          funnel_stage?: string | null
          offer_id?: string | null
          targeting_strategy_id?: string | null
          campaign_type?: string | null
          daily_budget?: number | null
          total_budget?: number | null
          budget_type?: string | null
          start_date?: string | null
          end_date?: string | null
          ad_sets?: Json
          status?: string
          meta_campaign_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      campaign_ads: {
        Row: {
          id: string
          campaign_id: string | null
          name: string
          ad_set_name: string | null
          copy_id: string | null
          creative_brief_id: string | null
          format_type: string | null
          creative_url: string | null
          landing_page_url: string | null
          utm_parameters: Json
          status: string
          meta_ad_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          campaign_id?: string | null
          name: string
          ad_set_name?: string | null
          copy_id?: string | null
          creative_brief_id?: string | null
          format_type?: string | null
          creative_url?: string | null
          landing_page_url?: string | null
          utm_parameters?: Json
          status?: string
          meta_ad_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          campaign_id?: string | null
          name?: string
          ad_set_name?: string | null
          copy_id?: string | null
          creative_brief_id?: string | null
          format_type?: string | null
          creative_url?: string | null
          landing_page_url?: string | null
          utm_parameters?: Json
          status?: string
          meta_ad_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      campaign_metrics: {
        Row: {
          id: string
          user_id: string | null
          campaign_id: string | null
          date: string
          period_type: string
          spend: number
          impressions: number
          reach: number
          frequency: number
          clicks: number
          link_clicks: number
          leads: number
          purchases: number
          registrations: number
          add_to_carts: number
          revenue: number
          cpm: number
          cpc: number
          ctr: number
          cpl: number
          cpa: number
          roas: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          campaign_id?: string | null
          date: string
          period_type?: string
          spend?: number
          impressions?: number
          reach?: number
          frequency?: number
          clicks?: number
          link_clicks?: number
          leads?: number
          purchases?: number
          registrations?: number
          add_to_carts?: number
          revenue?: number
          cpm?: number
          cpc?: number
          ctr?: number
          cpl?: number
          cpa?: number
          roas?: number
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          campaign_id?: string | null
          date?: string
          period_type?: string
          spend?: number
          impressions?: number
          reach?: number
          frequency?: number
          clicks?: number
          link_clicks?: number
          leads?: number
          purchases?: number
          registrations?: number
          add_to_carts?: number
          revenue?: number
          cpm?: number
          cpc?: number
          ctr?: number
          cpl?: number
          cpa?: number
          roas?: number
          notes?: string | null
          created_at?: string
        }
      }
      tests: {
        Row: {
          id: string
          user_id: string | null
          campaign_id: string | null
          name: string
          hypothesis: string | null
          variable_type: string | null
          variable_details: string | null
          control_description: string | null
          control_ad_id: string | null
          variants: Json
          primary_metric: string | null
          target_improvement: number | null
          minimum_sample_size: number | null
          minimum_spend: number | null
          start_date: string | null
          planned_end_date: string | null
          actual_end_date: string | null
          status: string
          winner: string | null
          statistical_significance: number | null
          results_summary: string | null
          key_learning: string | null
          apply_to_future: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          campaign_id?: string | null
          name: string
          hypothesis?: string | null
          variable_type?: string | null
          variable_details?: string | null
          control_description?: string | null
          control_ad_id?: string | null
          variants?: Json
          primary_metric?: string | null
          target_improvement?: number | null
          minimum_sample_size?: number | null
          minimum_spend?: number | null
          start_date?: string | null
          planned_end_date?: string | null
          actual_end_date?: string | null
          status?: string
          winner?: string | null
          statistical_significance?: number | null
          results_summary?: string | null
          key_learning?: string | null
          apply_to_future?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          campaign_id?: string | null
          name?: string
          hypothesis?: string | null
          variable_type?: string | null
          variable_details?: string | null
          control_description?: string | null
          control_ad_id?: string | null
          variants?: Json
          primary_metric?: string | null
          target_improvement?: number | null
          minimum_sample_size?: number | null
          minimum_spend?: number | null
          start_date?: string | null
          planned_end_date?: string | null
          actual_end_date?: string | null
          status?: string
          winner?: string | null
          statistical_significance?: number | null
          results_summary?: string | null
          key_learning?: string | null
          apply_to_future?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      test_results: {
        Row: {
          id: string
          test_id: string | null
          variant_name: string
          spend: number
          impressions: number
          clicks: number
          conversions: number
          ctr: number
          cvr: number
          cpa: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          test_id?: string | null
          variant_name: string
          spend?: number
          impressions?: number
          clicks?: number
          conversions?: number
          ctr?: number
          cvr?: number
          cpa?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          test_id?: string | null
          variant_name?: string
          spend?: number
          impressions?: number
          clicks?: number
          conversions?: number
          ctr?: number
          cvr?: number
          cpa?: number
          created_at?: string
          updated_at?: string
        }
      }
      learnings: {
        Row: {
          id: string
          user_id: string | null
          category: string | null
          title: string
          description: string | null
          source: string | null
          test_id: string | null
          campaign_id: string | null
          impact_level: string | null
          tags: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          category?: string | null
          title: string
          description?: string | null
          source?: string | null
          test_id?: string | null
          campaign_id?: string | null
          impact_level?: string | null
          tags?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          category?: string | null
          title?: string
          description?: string | null
          source?: string | null
          test_id?: string | null
          campaign_id?: string | null
          impact_level?: string | null
          tags?: Json
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
