// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://znoqxpkqbsjvhbdcalem.supabase.co'; // Substitua pela URL do seu projeto no Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpub3F4cGtxYnNqdmhiZGNhbGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0MzA5MTgsImV4cCI6MjA0MjAwNjkxOH0.IdRPlfFjueXH6bMWZAOOgwCEJengwjwT2uBY3-rU2pI'; // Substitua pela chave de API pública do seu projeto no Supabase

export const supabase = createClient(supabaseUrl, supabaseKey);
