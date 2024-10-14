<script lang="ts">
	import { goto } from '$app/navigation';
	import DarkThemeIcon from '$lib/DarkThemeIcon.svg.svelte';
	import { DarkMode } from '$lib/stores';

	let token: string;
	function setCookieRedir() {
		goto(`/login?token=${token}`);
	}
</script>

<button
	class="absolute bottom-5 right-5 dark:invert"
	on:click={() => {
		DarkMode.set(!$DarkMode);
	}}><DarkThemeIcon size="25" /></button
>

<div class="flex h-screen w-screen items-center justify-center">
	<div
		class=" min-h-40 min-w-80 place-content-stretch space-y-2 rounded-xl bg-white p-5 dark:bg-slate-800"
	>
		<h1 class="mb-4 text-center text-2xl dark:text-slate-300">Jrn - dnevnik, but good :)</h1>
		<input
			type="text"
			placeholder="Your bearer token"
			class=" h-10 w-full rounded-xl px-3 dark:bg-slate-700"
			style="border: 2px solid rgb(71 85 105);"
			bind:value={token}
		/>
		<button class=" h-10 w-full rounded-xl bg-slate-600 text-white" on:click={setCookieRedir}
			>Login</button
		>
	</div>
</div>
