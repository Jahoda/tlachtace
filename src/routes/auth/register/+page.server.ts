import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirm = formData.get('password_confirm') as string;
		const username = formData.get('username') as string;

		if (password !== passwordConfirm) {
			return fail(400, {
				error: 'Hesla se neshodují'
			});
		}

		const emailRedirectTo = `${url.origin}/auth/callback`;

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo,
				data: {
					username
				}
			}
		});

		if (error) {
			return fail(400, {
				error: error.message
			});
		}

		return {
			success: 'Registrace úspěšná! Zkontrolujte svůj email pro potvrzení účtu.'
		};
	}
};
