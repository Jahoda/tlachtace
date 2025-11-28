<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<div class="max-w-md mx-auto">
	<div class="tlachtace-content p-8">
		<div class="tlachtace-sidebar p-4 mb-6">
			<h1 class="text-xl font-bold text-center">Registrace</h1>
		</div>

		{#if form?.error}
			<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
				{form.error}
			</div>
		{/if}

		{#if form?.success}
			<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">
				{form.success}
			</div>
		{/if}

		<form method="POST" use:enhance class="space-y-4">
			<div>
				<label for="username" class="block text-sm font-bold text-gray-700 mb-1">
					Uživatelské jméno:
				</label>
				<input
					type="text"
					id="username"
					name="username"
					required
					minlength="3"
					class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-tlachtace-brown focus:border-transparent text-sm"
				/>
			</div>

			<div>
				<label for="email" class="block text-sm font-bold text-gray-700 mb-1">
					Email:
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-tlachtace-brown focus:border-transparent text-sm"
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-bold text-gray-700 mb-1">
					Heslo:
				</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					minlength="6"
					class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-tlachtace-brown focus:border-transparent text-sm"
				/>
			</div>

			<div>
				<label for="password_confirm" class="block text-sm font-bold text-gray-700 mb-1">
					Potvrzení hesla:
				</label>
				<input
					type="password"
					id="password_confirm"
					name="password_confirm"
					required
					minlength="6"
					class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-tlachtace-brown focus:border-transparent text-sm"
				/>
			</div>

			<button type="submit" class="w-full tlachtace-button">
				Zaregistrovat se
			</button>
		</form>

		<p class="mt-4 text-center text-gray-700 text-sm">
			Už máte účet?
			<a href="/auth/login" class="text-tlachtace-red hover:underline font-medium">Přihlaste se</a>
		</p>
	</div>
</div>
