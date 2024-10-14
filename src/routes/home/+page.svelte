<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import {
		queryHomework,
		querySchedule,
		queryStudent,
		type DaySchedule,
		type Homework,
		type Student
	} from '$lib/api';

	export let data: PageData;
	const token = data.tkn;

	let st: Student | null = null;
	let sc: DaySchedule[] = [];

	onMount(async () => {
		st = await queryStudent(token);
		sc = await querySchedule(token, st.id);
		for (let day in sc) {
			let dayHW = await queryHomework(token, st.id, sc[day].date.split('T')[0]);
			console.log(dayHW);

			for (let l in sc[day].lessons) {
				sc[day].lessons[l].homework = dayHW.find(
					(h) => h.lessonNumber == sc[day].lessons[l].number
				);
			}
		}
		console.log(sc[0].lessons[0].homework?.description);
	});
</script>

<div class=" flex w-fit flex-col md:h-screen md:flex-wrap">
	{#each sc as day}
		<div class=" m-3 w-80 rounded-xl bg-white p-3">
			<p class=" text-center text-slate-700">{day.weekdayName}</p>
			{#each day.lessons as l}
				<hr class=" border-slate-900" />
				<div class="mb-3">
					<p class=" ">{l.lessonName}</p>
					{#if l.homework}
						<p class="break-words text-slate-500">{l.homework?.description}</p>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<p>Loading...</p>
	{/each}
</div>

<button
	class=" m-5 h-10 w-60 rounded-xl bg-slate-600 text-white"
	on:click={() => {
		goto('/login?revoke');
	}}>Log out</button
>
