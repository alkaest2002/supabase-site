import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const options = {
  schema: "public",
  autoRefreshToken: true,
  persistSession: false,
  detectSessionInUrl: true,
};

const supabaseMessages = {
  "generic error": "errore del server",
  "Invalid login credentials": "credenziali non valide", 
 }

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);

export const translateSupabaseMessage = (message) => {
  return supabaseMessages[message]
    ? supabaseMessages[message]
    : message
}