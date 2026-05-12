import { supabase } from '../lib/supabase'

export async function getOccasions() {
  const { data, error } = await supabase
    .from('occasions')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching occasions:', error)
    return []
  }
  return data
}

export async function saveOccasions(occasions) {
  const { error } = await supabase
    .from('occasions')
    .upsert(occasions)

  if (error) {
    console.error('Error saving occasions:', error)
    throw error
  }
}

export async function deleteOccasion(id) {
  const { error } = await supabase
    .from('occasions')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting occasion:', error)
    throw error
  }
}
