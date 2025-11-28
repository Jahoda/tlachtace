<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Můj profil - MiniBB</title>
</svelte:head>

<div class="space-y-6">
	<div class="bg-white rounded-lg shadow-md p-6">
		<div class="flex items-center gap-6">
			<div class="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
				{data.profile?.username?.[0]?.toUpperCase() || '?'}
			</div>
			<div>
				<h1 class="text-3xl font-bold mb-2">{data.profile?.username}</h1>
				<p class="text-gray-600">
					Člen od {new Date(data.profile?.created_at || '').toLocaleDateString('cs-CZ')}
				</p>
			</div>
		</div>
	</div>

	<div class="grid md:grid-cols-2 gap-6">
		<div class="bg-white rounded-lg shadow-md p-6">
			<h2 class="text-xl font-semibold mb-4">Moje témata</h2>
			<div class="space-y-4">
				{#each data.threads as thread}
					<a
						href="/thread/{thread.id}"
						class="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
					>
						<h3 class="font-semibold text-blue-600 mb-1">{thread.title}</h3>
						<div class="text-sm text-gray-500">
							{thread.forum?.name} • {thread.post_count} odpovědí •
							{new Date(thread.created_at).toLocaleDateString('cs-CZ')}
						</div>
					</a>
				{:else}
					<p class="text-gray-500 text-center py-4">Zatím jste nevytvořili žádná témata.</p>
				{/each}
			</div>
		</div>

		<div class="bg-white rounded-lg shadow-md p-6">
			<h2 class="text-xl font-semibold mb-4">Moje příspěvky</h2>
			<div class="space-y-4">
				{#each data.posts as post}
					<a
						href="/thread/{post.thread?.id}"
						class="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
					>
						<h3 class="font-semibold text-blue-600 mb-1">{post.thread?.title}</h3>
						<p class="text-sm text-gray-700 mb-2 line-clamp-2">{post.content}</p>
						<div class="text-sm text-gray-500">
							{post.thread?.forum?.name} •
							{new Date(post.created_at).toLocaleDateString('cs-CZ')}
						</div>
					</a>
				{:else}
					<p class="text-gray-500 text-center py-4">Zatím jste nenapsal žádné příspěvky.</p>
				{/each}
			</div>
		</div>
	</div>

	<div class="bg-white rounded-lg shadow-md p-6">
		<h2 class="text-xl font-semibold mb-4">Statistiky</h2>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			<div class="text-center p-4 bg-blue-50 rounded-lg">
				<div class="text-3xl font-bold text-blue-600">{data.threads.length}</div>
				<div class="text-sm text-gray-600">Vytvořená témata</div>
			</div>
			<div class="text-center p-4 bg-green-50 rounded-lg">
				<div class="text-3xl font-bold text-green-600">{data.posts.length}</div>
				<div class="text-sm text-gray-600">Příspěvky</div>
			</div>
			<div class="text-center p-4 bg-purple-50 rounded-lg">
				<div class="text-3xl font-bold text-purple-600">
					{data.threads.reduce((sum, t) => sum + t.post_count, 0)}
				</div>
				<div class="text-sm text-gray-600">Odpovědi na témata</div>
			</div>
			<div class="text-center p-4 bg-orange-50 rounded-lg">
				<div class="text-3xl font-bold text-orange-600">
					{Math.ceil(
						(new Date().getTime() - new Date(data.profile?.created_at || '').getTime()) /
							(1000 * 60 * 60 * 24)
					)}
				</div>
				<div class="text-sm text-gray-600">Dní členství</div>
			</div>
		</div>
	</div>
</div>
