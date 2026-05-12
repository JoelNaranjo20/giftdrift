import { supabase } from '../lib/supabase'

export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
  return data
}

export async function saveTestimonials(testimonials) {
  const { error } = await supabase
    .from('testimonials')
    .upsert(testimonials)

  if (error) {
    console.error('Error saving testimonials:', error)
    throw error
  }
}

export async function deleteTestimonial(id) {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting testimonial:', error)
    throw error
  }
}
