<script lang="ts">
	import CreateArchive from '$lib/modals/archive/CreateArchive.svelte';
	import DeleteArchive from '$lib/modals/archive/DeleteArchive.svelte';
	import EditArchive from '$lib/modals/archive/EditArchive.svelte';
	import ViewArchive from '$lib/modals/archive/ViewArchive.svelte';
	import { onMount, setContext } from 'svelte';

	let isPending = true;
	let error = null;
	let archives = [
		{
			name: 'Acta de nacimiento con nombre muy largo',
			description: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor ',
			file: null
		},
		{
			name: 'Certificado bachillerato etcetera',
			description: 'Something about this idk',
			file: null
		},
		{
			name: 'CURP',
			description: 'Something about this idk',
			file: null
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
		console.log('A fetch has been done at /candidates/[candidate]/archives.svelte');
	}
	setContext('refetch', fetchData);
	onMount(() => {
		fetchData();
	});
</script>

<svelte:head>
	<title>Archivos del candidato • Tecmilenio</title>
</svelte:head>

<template>
	<div class="container">
		{#if isPending}
			<span>Loading...</span>
		{:else if error}
			<span>Something went wrong</span>
		{:else}
			<CreateArchive />

			{#each archives as archive}
				<div class="button">
					<ViewArchive {archive} />
					<EditArchive {archive} />
					<DeleteArchive {archive} />
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
