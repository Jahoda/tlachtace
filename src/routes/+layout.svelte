<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	let { data } = $props();

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<div class="min-h-screen flex flex-col">
	<header class="tlachtace-header">
		<div class="container mx-auto px-4 py-3">
			<div class="flex items-center justify-between">
				<a href="/" class="text-xl font-bold">Tlachtační trachtace</a>
				<div class="text-sm">
					Diskuzní fórum v moderním kabátě • Čeští plazi návraty z různých stran!
				</div>
			</div>
		</div>
	</header>

	<nav class="tlachtace-nav">
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-between py-2">
				<div class="flex gap-6 text-sm">
					<a href="/" class="hover:text-gray-300">Hlavní stránka</a>
					{#if data.session}
						<a href="/profile" class="hover:text-gray-300">Profil</a>
					{:else}
						<a href="/auth/register" class="hover:text-gray-300">Registrace</a>
					{/if}
				</div>
				<div class="flex gap-2 items-center">
					{#if data.session}
						<span class="text-sm">{data.session.user.email}</span>
						<form method="POST" action="/auth/logout">
							<button type="submit" class="tlachtace-button text-sm py-1">
								Odhlásit se
							</button>
						</form>
					{:else}
						<a href="/auth/login" class="tlachtace-button text-sm py-1">Přihlásit</a>
					{/if}
				</div>
			</div>
		</div>
	</nav>

	<main class="flex-1 container mx-auto px-4 py-6">
		<slot />
	</main>

	<footer class="bg-tlachtace-gray-nav text-white py-3">
		<div class="container mx-auto px-4 text-center text-sm">
			<p>Tlachtační trachtace - Postaveno na SvelteKit a Supabase</p>
		</div>
	</footer>
</div>
