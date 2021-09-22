<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '$lib/components/Icon.svelte';
	import FileDocumentMultiple from '$lib/icons/file-document-multiple.svelte';
	import CreateTemplate from '$lib/modals/template/CreateTemplate.svelte';
	import DeleteTemplate from '$lib/modals/template/DeleteTemplate.svelte';
	import EditTemplate from '$lib/modals/template/EditTemplate.svelte';
	import ViewTemplate from '$lib/modals/template/ViewTemplate.svelte';
	import DeleteCategory from '$lib/modals/Category/DeleteCategory.svelte';
	import EditCategory from '$lib/modals/Category/EditCategory.svelte';
	import { onMount, setContext } from 'svelte';
	import { Buffer } from 'buffer';

	let isPending = true;
	let error = null;
	let category;
	let templates = [];

	function convertDataToFile(data, name) {
		let buffer = Buffer.from(data);
		let arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
		let file = new File([arrayBuffer], name + '.pdf', {
			type: 'application/pdf'
		});
		return file;
	}

	function fetchData() {
		isPending = true;
		Promise.all([
			fetch(`http://localhost:4000/documents/${$page.params.category}`).then((res) => res.json()),
			fetch(`http://localhost:4000/documents/${$page.params.category}/templates`).then((res) =>
				res.json()
			)
		])
			.then(([dataCategory, dataTemplates]) => {
				if (dataCategory.warning) {
					error = dataCategory.warning;
					isPending = false;
					return;
				}
				error = null;
				category = dataCategory;
				templates = dataTemplates;

				// Converts data to files
				templates.forEach(
					(template) => (template.example = convertDataToFile(template.example, template._id))
				);
				isPending = false;
			})
			.catch((err) => {
				error = err;
				isPending = false;
			});
	}
	setContext('refetchCategory', fetchData);
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
			<span>Something went wrong: {error}</span>
		{:else}
			<div class="content">
				<div class="category">
					<div class="title">
						<div class="icon"><Icon src={FileDocumentMultiple} size={'28'} /></div>
						<div>
							{category.name}
						</div>
					</div>
					<div class="buttons">
						<EditCategory {category} />
						<DeleteCategory />
					</div>
				</div>
				<div class="description">
					<div class="tag">Descripción</div>
					<div>{category.description}</div>
				</div>
			</div>

			<CreateTemplate />
			{#key templates}
				{#each templates as template}
					<div class="button">
						<ViewTemplate {template} />
						<EditTemplate {template} />
						<DeleteTemplate {template} />
					</div>
				{/each}
			{/key}
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

		&.icon {
			display: flex;
			align-items: center;
		}

		&.content {
			overflow-wrap: anywhere;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			background-color: var(--input-color);
			border: 2px solid var(--border-color);
		}

		&.tag {
			color: var(--focus-color);
		}

		&.title {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			font-size: 1.2rem;
			padding-top: 1rem;
		}

		&.buttons {
			display: flex;
			align-items: center;
		}

		&.category {
			display: flex;
			justify-content: space-between;
			padding-left: 1rem;
		}

		&.description {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			padding: 0 1rem 1rem 1rem;
		}
	}
</style>
