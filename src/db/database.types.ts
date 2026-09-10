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
      inventory: {
        Row: {
          amount: number
          amount_unit: string
          author_id: string
          category: string
          color: string | null
          cost: number | null
          created_at: string
          id: number
          item: string
          url_id: number | null
        }
        Insert: {
          amount: number
          amount_unit?: string
          author_id?: string
          category?: string
          color?: string | null
          cost?: number | null
          created_at?: string
          id?: number
          item: string
          url_id?: number | null
        }
        Update: {
          amount?: number
          amount_unit?: string
          author_id?: string
          category?: string
          color?: string | null
          cost?: number | null
          created_at?: string
          id?: number
          item?: string
          url_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_url_id_fkey"
            columns: ["url_id"]
            isOneToOne: false
            referencedRelation: "url"
            referencedColumns: ["id"]
          },
        ]
      }
      owners: {
        Row: {
          created_at: string
          message: string | null
          pattern_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          message?: string | null
          pattern_id: number
          user_id?: string
        }
        Update: {
          created_at?: string
          message?: string | null
          pattern_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "owners_pattern_id_fkey"
            columns: ["pattern_id"]
            isOneToOne: false
            referencedRelation: "patterns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "owners_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      patterns: {
        Row: {
          author_id: string | null
          colors: Json
          created_at: string
          id: number
          is_editing: boolean
          materials: Json
          rows: Json
          sizes: Json
          title: string
          url_id: number | null
        }
        Insert: {
          author_id?: string | null
          colors: Json
          created_at?: string
          id?: number
          is_editing?: boolean
          materials: Json
          rows: Json
          sizes: Json
          title?: string
          url_id?: number | null
        }
        Update: {
          author_id?: string | null
          colors?: Json
          created_at?: string
          id?: number
          is_editing?: boolean
          materials?: Json
          rows?: Json
          sizes?: Json
          title?: string
          url_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "patterns_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patterns_url_id_fkey"
            columns: ["url_id"]
            isOneToOne: false
            referencedRelation: "url"
            referencedColumns: ["id"]
          },
        ]
      }
      stitches: {
        Row: {
          author_id: string | null
          created_at: string
          custom: boolean
          id: number
          name: string
          origin: string | null
          shorthand: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string
          custom?: boolean
          id?: number
          name?: string
          origin?: string | null
          shorthand?: string
        }
        Update: {
          author_id?: string | null
          created_at?: string
          custom?: boolean
          id?: number
          name?: string
          origin?: string | null
          shorthand?: string
        }
        Relationships: [
          {
            foreignKeyName: "stitches_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "user_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      trackers: {
        Row: {
          created_at: string
          current_index: number
          current_row: number
          current_stitch: string | null
          id: string
          is_finished: boolean
          pattern_id: number
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          current_index?: number
          current_row?: number
          current_stitch?: string | null
          id?: string
          is_finished?: boolean
          pattern_id: number
          title?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          current_index?: number
          current_row?: number
          current_stitch?: string | null
          id?: string
          is_finished?: boolean
          pattern_id?: number
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trackers_user_id_pattern_id_fkey"
            columns: ["user_id", "pattern_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["user_id", "pattern_id"]
          },
        ]
      }
      url: {
        Row: {
          creator: string | null
          id: number
          url: string
        }
        Insert: {
          creator?: string | null
          id?: number
          url?: string
        }
        Update: {
          creator?: string | null
          id?: number
          url?: string
        }
        Relationships: []
      }
      user_profile: {
        Row: {
          created_at: string
          id: string
          name: string | null
          profile_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
          profile_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          profile_url?: string | null
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
