<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	let { data, form } = $props();
	let editingPostId = $state<number | null>(null);
	let editContent = $state('');

	function startEdit(postId: number, content: string) {
		editingPostId = postId;
		editContent = content;
	}

	function cancelEdit() {
		editingPostId = null;
		editContent = '';
	}
</script>

<svelte:head>
	<title>{data.thread.title} - MiniBB</title>
</svelte:head>

<div class="space-y-6">
	<nav class="text-sm text-gray-600">
		<a href="/" class="hover:text-blue-600">Domů</a>
		<span class="mx-2">/</span>
		<a href="/forum/{data.thread.forum.id}" class="hover:text-blue-600">
			{data.thread.forum.name}
		</a>
		<span class="mx-2">/</span>
		<span>{data.thread.title}</span>
	</nav>

	<div class="bg-white rounded-lg shadow-md p-6">
		<h1 class="text-3xl font-bold mb-2">{data.thread.title}</h1>
		<div class="text-sm text-gray-500">
			Vytvořil
			<span class="font-medium">{data.thread.author?.username}</span>
			•
			{new Date(data.thread.created_at).toLocaleString('cs-CZ')}
		</div>
	</div>

	<div class="space-y-4">
		{#each data.posts as post, index}
			<div class="bg-white rounded-lg shadow-md overflow-hidden">
				<div class="flex">
					<div class="bg-gray-100 w-48 p-4 border-r">
						<div class="text-center">
							<div class="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-2xl font-bold">
								{post.author?.username?.[0]?.toUpperCase() || '?'}
							</div>
							<div class="font-semibold">{post.author?.username}</div>
							<div class="text-sm text-gray-500">
								{index === 0 ? 'Autor tématu' : `Příspěvek #${index + 1}`}
							</div>
						</div>
					</div>

					<div class="flex-1 p-6">
						{#if editingPostId === post.id}
							<form
								method="POST"
								action="?/edit"
								use:enhance={() => {
									return async ({ result }) => {
										if (result.type === 'success') {
											cancelEdit();
											await invalidateAll();
										}
									};
								}}
								class="space-y-4"
							>
								<input type="hidden" name="post_id" value={post.id} />
								<textarea
									name="content"
									bind:value={editContent}
									rows="6"
									class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								></textarea>
								<div class="flex gap-2">
									<button
										type="submit"
										class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
									>
										Uložit
									</button>
									<button
										type="button"
										onclick={cancelEdit}
										class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
									>
										Zrušit
									</button>
								</div>
							</form>
						{:else}
							<div class="prose max-w-none mb-4">
								<p class="whitespace-pre-wrap">{post.content}</p>
							</div>

							<div class="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
								<div>
									{#if post.updated_at !== post.created_at}
										Upraveno: {new Date(post.updated_at).toLocaleString('cs-CZ')}
									{:else}
										{new Date(post.created_at).toLocaleString('cs-CZ')}
									{/if}
								</div>

								{#if data.session?.user.id === post.author_id}
									<div class="flex gap-2">
										<button
											onclick={() => startEdit(post.id, post.content)}
											class="text-blue-600 hover:underline"
										>
											Upravit
										</button>
										<form
											method="POST"
											action="?/delete"
											use:enhance={() => {
												return async ({ result }) => {
													if (result.type === 'success') {
														await invalidateAll();
													}
												};
											}}
										>
											<input type="hidden" name="post_id" value={post.id} />
											<button type="submit" class="text-red-600 hover:underline">
												Smazat
											</button>
										</form>
									</div>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>

	{#if data.session}
		<div class="bg-white rounded-lg shadow-md p-6">
			<h2 class="text-xl font-semibold mb-4">Přidat odpověď</h2>

			{#if form?.error}
				<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{form.error}
				</div>
			{/if}

			<form
				method="POST"
				action="?/reply"
				use:enhance={() => {
					return async ({ result, formElement }) => {
						if (result.type === 'success') {
							formElement.reset();
							await invalidateAll();
						}
					};
				}}
				class="space-y-4"
			>
				<textarea
					name="content"
					required
					rows="6"
					placeholder="Napište svůj příspěvek..."
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				></textarea>

				<button
					type="submit"
					class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
				>
					Odeslat odpověď
				</button>
			</form>
		</div>
	{:else}
		<div class="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
			<p class="mb-4">Pro odpověď na tento příspěvek se prosím přihlaste.</p>
			<a
				href="/auth/login"
				class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
			>
				Přihlásit se
			</a>
		</div>
	{/if}
</div>
