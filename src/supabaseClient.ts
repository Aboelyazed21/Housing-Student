// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://skbilakbbxtvtoikupey.supabase.co'; // استبدل بـ URL بتاعك
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrYmlsYWtiYnh0dnRvaWt1cGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NzczMjgsImV4cCI6MjA2OTU1MzMyOH0.ZbKZoTSlZ-I-AUw-dkRSDmlmonzO4Pmi34qGR3e6FKM'; // استبدل بـ anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
