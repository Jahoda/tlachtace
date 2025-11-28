<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let showNewThreadForm = $state(false);
</script>

<svelte:head>
	<title>{data.forum.name} - Tlachtační trachtace</title>
</svelte:head>

<div class="space-y-4">
	<nav class="text-xs text-gray-600">
		<a href="/" class="hover:text-tlachtace-red">Domů</a>
		<span class="mx-2">»</span>
		<span class="font-medium">{data.forum.name}</span>
	</nav>

	<div class="tlachtace-content p-4">
		<div class="flex items-start justify-between">
			<div>
				<h1 class="text-2xl font-bold text-tlachtace-red mb-1">{data.forum.name}</h1>
				<p class="text-gray-700 text-sm">{data.forum.description}</p>
			</div>
			{#if data.session}
				<button
					onclick={() => (showNewThreadForm = !showNewThreadForm)}
					class="tlachtace-button text-sm"
				>
					{showNewThreadForm ? 'Zrušit' : 'Nové téma'}
				</button>
			{/if}
		</div>
	</div>

	{#if showNewThreadForm}
		<div class="tlachtace-content p-6">
			<h2 class="font-bold text-lg mb-4 text-tlachtace-brown">Vytvořit nové téma</h2>

			{#if form?.error}
				<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
					{form.error}
				</div>
			{/if}

			<form method="POST" action="?/create" use:enhance class="space-y-4">
				<div>
					<label for="title" class="block text-sm font-bold text-gray-700 mb-1">
						Název tématu:
					</label>
					<input
						type="text"
						id="title"
						name="title"
						required
						class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-tlachtace-brown focus:border-transparent text-sm"
					/>
				</div>

				<div>
					<label for="content" class="block text-sm font-bold text-gray-700 mb-1">
						Obsah prvního příspěvku:
					</label>
					<textarea
						id="content"
						name="content"
						required
						rows="6"
						class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-tlachtace-brown focus:border-transparent text-sm"
					></textarea>
				</div>

				<button type="submit" class="tlachtace-button">
					Vytvořit téma
				</button>
			</form>
		</div>
	{/if}

	<div class="tlachtace-content overflow-hidden">
		<div class="bg-tlachtace-brown text-white px-6 py-3 border-b">
			<h2 class="font-bold">Témata</h2>
		</div>

		<div class="divide-y divide-gray-200">
			{#each data.threads as thread}
				<a href="/thread/{thread.id}" class="block px-6 py-4 hover:bg-gray-50 transition-colors">
					<div class="flex items-start justify-between">
						<div class="flex-1">
							<h3 class="text-base font-bold text-tlachtace-red mb-1">{thread.title}</h3>
							<div class="text-xs text-gray-600">
								<span class="font-medium">{thread.author?.username}</span>
								•
								{new Date(thread.created_at).toLocaleDateString('cs-CZ')}
							</div>
						</div>

						<div class="text-right ml-4 min-w-[60px]">
							<div class="text-lg font-bold text-tlachtace-brown">{thread.post_count}</div>
							<div class="text-xs text-gray-600">odpovědí</div>
						</div>
					</div>
				</a>
			{:else}
				<div class="px-6 py-8 text-center text-gray-500">
					<p class="text-sm">V tomto fóru zatím nejsou žádná témata.</p>
					{#if data.session}
						<button
							onclick={() => (showNewThreadForm = true)}
							class="mt-4 text-tlachtace-red hover:underline text-sm font-medium"
						>
							Vytvořte první téma
						</button>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
