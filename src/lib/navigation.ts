import { goto } from '$app/navigation';

export function nextWeek(date: string) {
	let currentDate = new Date(date);
	var nextDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

	// TODO: a workaround to reload the page
	goto('/blank').then(() => {
		goto(`/home?date=${nextDate.toISOString().slice(0, 10)}`);
	});
}

export function prevWeek(date: string) {
	let currentDate = new Date(date);
	var prevDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
	goto('/blank').then(() => {
		goto(`/home?date=${prevDate.toISOString().slice(0, 10)}`);
	});
}

export function currentWeek() {
	goto('/blank').then(() => {
		goto('/home');
	});
}
