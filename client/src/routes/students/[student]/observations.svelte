<script>
	import { page } from '$app/stores';
	import Spinner from '$lib/components/Spinner.svelte';
	import { fetcher } from '$lib/fetcher';
	import CreateObservation from '$lib/modals/observation/CreateObservation.svelte';
	import DeleteObservation from '$lib/modals/observation/DeleteObservation.svelte';
	import EditObservation from '$lib/modals/observation/EditObservation.svelte';
	import ViewObservation from '$lib/modals/observation/ViewObservation.svelte';
	import { userStore } from '$lib/stores';
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import * as animateScroll from 'svelte-scrollto';
	import Stairs from '$lib/loaders/Stairs.svelte';

	const refetchPage = getContext('refetchPage');
	const [[observations], loading, error, refetch, update, progress, controller] = fetcher([
		`http://localhost:4000/students/${$page.params.student}/observations`
	]);
	$refetchPage = refetch;

	function handleCreate(event) {
		update($observations, [...$observations, event.detail]);
		animateScroll.scrollToBottom({ delay: 200 });
	}

	function handleEdit(event) {
		update(
			$observations,
			$observations.map((observation) => {
				if (observation._id === event.detail._id) return event.detail;
				return observation;
			})
		);
	}

	function handleDelete(event) {
		update(
			$observations,
			$observations.filter((observation) => observation._id !== event.detail._id)
		);
	}

	onDestroy(() => {
		controller.abort();
	});
</script>

<svelte:head>
	<title>Observaciones del alumno • Tecmilenio</title>
</svelte:head>

<div class="container">
	{#if $loading}
		<div in:fade={{ duration: 200 }} out:slide|local={{ duration: 200 }} class="loader">
			<Stairs />
			<h1>Cargando</h1>
			{$progress}%
		</div>
	{:else if $error}
		<span>Something went wrong</span>
	{:else}
		<div in:fade={{ duration: 200 }} class="container">
			{#if $userStore.role !== 'Usuario'}
				<CreateObservation on:request={handleCreate} />
			{/if}

			{#each $observations as observation}
				<div out:fade|local={{ duration: 200 }} class="button">
					<ViewObservation {observation} />
					{#if $userStore.role !== 'Usuario'}
						<EditObservation {observation} on:request={handleEdit} />
						<DeleteObservation {observation} on:request={handleDelete} />
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	div.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	div.button {
		display: flex;
		width: 100%;
		border: 2px solid var(--border-color);
	}

	div.loader {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
</style>
