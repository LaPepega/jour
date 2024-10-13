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
		/*for (let day of sc) {
			let dayHW = await queryHomework(token, st.id, day.date.split('T')[0]);
			console.log(dayHW);

			for (let lesson of day.lessons) {
				for (let hw of dayHW) {
					if (hw.lessonNumber == lesson.number) {
						lesson.homework = hw;
					}
				}
				console.log(lesson.homework?.description);
			}
		}*/
	});
</script>

<div class=" flex w-fit flex-col md:h-screen md:flex-wrap">
	{#each sc as day}
		<div class=" m-3 table w-80 rounded-xl bg-white p-3">
			<p class=" text-center text-slate-700">{day.weekdayName}</p>
			{#each day.lessons as l}
				<div class="mb-3 table-row">
					<p class=" table-cell w-20">{l.lessonName}</p>
					<!---<p class=" table-cell">{l.homework?.description}</p>--->
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
