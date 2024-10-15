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
		type Student
	} from '$lib/api';

	import Navbar from '$lib/components/Navbar.svelte';
	import Home from '$lib/components/Home.svelte';
	import Average from '$lib/components/Average.svelte';

	export let data: PageData;
	const token = data.tkn;
	const pageDate = data.date;

	let st: Student | null = null;
	let sc: DaySchedule[] = [];

	let showAverage: boolean = false;

	function ISODate(day: DaySchedule) {
		return day.date.split('T')[0];
	}

	onMount(async () => {
		st = await queryStudent(token);
		sc = await querySchedule(token, st.id, pageDate);

		// Grades can only be requested for the whole week,
		// Passing any day of the week is ok but I prefer Mondays
		let weekGR = await queryGrades(token, st.id, ISODate(sc[0]));
		for (let day in sc) {
			// Homework can be requested for each specific day
			let dayHW = await queryHomework(token, st.id, ISODate(sc[day]));

			// Assigning grades and homeworks to their lessons
			// according to lesson number property in both
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

<Navbar currentPageDate={pageDate} schedule={sc} bind:showAverage />

{#if showAverage}
	<Average />
{:else}
	<Home schedule={sc} />
{/if}

<button
	class=" m-5 h-10 w-60 rounded-xl bg-slate-600 text-white"
	on:click={() => {
		goto('/login?revoke');
	}}>Log out</button
>
