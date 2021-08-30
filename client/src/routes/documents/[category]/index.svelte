<script lang="ts">
	import { page } from '$app/stores';
	import CreateTemplate from '$lib/modals/template/CreateTemplate.svelte';
	import DeleteTemplate from '$lib/modals/template/DeleteTemplate.svelte';
	import EditTemplate from '$lib/modals/template/EditTemplate.svelte';
	import ViewTemplate from '$lib/modals/template/ViewTemplate.svelte';
	import { onMount, setContext } from 'svelte';

	let isPending = false;
	let error = null;
	let templates = [
		{
			name: 'Acta de nacimiento con nombre muy largo',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. »',
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
      TODO: fetch request at [category] page
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
		console.log('A fetch has been done');
	}

	setContext('refetch', fetchData);
	onMount(() => {
		fetchData();
	});
</script>

<svelte:head>
	<title>Documentos {$page.params.category} • Tecmilenio</title>
</svelte:head>

<template>
	<CreateTemplate />

	{#if isPending}
		<span>Loading...</span>
	{:else if error}
		<span>Something went wrong</span>
	{:else}
		{#each templates as template}
			<div>
				<ViewTemplate {template} />
				<EditTemplate {template} />
				<DeleteTemplate {template} />
			</div>
		{/each}
	{/if}
</template>

<style lang="scss">
	div {
		display: flex;
		width: 100%;
	}
</style>
