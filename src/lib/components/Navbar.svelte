<script lang="ts">
	import type { DaySchedule } from '$lib/api';
	import { currentWeek, nextWeek, prevWeek } from '$lib/navigation';
	import { DarkMode } from '$lib/stores';
	import DarkThemeIcon from './DarkThemeIcon.svg.svelte';

	export let schedule: DaySchedule[];
	export let currentPageDate: string;

	export let showAverage: boolean = false;
</script>

<div
	class="fixed flex h-10 w-full items-center justify-between bg-white align-middle dark:bg-slate-700"
>
	<button
		class="dark:invert"
		on:click={() => {
			showAverage = !showAverage;
		}}><img src="/avg.png" width="50" alt="avg" /></button
	>
	<div class="inline-flex">
		{#if schedule[0] && schedule[schedule.length - 1]}
			<button
				class="mx-2 h-fit rounded-full bg-slate-500 px-2 text-white"
				on:click={() => {
					prevWeek(currentPageDate);
				}}>&lt;&lt;</button
			>
			<button on:click={currentWeek} class=" dark:text-white">
				{schedule[0].date.split('T')[0]} &#x2022 {schedule[schedule.length - 1].date.split('T')[0]}
			</button>
			<button
				class="mx-2 h-fit rounded-full bg-slate-500 px-2 text-white"
				on:click={() => {
					nextWeek(currentPageDate);
				}}>&gt;&gt;</button
			>
		{/if}
	</div>
	<button
		class="mx-1 dark:invert"
		on:click={() => {
			DarkMode.set(!$DarkMode);
		}}><DarkThemeIcon size="25" /></button
	>
</div>
