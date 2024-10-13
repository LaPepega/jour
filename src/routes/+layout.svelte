<script>
	import { DarkMode } from '$lib/stores';
	import '../app.css';
</script>

<head>
	<title>Jrn</title>
</head>

<div
	class="h-fit w-screen bg-slate-200 dark:bg-slate-900 dark:text-white {$DarkMode ? 'dark' : ''}"
>
	<slot />
</div>
