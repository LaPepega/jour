<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { querySchedule, queryStudent, type DaySchedule, type Student } from '$lib/api';

	export let data: PageData;
	const token = data.tkn;

	let st: Student | null = null;
	let sc: DaySchedule[] = [];

	onMount(async () => {
		st = await queryStudent(token);
		sc = await querySchedule(token, st.id);
	});
</script>

<div class=" flex w-fit flex-col md:h-screen md:flex-wrap">
	{#each sc as d}
		<div class=" m-3 w-80 rounded-xl bg-white p-3">
			<p class=" text-center text-slate-700">{d.weekdayName}</p>
			{#each d.lessons as l}
				<p class=" mb-3 w-20 text-sm">{l.lessonName}</p>
			{/each}
		</div>
	{:else}
		<p>loadin</p>
	{/each}
</div>

<button
	class=" m-5 h-10 w-60 rounded-xl bg-slate-600 text-white"
	on:click={() => {
		goto('/login?revoke');
	}}>Log out</button
>
