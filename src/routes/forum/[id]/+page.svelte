<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let showNewThreadForm = $state(false);
</script>

<svelte:head>
	<title>{data.forum.name} - MiniBB</title>
</svelte:head>

<div class="space-y-6">
	<nav class="text-sm text-gray-600">
		<a href="/" class="hover:text-blue-600">Domů</a>
		<span class="mx-2">/</span>
		<span>{data.forum.name}</span>
	</nav>

	<div class="bg-white rounded-lg shadow-md p-6">
		<div class="flex items-start justify-between">
			<div>
				<h1 class="text-3xl font-bold mb-2">{data.forum.name}</h1>
				<p class="text-gray-600">{data.forum.description}</p>
			</div>
			{#if data.session}
				<button
					onclick={() => (showNewThreadForm = !showNewThreadForm)}
					class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
				>
					{showNewThreadForm ? 'Zrušit' : 'Nové téma'}
				</button>
			{/if}
		</div>
	</div>

	{#if showNewThreadForm}
		<div class="bg-white rounded-lg shadow-md p-6">
			<h2 class="text-xl font-semibold mb-4">Vytvořit nové téma</h2>

			{#if form?.error}
				<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{form.error}
				</div>
			{/if}

			<form method="POST" action="?/create" use:enhance class="space-y-4">
				<div>
					<label for="title" class="block text-sm font-medium text-gray-700 mb-2">
						Název tématu
					</label>
					<input
						type="text"
						id="title"
						name="title"
						required
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				<div>
					<label for="content" class="block text-sm font-medium text-gray-700 mb-2">
						Obsah prvního příspěvku
					</label>
					<textarea
						id="content"
						name="content"
						required
						rows="6"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					></textarea>
				</div>

				<button
					type="submit"
					class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
				>
					Vytvořit téma
				</button>
			</form>
		</div>
	{/if}

	<div class="bg-white rounded-lg shadow-md overflow-hidden">
		<div class="bg-gray-100 px-6 py-4 border-b">
			<h2 class="text-xl font-semibold">Témata</h2>
		</div>

		<div class="divide-y">
			{#each data.threads as thread}
				<a href="/thread/{thread.id}" class="block px-6 py-5 hover:bg-gray-50 transition-colors">
					<div class="flex items-start justify-between">
						<div class="flex-1">
							<h3 class="text-lg font-semibold text-blue-600 mb-1">{thread.title}</h3>
							<div class="text-sm text-gray-500">
								Vytvořil
								<span class="font-medium">{thread.author?.username}</span>
								•
								{new Date(thread.created_at).toLocaleDateString('cs-CZ')}
							</div>
						</div>

						<div class="text-right ml-4">
							<div class="text-lg font-bold text-blue-600">{thread.post_count}</div>
							<div class="text-sm text-gray-500">odpovědí</div>
						</div>
					</div>
				</a>
			{:else}
				<div class="px-6 py-8 text-center text-gray-500">
					<p>V tomto fóru zatím nejsou žádná témata.</p>
					{#if data.session}
						<button
							onclick={() => (showNewThreadForm = true)}
							class="mt-4 text-blue-600 hover:underline"
						>
							Vytvořte první téma
						</button>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
