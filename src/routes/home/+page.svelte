<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	function revokeRedir() {
		goto('/login?revoke');
	}
</script>

<div class="flex flex-row">
	<h1 class="p-5 text-3xl">Welcome! Your token is {data.tkn}</h1>
	<button class=" m-5 h-10 w-60 rounded-xl bg-slate-600 text-white" on:click={revokeRedir}
		>Revoke it!</button
	>
</div>
