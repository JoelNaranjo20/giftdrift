import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://thzzlyplwhludozjzbqt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoenpseXBsd2hsdWRvemp6YnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1NTIyMDAsImV4cCI6MjA5NDEyODIwMH0.E63ayzIVpF4MoP6RCXI1SjpnXJfO4exf_O2A_QY2wcQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
