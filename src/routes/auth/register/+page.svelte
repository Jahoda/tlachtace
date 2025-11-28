<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<div class="max-w-md mx-auto">
	<div class="bg-white rounded-lg shadow-md p-8">
		<h1 class="text-3xl font-bold mb-6 text-center">Registrace</h1>

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
				<label for="username" class="block text-sm font-medium text-gray-700 mb-2">
					Uživatelské jméno
				</label>
				<input
					type="text"
					id="username"
					name="username"
					required
					minlength="3"
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>

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
					minlength="6"
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>

			<div>
				<label for="password_confirm" class="block text-sm font-medium text-gray-700 mb-2">
					Potvrzení hesla
				</label>
				<input
					type="password"
					id="password_confirm"
					name="password_confirm"
					required
					minlength="6"
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
			>
				Zaregistrovat se
			</button>
		</form>

		<p class="mt-4 text-center text-gray-600">
			Už máte účet?
			<a href="/auth/login" class="text-blue-600 hover:underline">Přihlaste se</a>
		</p>
	</div>
</div>
