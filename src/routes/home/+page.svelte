<script lang="ts">
	// TODO: make this at least somewhat readable
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import {
		queryGrades,
		queryHomework,
		querySchedule,
		queryStudent,
		type DaySchedule,
		type Lesson,
		type Student
	} from '$lib/api';
	import { currentWeek, nextWeek, prevWeek } from '$lib/navigation';

	export let data: PageData;
	const token = data.tkn;
	const date = data.date;

	let st: Student | null = null;
	let sc: DaySchedule[] = [];

	// Yes i actually have to do this because of how bad the api is >:(
	function timeSpanString(l: Lesson): string {
		return l.beginHour && l.beginMinute && l.endHour && l.endMinute
			? `${l.beginHour}:${l.beginMinute} - ${l.endHour}:${l.endMinute}`
			: '';
	}

	function gradeColor(g: any): string {
		// FIXME: for some reason svelte passes g as string[]
		switch (g[0]) {
			case '0':
				return 'text-red-600';

			case '2':
				return 'text-red-600';

			case '3':
				return 'text-orange-600';

			case '4':
				return 'text-green-600';

			case '5':
				return 'text-blue-600';

			default:
				return '';
		}
	}

	onMount(async () => {
		st = await queryStudent(token);
		sc = await querySchedule(token, st.id, date);

		let weekGR = await queryGrades(token, st.id, sc[0].date.split('T')[0]);
		for (let day in sc) {
			let dayHW = await queryHomework(token, st.id, sc[day].date.split('T')[0]);
			for (let l in sc[day].lessons) {
				sc[day].lessons[l].homework = dayHW.find(
					(h) => h.lessonNumber === sc[day].lessons[l].number
				);
				sc[day].lessons[l].grades = weekGR.find(
					(g) =>
						g.date === sc[day].date.split('T')[0] && g.lessonNumber === sc[day].lessons[l].number
				)?.grades;
			}
		}
	});
</script>

<div class="fixed flex h-10 w-full items-center justify-center bg-white align-middle">
	<div class="inline-flex">
		{#if sc[0] && sc[sc.length - 1]}
			<button
				class="mx-3 h-fit rounded-full bg-slate-600 px-2 text-white"
				on:click={() => {
					prevWeek(date);
				}}>&lt;&lt;</button
			>
			<button on:click={currentWeek}>
				{sc[0].date.split('T')[0]} &#x2022 {sc[sc.length - 1].date.split('T')[0]}
			</button>
			<button
				class="mx-3 h-fit rounded-full bg-slate-600 px-2 text-white"
				on:click={() => {
					nextWeek(date);
				}}>&gt;&gt;</button
			>
		{/if}
	</div>
</div>

<div class="flex w-fit flex-col pt-10 md:h-screen md:flex-wrap">
	{#each sc as day}
		<div class=" m-3 w-80 rounded-xl bg-white p-3">
			<div class="mb-2 flex justify-between">
				<p class=" text-right text-lg text-slate-700">{day.weekdayName}</p>
				<p class=" text-left text-lg">{day.date.split('T')[0]}</p>
			</div>
			{#each day.lessons as l}
				<hr class=" border-slate-900" />
				<div class="mb-3">
					<p class="">{timeSpanString(l)} {l.lessonName}</p>
					{#if l.homework}
						<p class="break-words text-slate-500">{l.homework?.description}</p>
					{/if}
					{#if l.grades}
						<div class="inline-flex">
							{#each l.grades as g}
								<!-- FIXME: for some reason svelte passes g as string[]-->
								<p class={gradeColor(g)}>{g}</p>
							{/each}
						</div>
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
