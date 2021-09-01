<script lang="ts">
	import CreateArchive from '$lib/modals/archive/CreateArchive.svelte';
	import DeleteArchive from '$lib/modals/archive/DeleteArchive.svelte';
	import EditArchive from '$lib/modals/archive/EditArchive.svelte';
	import ViewArchive from '$lib/modals/archive/ViewArchive.svelte';
	import CreateObservation from '$lib/modals/observation/CreateObservation.svelte';
	import DeleteObservation from '$lib/modals/observation/DeleteObservation.svelte';
	import EditObservation from '$lib/modals/observation/EditObservation.svelte';
	import ViewObservation from '$lib/modals/observation/ViewObservation.svelte';
	import { onMount, setContext } from 'svelte';

	let isPending = true;
	let error = null;
	let observations = [
		{
			name: 'Acta de nacimiento con nombre muy largo',
			comment: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor '
		},
		{
			name: 'Certificado bachillerato etcetera',
			comment: 'Something about this idk'
		},
		{
			name: 'CURP',
			comment: 'Something about this idk'
		}
	];

	function fetchData() {
		/*
      * ! something
      TODO: fetch request to /documents/[category] for category 
		description based on url param and all templates where category = [category]
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((res) => res.json())
			.then((data) => {
				isPending = false;
				error = null;
				categories = data;
			})
			.catch((err) => {
				isPending = false;
				error = err;
			});
			*/
		isPending = false;
		console.log('A fetch has been done at /candidates/[candidate]/observations.svelte');
	}
	setContext('refetch', fetchData);
	onMount(() => {
		fetchData();
	});
</script>

<svelte:head>
	<title>Observaciones del candidato • Tecmilenio</title>
</svelte:head>

<template>
	<div class="container">
		{#if isPending}
			<span>Loading...</span>
		{:else if error}
			<span>Something went wrong</span>
		{:else}
			<CreateObservation />

			{#each observations as observation}
				<div class="button">
					<ViewObservation {observation} />
					<EditObservation {observation} />
					<DeleteObservation {observation} />
				</div>
			{/each}
		{/if}
	</div>
</template>

<style lang="scss">
	div {
		&.container {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		&.button {
			display: flex;
			width: 100%;
		}
	}
</style>
