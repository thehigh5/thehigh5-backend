// lib/supabaseAdmin.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// This is the admin client used only on the server
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
