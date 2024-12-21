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
          education: Json[] | null
          career_goals: string | null
          interests: string[] | null
          company: string | null
          expertise: string[] | null
          bio: string | null
          calendar_connected: boolean
          calendar_url: string | null
          job_seeking_status: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          education?: Json[] | null
          career_goals?: string | null
          interests?: string[] | null
          company?: string | null
          expertise?: string[] | null
          bio?: string | null
          calendar_connected?: boolean
          calendar_url?: string | null
          job_seeking_status?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          education?: Json[] | null
          career_goals?: string | null
          interests?: string[] | null
          company?: string | null
          expertise?: string[] | null
          bio?: string | null
          calendar_connected?: boolean
          calendar_url?: string | null
          job_seeking_status?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      connection_requests: {
        Row: {
          id: string
          mentee_id: string
          mentor_id: string
          status: string
          message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mentee_id: string
          mentor_id: string
          status?: string
          message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mentee_id?: string
          mentor_id?: string
          status?: string
          message?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          mentee_id: string
          mentor_id: string
          title: string
          description: string | null
          status: string
          deadline: string | null
          mentor_feedback: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mentee_id: string
          mentor_id: string
          title: string
          description?: string | null
          status?: string
          deadline?: string | null
          mentor_feedback?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mentee_id?: string
          mentor_id?: string
          title?: string
          description?: string | null
          status?: string
          deadline?: string | null
          mentor_feedback?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          user_id: string
          skill_name: string
          current_level: number
          target_level: number
          progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          skill_name: string
          current_level: number
          target_level: number
          progress: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          skill_name?: string
          current_level?: number
          target_level?: number
          progress?: number
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          date: string
          luma_url: string
          registration_deadline: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          date: string
          luma_url: string
          registration_deadline: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          date?: string
          luma_url?: string
          registration_deadline?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}