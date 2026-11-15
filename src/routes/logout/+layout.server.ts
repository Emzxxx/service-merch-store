import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { supabase } }) => {

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    throw redirect(303, '/login');
  }
  return { user };

};