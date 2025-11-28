import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/auth/login');
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', session.user.id)
		.single();

	const { data: threads } = await supabase
		.from('threads')
		.select(
			`
			*,
			forum:forums(name),
			posts(count)
		`
		)
		.eq('author_id', session.user.id)
		.order('created_at', { ascending: false })
		.limit(10);

	const { data: posts } = await supabase
		.from('posts')
		.select(
			`
			*,
			thread:threads(id, title, forum:forums(name))
		`
		)
		.eq('author_id', session.user.id)
		.order('created_at', { ascending: false })
		.limit(10);

	const threadsWithCounts = threads?.map((thread) => ({
		...thread,
		post_count: thread.posts?.[0]?.count || 0
	}));

	return {
		profile,
		threads: threadsWithCounts || [],
		posts: posts || []
	};
};
