// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ojojuhmarvqmuqlpslca.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qb2p1aG1hcnZxbXVxbHBzbGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMzkyNTIsImV4cCI6MjA0OTYxNTI1Mn0.Bg9RsWuKDGtUKCM7GH8LQ5XoGZccEs2HebD4DnGOmC4';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

