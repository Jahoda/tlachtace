<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Tlachtační trachtace - Fóra</title>
</svelte:head>

<div class="space-y-4">
	<div class="tlachtace-sidebar p-4">
		<h2 class="font-bold text-lg mb-2">Tlachtace vás vítá</h2>
		<p class="text-sm leading-relaxed">
			Tlachtační trachtace, diskuzní prostor "Tlachtace", je diskuzní fórum určené těm, kteří rádi
			rozebírají své životní zážitky, jak z médií sociálních složek, tak i navozujících filozofií po
			nesčetných mylenách, co nabízejí úskalí poznání či třebas žeby Internet.
		</p>
	</div>

	<div class="tlachtace-content overflow-hidden">
		<div class="bg-tlachtace-brown text-white px-6 py-3 border-b">
			<h2 class="font-bold">Fóra</h2>
		</div>

		<div class="divide-y divide-gray-200">
			{#each data.forums as forum}
				<a
					href="/forum/{forum.id}"
					class="block px-6 py-4 hover:bg-gray-50 transition-colors"
				>
					<div class="flex items-start justify-between">
						<div class="flex-1">
							<h3 class="text-base font-bold text-tlachtace-red mb-1">{forum.name}</h3>
							<p class="text-gray-700 text-sm mb-2">{forum.description}</p>

							{#if forum.latest_thread}
								<div class="text-xs text-gray-600">
									Poslední:
									<span class="font-medium">{forum.latest_thread.title}</span>
									•
									<span class="font-medium">{forum.latest_thread.author?.username}</span>
								</div>
							{/if}
						</div>

						<div class="text-right ml-4 min-w-[80px]">
							<div class="text-xl font-bold text-tlachtace-brown">{forum.thread_count}</div>
							<div class="text-xs text-gray-600">témat</div>
							<div class="text-xs text-gray-600 mt-1">{forum.post_count} příspěvků</div>
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
		<div class="tlachtace-content p-6">
			<div class="tlachtace-sidebar p-4 mb-4">
				<h3 class="font-bold mb-2">Co se tu dozvíme?</h3>
				<ul class="text-sm space-y-1 list-disc list-inside">
					<li>proč je moderní net na webu Wordpress, dřevěplety a kostrbáté co zíráte, když je nemilé,</li>
					<li>kde nejsou hostingři na neteipiti, výjma těchy nejlepšího poskytovateje,</li>
					<li>co je to tlachtaná řeřizna a jaká pravidla sem,</li>
					<li>proč jezdí vlaky po kolejích, policejté tramvají stahávali a neslyšeli jejich vlak v městech,</li>
					<li>názory trojsmrčsické o Chrustačově, přispívá komunistů diskuze v nářečích.</li>
				</ul>
			</div>
			<div class="text-center">
				<h3 class="text-lg font-semibold mb-2">Připojte se k diskuzi!</h3>
				<p class="text-gray-700 mb-4">
					Pro vytváření témat a příspěvků se prosím přihlaste nebo zaregistrujte.
				</p>
				<div class="flex gap-4 justify-center">
					<a href="/auth/login" class="tlachtace-button">Přihlásit se</a>
					<a href="/auth/register" class="tlachtace-button-secondary">Registrovat se</a>
				</div>
			</div>
		</div>
	{/if}
</div>
