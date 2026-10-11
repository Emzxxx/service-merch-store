import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// TODO: Assumes we have defined `supabase` in locals in hooks already
export const GET: RequestHandler = async ({ url, locals : { supabase } }) => {
    const code = url.searchParams.get('code');

    // OAuth Checks
    if (!code) {
        redirect(303, '/login?error=oauth_callback');
    }

    const { error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
        console.error('OAuth callback error:', exchangeError.message);
        redirect(303, '/login?error=oauth_callback');
    }

    // User Authentication Checks
    const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error(
            'OAuth user verification failed:',
            userError?.message
        );        
        
        await supabase.auth.signOut();

        redirect(303, '/login?error=oauth_callback');
    }

    // redirect back to homepage after a successful login
    redirect(303, '/'); 
};