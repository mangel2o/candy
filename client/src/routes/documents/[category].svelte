<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$lib/components/Icon.svelte';
	import FileDocumentMultiple from '$lib/icons/file-document-multiple.svelte';
	import CreateTemplate from '$lib/modals/template/CreateTemplate.svelte';
	import DeleteTemplate from '$lib/modals/template/DeleteTemplate.svelte';
	import EditTemplate from '$lib/modals/template/EditTemplate.svelte';
	import ViewTemplate from '$lib/modals/template/ViewTemplate.svelte';
	import { onMount, setContext } from 'svelte';

	let isPending = true;
	let error = null;
	let category = {
		name: 'General',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor '
	};

	let templates = [
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
		console.log('A fetch has been done at /documents/[category]/index.svelte');
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
	<div class="container">
		{#if isPending}
			<span>Loading...</span>
		{:else if error}
			<span>Something went wrong</span>
		{:else}
			<div class="content">
				<div class="field">
					<div class="title">
						<div><Icon src={FileDocumentMultiple} size={'28'} /></div>
						<div>{category.name}</div>
					</div>
				</div>
				<div class="field">
					<div class="tag">Descripción</div>
					<div>{category.description}</div>
				</div>
			</div>

			<CreateTemplate />

			{#each templates as template}
				<div class="button">
					<ViewTemplate {template} />
					<EditTemplate {template} />
					<DeleteTemplate {template} />
				</div>
			{/each}
		{/if}
	</div>
</template>

<style lang="scss">
	div {
		&.container {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		&.button {
			display: flex;
			width: 100%;
		}

		&.content {
			overflow-wrap: anywhere;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			padding: 1rem;
			background-color: var(--input-color);
			border: 2px solid var(--border-color);
		}

		&.field {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		&.tag {
			color: var(--focus-color);
		}

		&.title {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-size: 1.2rem;
		}
	}
</style>
