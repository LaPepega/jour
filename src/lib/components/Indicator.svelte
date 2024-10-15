<script lang="ts">
	export let state: boolean = false;
	export let size: number = 10;
	let stateColor: string;
	let sizePx: string;
	$: stateColor = state ? '#AAFF00' : '#EE4B2B';
	$: sizePx = `${size}px`;
</script>

<svg
	width={sizePx}
	height={sizePx}
	viewBox="0 0 64 64"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	aria-hidden="true"
	role="img"
	class="iconify iconify--emojione"
	preserveAspectRatio="xMidYMid meet"
	><circle cx="32" cy="32" r="30" fill={stateColor}></circle></svg
>
