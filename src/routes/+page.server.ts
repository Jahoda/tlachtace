import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: forums, error } = await supabase
		.from('forums')
		.select(
			`
			*,
			threads:threads(count),
			latest_thread:threads(
				id,
				title,
				created_at,
				author:profiles(username)
			)
		`
		)
		.order('created_at', { ascending: true });

	if (error) {
		console.error('Error loading forums:', error);
		return { forums: [] };
	}

	const forumsWithStats = await Promise.all(
		forums.map(async (forum) => {
			const { count: postsCount } = await supabase
				.from('posts')
				.select('*', { count: 'exact', head: true })
				.in(
					'thread_id',
					(
						await supabase
							.from('threads')
							.select('id')
							.eq('forum_id', forum.id)
					).data?.map((t) => t.id) || []
				);

			return {
				...forum,
				thread_count: forum.threads?.[0]?.count || 0,
				post_count: postsCount || 0,
				latest_thread: forum.latest_thread?.[0] || null
			};
		})
	);

	return {
		forums: forumsWithStats
	};
};
