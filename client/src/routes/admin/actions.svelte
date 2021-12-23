<script>
	import { onDestroy, setContext } from 'svelte';
	import { fetcher } from '$lib/fetcher';
	import Stairs from '$lib/loaders/Stairs.svelte';
	import { fade } from 'svelte/transition';
	import ActionsList from '$lib/components/ActionsList.svelte';
	import ActionsEntries from '$lib/components/ActionsEntries.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Reload from '$lib/icons/reload.svelte';

	const [[actions], loading, error, refetch, update, progress, controller] = fetcher(
		[`http://localhost:4000/admin/actions`],
		{ alwaysFetch: true }
	);

	let entries = 100;

	onDestroy(() => {
		controller.abort();
	});
</script>

<div class="container">
	<div class="options">
		<ActionsEntries bind:actionsEntries={entries} />
		<button on:click={refetch}>
			<Icon src={Reload} />
		</button>
	</div>
	{#if $loading}
		<div in:fade={{ duration: 400 }} out:fade|local={{ duration: 200 }} class="loader">
			<Stairs />
			<h1>Cargando</h1>
			{$progress}%
		</div>
	{:else if $error}
		<span>Something went wrong {$error}</span>
	{:else}
		<ActionsList actions={$actions.slice(0, entries)} />
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
	div.options {
		display: flex;
		gap: 1rem;
		width: 100%;
		justify-content: space-between;
	}

	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 14px;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}
	button:hover {
		border: 2px solid var(--blue-color);
	}

	button:active {
		border: 2px solid var(--green-color);
	}
</style>
