<script lang="ts">
	import { ISODate, type DaySchedule, type Lesson } from '$lib/api';

	export let schedule: DaySchedule[];

	// Yes i actually have to do this because of how bad the api is >:(
	function timeSpanString(l: Lesson): string {
		return l.beginHour && l.beginMinute && l.endHour && l.endMinute
			? `${l.beginHour}:${l.beginMinute} - ${l.endHour}:${l.endMinute}`
			: '';
	}

	function gradeColor(g: any): string {
		//  for some reason svelte passes g as string[]
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
				return 'text-blue-600 dark:text-blue-400';

			default:
				return '';
		}
	}
</script>

<div class="flex w-fit flex-col pt-10 md:h-screen md:flex-wrap">
	{#each schedule as day}
		<div class=" m-3 w-80 rounded-xl bg-white p-3 dark:bg-slate-800 dark:text-slate-200">
			<div class="mb-2 flex justify-between">
				<p class=" text-right text-lg text-slate-700 dark:text-slate-200">{day.weekdayName}</p>
				<p class=" text-left text-lg">{ISODate(day)}</p>
			</div>
			{#each day.lessons as l}
				<hr class=" border-slate-900 dark:border-slate-500" />
				<div class="mb-3">
					<p class="">{timeSpanString(l)} {l.lessonName}</p>
					{#if l.homework}
						<p class="break-words text-slate-500 dark:text-slate-400">{l.homework?.description}</p>
					{/if}
					{#if l.grades}
						<div class="inline-flex">
							{#each l.grades as g}
								<!-- for some reason svelte passes g as string[]-->
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
