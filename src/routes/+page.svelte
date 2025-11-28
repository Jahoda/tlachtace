<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>MiniBB - Fóra</title>
</svelte:head>

<div class="space-y-6">
	<div class="bg-white rounded-lg shadow-md p-6">
		<h1 class="text-3xl font-bold mb-2">Vítejte na MiniBB</h1>
		<p class="text-gray-600">Moderní diskuzní fórum postavené na SvelteKit a Supabase</p>
	</div>

	<div class="bg-white rounded-lg shadow-md overflow-hidden">
		<div class="bg-gray-100 px-6 py-4 border-b">
			<h2 class="text-xl font-semibold">Fóra</h2>
		</div>

		<div class="divide-y">
			{#each data.forums as forum}
				<a
					href="/forum/{forum.id}"
					class="block px-6 py-5 hover:bg-gray-50 transition-colors"
				>
					<div class="flex items-start justify-between">
						<div class="flex-1">
							<h3 class="text-lg font-semibold text-blue-600 mb-1">{forum.name}</h3>
							<p class="text-gray-600 text-sm mb-2">{forum.description}</p>

							{#if forum.latest_thread}
								<div class="text-sm text-gray-500">
									Poslední příspěvek:
									<span class="font-medium">{forum.latest_thread.title}</span>
									od
									<span class="font-medium">{forum.latest_thread.author?.username}</span>
								</div>
							{/if}
						</div>

						<div class="text-right ml-4">
							<div class="text-2xl font-bold text-blue-600">{forum.thread_count}</div>
							<div class="text-sm text-gray-500">témat</div>
							<div class="text-sm text-gray-500 mt-1">{forum.post_count} příspěvků</div>
						</div>
					</div>
				</a>
			{:else}
				<div class="px-6 py-8 text-center text-gray-500">
					<p>Zatím nejsou k dispozici žádná fóra.</p>
				</div>
			{/each}
		</div>
	</div>

	{#if !data.session}
		<div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
			<h3 class="text-lg font-semibold mb-2">Připojte se k diskuzi!</h3>
			<p class="text-gray-700 mb-4">
				Pro vytváření témat a příspěvků se prosím přihlaste nebo zaregistrujte.
			</p>
			<div class="flex gap-4">
				<a
					href="/auth/login"
					class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
				>
					Přihlásit se
				</a>
				<a
					href="/auth/register"
					class="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
				>
					Registrovat se
				</a>
			</div>
		</div>
	{/if}
</div>
