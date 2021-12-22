<script>
	import { onDestroy, setContext } from 'svelte';
	import { fetcher } from '$lib/fetcher';
	import Stairs from '$lib/loaders/Stairs.svelte';
	import { fade } from 'svelte/transition';

	const [[actions], loading, error, refetch, update, progress, controller] = fetcher(
		[`http://localhost:4000/admin/actions`],
		{ alwaysFetch: true }
	);

	onDestroy(() => {
		controller.abort();
	});
</script>

<div class="container">
	{#if $loading}
		<div in:fade={{ duration: 400 }} out:fade|local={{ duration: 200 }} class="loader">
			<Stairs />
			<h1>Cargando</h1>
			{$progress}%
		</div>
	{:else if $error}
		<span>Something went wrong {$error}</span>
	{:else}
		{JSON.stringify($actions)}
	{/if}
</div>

<style>
	div.container {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	div.loader {
		position: absolute;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 6rem;
	}
</style>
