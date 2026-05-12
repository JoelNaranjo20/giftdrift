import { supabase } from '../lib/supabase'

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return data
}

export async function saveProducts(products) {
  // To keep it simple, we upsert all.
  // Note: Products must have an id to update. If id is new, it will insert.
  const { error } = await supabase
    .from('products')
    .upsert(products)

  if (error) {
    console.error('Error saving products:', error)
    throw error
  }
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}
