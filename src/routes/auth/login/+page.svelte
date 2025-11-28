<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<div class="max-w-md mx-auto">
	<div class="bg-white rounded-lg shadow-md p-8">
		<h1 class="text-3xl font-bold mb-6 text-center">Přihlášení</h1>

		{#if form?.error}
			<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
				{form.error}
			</div>
		{/if}

		{#if form?.success}
			<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
				{form.success}
			</div>
		{/if}

		<form method="POST" use:enhance class="space-y-4">
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-700 mb-2">
					Heslo
				</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
			>
				Přihlásit se
			</button>
		</form>

		<p class="mt-4 text-center text-gray-600">
			Nemáte účet?
			<a href="/auth/register" class="text-blue-600 hover:underline">Zaregistrujte se</a>
		</p>
	</div>
</div>
