<script>
	import { page } from '$app/stores';
	import Spinner from '$lib/components/Spinner.svelte';
	import CreateObservation from '$lib/modals/observation/CreateObservation.svelte';
	import DeleteObservation from '$lib/modals/observation/DeleteObservation.svelte';
	import EditObservation from '$lib/modals/observation/EditObservation.svelte';
	import ViewObservation from '$lib/modals/observation/ViewObservation.svelte';
	import { userStore } from '$lib/stores';
	import { onMount, setContext } from 'svelte';
	import { fade } from 'svelte/transition';

	let observations = [];
	let isPending = true;
	let error = null;

	function fetchData() {
		isPending = true;
		fetch(`http://localhost:4000/candidates/${$page.params.candidate}/observations`)
			.then((res) => res.json())
			.then((data) => {
				observations = data;
				error = null;
				isPending = false;
			})
			.catch((err) => {
				error = err.message;
				isPending = false;
			});
	}
	setContext('refetchObservations', fetchData);
	onMount(() => {
		fetchData();
	});
</script>

<svelte:head>
	<title>Observaciones del candidato • Tecmilenio</title>
</svelte:head>

<div class="container">
	{#if isPending}
		<div class="spinner">
			<Spinner />
		</div>
	{:else if error}
		<span>Something went wrong</span>
	{:else}
		<div in:fade={{ duration: 200 }} class="container">
			{#if $userStore.role !== 'user'}
				<CreateObservation />
			{/if}

			{#each observations as observation}
				<div out:fade|local={{ duration: 200 }} class="button">
					<ViewObservation {observation} />
					{#if $userStore.role !== 'user'}
						<EditObservation {observation} />
						<DeleteObservation {observation} />
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

	div.spinner {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 16rem;
	}
</style>
