import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	const threadId = parseInt(params.id);

	const { data: thread } = await supabase
		.from('threads')
		.select(
			`
			*,
			forum:forums(*),
			author:profiles!threads_author_id_fkey(username)
		`
		)
		.eq('id', threadId)
		.single();

	if (!thread) {
		throw error(404, 'Téma nenalezeno');
	}

	const { data: posts } = await supabase
		.from('posts')
		.select(
			`
			*,
			author:profiles!posts_author_id_fkey(username, avatar_url)
		`
		)
		.eq('thread_id', threadId)
		.order('created_at', { ascending: true });

	return {
		thread,
		posts: posts || []
	};
};

export const actions: Actions = {
	reply: async ({ request, params, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/auth/login');
		}

		const formData = await request.formData();
		const content = formData.get('content') as string;
		const threadId = parseInt(params.id);

		if (!content) {
			return fail(400, { error: 'Vyplňte obsah příspěvku' });
		}

		const { error: postError } = await supabase.from('posts').insert({
			thread_id: threadId,
			author_id: session.user.id,
			content
		});

		if (postError) {
			return fail(500, { error: 'Chyba při vytváření příspěvku' });
		}

		return { success: true };
	},

	edit: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/auth/login');
		}

		const formData = await request.formData();
		const postId = parseInt(formData.get('post_id') as string);
		const content = formData.get('content') as string;

		if (!content) {
			return fail(400, { error: 'Vyplňte obsah příspěvku' });
		}

		const { error: updateError } = await supabase
			.from('posts')
			.update({ content, updated_at: new Date().toISOString() })
			.eq('id', postId)
			.eq('author_id', session.user.id);

		if (updateError) {
			return fail(500, { error: 'Chyba při úpravě příspěvku' });
		}

		return { success: true };
	},

	delete: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, '/auth/login');
		}

		const formData = await request.formData();
		const postId = parseInt(formData.get('post_id') as string);

		const { error: deleteError } = await supabase
			.from('posts')
			.delete()
			.eq('id', postId)
			.eq('author_id', session.user.id);

		if (deleteError) {
			return fail(500, { error: 'Chyba při mazání příspěvku' });
		}

		return { success: true };
	}
};
