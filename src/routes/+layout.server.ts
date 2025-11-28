import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ depends, locals: { getSession } }) => {
	depends('supabase:auth');

	return {
		session: await getSession()
	};
};
