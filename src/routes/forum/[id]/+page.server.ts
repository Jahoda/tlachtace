import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const forumId = parseInt(params.id);

	const { data: forum } = await supabase.from('forums').select('*').eq('id', forumId).single();

	if (!forum) {
		throw error(404, 'Fórum nenalezeno');
	}

	const { data: threads } = await supabase
		.from('threads')
		.select(
			`
			*,
			author:profiles!threads_author_id_fkey(username),
			posts(count)
		`
		)
		.eq('forum_id', forumId)
		.order('updated_at', { ascending: false });

	const threadsWithCounts = threads?.map((thread) => ({
		...thread,
		post_count: thread.posts?.[0]?.count || 0
	}));

	return {
		forum,
		threads: threadsWithCounts || []
	};
};

export const actions: Actions = {
	create: async ({ request, params, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/auth/login');
		}

		const formData = await request.formData();
		const title = formData.get('title') as string;
		const content = formData.get('content') as string;
		const forumId = parseInt(params.id);

		if (!title || !content) {
			return fail(400, { error: 'Vyplňte všechna pole' });
		}

		const { data: thread, error: threadError } = await supabase
			.from('threads')
			.insert({
				forum_id: forumId,
				title,
				author_id: session.user.id
			})
			.select()
			.single();

		if (threadError) {
			return fail(500, { error: 'Chyba při vytváření tématu' });
		}

		const { error: postError } = await supabase.from('posts').insert({
			thread_id: thread.id,
			author_id: session.user.id,
			content
		});

		if (postError) {
			return fail(500, { error: 'Chyba při vytváření příspěvku' });
		}

		throw redirect(303, `/thread/${thread.id}`);
	}
};
