
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

// TODO: Assumes we have defined `supabase` in locals in hooks already
export const actions: Actions = {
    google_login: async ({ locals : { supabase }, url }) => {
        const { data, error } =
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
            redirectTo: `${url.origin}/auth/callback`
            }
        });

        if (error) {
        console.error('Google OAuth error:', error.message);

        return fail(500, {
            message: 'Unable to start Google sign-in. Please try again.'
        });
        }

        if (!data.url) {
        return fail(500, {
            message: 'Google sign-in did not return a redirect URL.'
        });
        }

        redirect(303, data.url);
}
};
