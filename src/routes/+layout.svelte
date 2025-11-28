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
	<header class="bg-blue-600 text-white shadow-lg">
		<div class="container mx-auto px-4 py-4">
			<nav class="flex items-center justify-between">
				<a href="/" class="text-2xl font-bold">MiniBB</a>
				<div class="flex gap-4">
					{#if data.session}
						<a href="/profile" class="hover:underline">
							Profil ({data.session.user.email})
						</a>
						<form method="POST" action="/auth/logout">
							<button type="submit" class="hover:underline">Odhlásit se</button>
						</form>
					{:else}
						<a href="/auth/login" class="hover:underline">Přihlásit se</a>
						<a href="/auth/register" class="hover:underline">Registrace</a>
					{/if}
				</div>
			</nav>
		</div>
	</header>

	<main class="flex-1 container mx-auto px-4 py-8">
		<slot />
	</main>

	<footer class="bg-gray-800 text-white py-4">
		<div class="container mx-auto px-4 text-center">
			<p>MiniBB Clone - Postaveno na SvelteKit a Supabase</p>
		</div>
	</footer>
</div>
