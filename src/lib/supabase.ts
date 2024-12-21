import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Task = Database['public']['Tables']['tasks']['Row'];
export type Skill = Database['public']['Tables']['skills']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type ConnectionRequest = Database['public']['Tables']['connection_requests']['Row'];