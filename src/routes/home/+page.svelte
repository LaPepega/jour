<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { querySchedule, queryStudent } from '$lib/api';

	export let data: PageData;
	const token = data.tkn;
</script>

<div class=" flex w-fit flex-col self-center lg:h-screen lg:flex-wrap">
	{#await queryStudent(token)}
		<p>Fetching student...</p>
	{:then st}
		{#await querySchedule(token, st.id)}
			<p>Fetching schedule...</p>
		{:then sc}
			{#each sc as d}
				<div class=" m-3 w-80 rounded-xl bg-white p-3">
					<p class=" text-center text-slate-700">{d.weekdayName}</p>
					{#each d.lessons as l}
						<p class=" w-20">{l.lessonName}</p>
						<br />
					{/each}
				</div>
			{/each}
		{:catch esc}
			<p>Error: {esc}</p>
		{/await}
	{:catch es}
		<p>Error: {es}</p>
	{/await}
</div>

<button
	class=" m-5 h-10 w-60 rounded-xl bg-slate-600 text-white"
	on:click={() => {
		goto('/login?revoke');
	}}>Log out</button
>
