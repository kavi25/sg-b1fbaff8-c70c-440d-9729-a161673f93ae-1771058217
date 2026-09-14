 
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_test_applications: {
        Row: {
          analysis_results: Json | null
          analysis_status: string | null
          api_base_url: string | null
          api_documentation_url: string | null
          apis_detected: number | null
          app_file_path: string | null
          app_package_name: string | null
          app_version: string | null
          application_type: string
          authentication_required: boolean | null
          controls_detected: number | null
          created_at: string | null
          id: string
          pages_detected: number | null
          platform_version: string | null
          project_id: string
          staging_url: string | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          analysis_results?: Json | null
          analysis_status?: string | null
          api_base_url?: string | null
          api_documentation_url?: string | null
          apis_detected?: number | null
          app_file_path?: string | null
          app_package_name?: string | null
          app_version?: string | null
          application_type: string
          authentication_required?: boolean | null
          controls_detected?: number | null
          created_at?: string | null
          id?: string
          pages_detected?: number | null
          platform_version?: string | null
          project_id: string
          staging_url?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          analysis_results?: Json | null
          analysis_status?: string | null
          api_base_url?: string | null
          api_documentation_url?: string | null
          apis_detected?: number | null
          app_file_path?: string | null
          app_package_name?: string | null
          app_version?: string | null
          application_type?: string
          authentication_required?: boolean | null
          controls_detected?: number | null
          created_at?: string | null
          id?: string
          pages_detected?: number | null
          platform_version?: string | null
          project_id?: string
          staging_url?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_test_applications_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "ai_test_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_test_cases: {
        Row: {
          ai_generated: boolean | null
          created_at: string | null
          description: string | null
          expected_results: Json
          id: string
          preconditions: string | null
          priority: string | null
          project_id: string
          reviewed: boolean | null
          scenario_id: string
          status: string | null
          test_data: Json | null
          test_steps: Json
          title: string
          updated_at: string | null
        }
        Insert: {
          ai_generated?: boolean | null
          created_at?: string | null
          description?: string | null
          expected_results: Json
          id?: string
          preconditions?: string | null
          priority?: string | null
          project_id: string
          reviewed?: boolean | null
          scenario_id: string
          status?: string | null
          test_data?: Json | null
          test_steps: Json
          title: string
          updated_at?: string | null
        }
        Update: {
          ai_generated?: boolean | null
          created_at?: string | null
          description?: string | null
          expected_results?: Json
          id?: string
          preconditions?: string | null
          priority?: string | null
          project_id?: string
          reviewed?: boolean | null
          scenario_id?: string
          status?: string | null
          test_data?: Json | null
          test_steps?: Json
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_test_cases_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "ai_test_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_test_cases_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "ai_test_scenarios"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_test_executions: {
        Row: {
          browser: string | null
          completed_at: string | null
          created_at: string | null
          environment: string | null
          execution_duration: number | null
          execution_name: string
          execution_type: string | null
          failed_tests: number | null
          id: string
          passed_tests: number | null
          platform: string | null
          project_id: string
          skipped_tests: number | null
          started_at: string | null
          status: string | null
          total_tests: number | null
        }
        Insert: {
          browser?: string | null
          completed_at?: string | null
          created_at?: string | null
          environment?: string | null
          execution_duration?: number | null
          execution_name: string
          execution_type?: string | null
          failed_tests?: number | null
          id?: string
          passed_tests?: number | null
          platform?: string | null
          project_id: string
          skipped_tests?: number | null
          started_at?: string | null
          status?: string | null
          total_tests?: number | null
        }
        Update: {
          browser?: string | null
          completed_at?: string | null
          created_at?: string | null
          environment?: string | null
          execution_duration?: number | null
          execution_name?: string
          execution_type?: string | null
          failed_tests?: number | null
          id?: string
          passed_tests?: number | null
          platform?: string | null
          project_id?: string
          skipped_tests?: number | null
          started_at?: string | null
          status?: string | null
          total_tests?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_test_executions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "ai_test_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_test_projects: {
        Row: {
          application_type: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          application_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          application_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_test_projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_test_reports: {
        Row: {
          ai_insights: string | null
          created_at: string | null
          execution_id: string
          id: string
          project_id: string
          recommendations: string | null
          report_content: string | null
          report_type: string | null
          report_url: string | null
          summary: Json | null
        }
        Insert: {
          ai_insights?: string | null
          created_at?: string | null
          execution_id: string
          id?: string
          project_id: string
          recommendations?: string | null
          report_content?: string | null
          report_type?: string | null
          report_url?: string | null
          summary?: Json | null
        }
        Update: {
          ai_insights?: string | null
          created_at?: string | null
          execution_id?: string
          id?: string
          project_id?: string
          recommendations?: string | null
          report_content?: string | null
          report_type?: string | null
          report_url?: string | null
          summary?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_test_reports_execution_id_fkey"
            columns: ["execution_id"]
            isOneToOne: false
            referencedRelation: "ai_test_executions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_test_reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "ai_test_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_test_results: {
        Row: {
          ai_analysis: Json | null
          created_at: string | null
          error_message: string | null
          execution_id: string
          execution_time: number | null
          id: string
          logs: string | null
          screenshots: Json | null
          stack_trace: string | null
          status: string
          suggested_fixes: string | null
          test_case_id: string | null
          test_name: string
        }
        Insert: {
          ai_analysis?: Json | null
          created_at?: string | null
          error_message?: string | null
          execution_id: string
          execution_time?: number | null
          id?: string
          logs?: string | null
          screenshots?: Json | null
          stack_trace?: string | null
          status: string
          suggested_fixes?: string | null
          test_case_id?: string | null
          test_name: string
        }
        Update: {
          ai_analysis?: Json | null
          created_at?: string | null
          error_message?: string | null
          execution_id?: string
          execution_time?: number | null
          id?: string
          logs?: string | null
          screenshots?: Json | null
          stack_trace?: string | null
          status?: string
          suggested_fixes?: string | null
          test_case_id?: string | null
          test_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_test_results_execution_id_fkey"
            columns: ["execution_id"]
            isOneToOne: false
            referencedRelation: "ai_test_executions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_test_results_test_case_id_fkey"
            columns: ["test_case_id"]
            isOneToOne: false
            referencedRelation: "ai_test_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_test_scenarios: {
        Row: {
          ai_generated: boolean | null
          application_id: string
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          priority: string | null
          project_id: string
          reviewed: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          ai_generated?: boolean | null
          application_id: string
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          project_id: string
          reviewed?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          ai_generated?: boolean | null
          application_id?: string
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          project_id?: string
          reviewed?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_test_scenarios_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "ai_test_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_test_scenarios_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "ai_test_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_test_scripts: {
        Row: {
          ai_generated: boolean | null
          configuration: Json | null
          created_at: string | null
          dependencies: Json | null
          framework: string
          id: string
          language: string
          project_id: string
          reviewed: boolean | null
          script_content: string
          test_case_id: string
          updated_at: string | null
        }
        Insert: {
          ai_generated?: boolean | null
          configuration?: Json | null
          created_at?: string | null
          dependencies?: Json | null
          framework: string
          id?: string
          language: string
          project_id: string
          reviewed?: boolean | null
          script_content: string
          test_case_id: string
          updated_at?: string | null
        }
        Update: {
          ai_generated?: boolean | null
          configuration?: Json | null
          created_at?: string | null
          dependencies?: Json | null
          framework?: string
          id?: string
          language?: string
          project_id?: string
          reviewed?: boolean | null
          script_content?: string
          test_case_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_test_scripts_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "ai_test_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_test_scripts_test_case_id_fkey"
            columns: ["test_case_id"]
            isOneToOne: false
            referencedRelation: "ai_test_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_comments: {
        Row: {
          author_email: string
          author_name: string
          author_website: string | null
          comment_text: string
          created_at: string | null
          id: string
          post_id: string
          status: string | null
        }
        Insert: {
          author_email: string
          author_name: string
          author_website?: string | null
          comment_text: string
          created_at?: string | null
          id?: string
          post_id: string
          status?: string | null
        }
        Update: {
          author_email?: string
          author_name?: string
          author_website?: string | null
          comment_text?: string
          created_at?: string | null
          id?: string
          post_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category: string
          comments_count: number | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured: boolean | null
          id: string
          image: string | null
          published: boolean | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author_id?: string | null
          category: string
          comments_count?: number | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image?: string | null
          published?: boolean | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string
          comments_count?: number | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image?: string | null
          published?: boolean | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          notes: string | null
          phone: string | null
          status: string | null
          subject: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          notes?: string | null
          phone?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          notes?: string | null
          phone?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      media_library: {
        Row: {
          created_at: string | null
          file_path: string
          file_size: number | null
          filename: string
          height: number | null
          id: string
          mime_type: string | null
          original_filename: string
          uploaded_by: string | null
          width: number | null
        }
        Insert: {
          created_at?: string | null
          file_path: string
          file_size?: number | null
          filename: string
          height?: number | null
          id?: string
          mime_type?: string | null
          original_filename: string
          uploaded_by?: string | null
          width?: number | null
        }
        Update: {
          created_at?: string | null
          file_path?: string
          file_size?: number | null
          filename?: string
          height?: number | null
          id?: string
          mime_type?: string | null
          original_filename?: string
          uploaded_by?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_library_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number
          created_at: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          id: string
          notes: string | null
          package_type: string | null
          payment_id: string | null
          payment_method: string | null
          service_type: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          package_type?: string | null
          payment_id?: string | null
          payment_method?: string | null
          service_type: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          id?: string
          notes?: string | null
          package_type?: string | null
          payment_id?: string | null
          payment_method?: string | null
          service_type?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          features: string[] | null
          icon: string | null
          id: string
          image: string | null
          order_position: number | null
          price_starting: number | null
          published: boolean | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          image?: string | null
          order_position?: number | null
          price_starting?: number | null
          published?: boolean | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          image?: string | null
          order_position?: number | null
          price_starting?: number | null
          published?: boolean | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
