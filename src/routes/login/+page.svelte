<script lang="ts">
	import { goto } from '$app/navigation';

	let token: string;
	function setCookieRedir() {
		goto(`/login?token=${token}`);
	}
</script>

<div class="flex h-screen w-screen items-center justify-center">
	<div class=" min-h-40 min-w-80 place-content-stretch space-y-2 rounded-xl bg-white p-5">
		<h1 class="mb-4 text-center text-2xl">Jrn - dnevnik, but good :)</h1>
		<input
			type="text"
			placeholder="Your bearer token"
			class=" h-10 w-full rounded-xl px-3"
			style="border: 2px solid rgb(71 85 105);"
			bind:value={token}
		/>
		<button class=" h-10 w-full rounded-xl bg-slate-600 text-white" on:click={setCookieRedir}
			>Login</button
		>
	</div>
</div>
