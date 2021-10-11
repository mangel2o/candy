<script>
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
	import { convertDataToFile } from '$lib/utils';
	import Spinner from '$lib/components/Spinner.svelte';
	import { fade } from 'svelte/transition';

	let isPending = true;
	let error = null;
	let category;
	let templates = [];

	function fetchData() {
		Promise.all([
			fetch(`http://localhost:4000/documents/${$page.params.category}`).then((res) => res.json()),
			fetch(`http://localhost:4000/documents/${$page.params.category}/templates`).then((res) =>
				res.json()
			)
		])
			.then(([dataCategory, dataTemplates]) => {
				if (dataCategory.error) {
					error = dataCategory.error;
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
		isPending = true;
		fetchData();
	});
</script>

<div class="container">
	{#if isPending}
		<div class="spinner">
			<Spinner />
		</div>
	{:else if error}
		<span>Something went wrong: {error}</span>
	{:else}
		<div transition:fade|local={{ duration: 200 }} class="content">
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
		{#each templates as template (template._id)}
			<div in:fade={{ duration: 200 }} out:fade|local={{ duration: 200 }} class="button">
				<ViewTemplate {template} />
				<EditTemplate {template} />
				<DeleteTemplate {template} />
			</div>
		{/each}
	{/if}
</div>

<style>
	div.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	div.button {
		display: flex;
		border: 2px solid var(--border-color);
		width: 100%;
	}

	div.icon {
		display: flex;
		align-items: center;
	}

	div.content {
		overflow-wrap: anywhere;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}

	div.tag {
		color: var(--focus-color);
	}

	div.title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.2rem;
		padding-top: 1rem;
	}

	div.buttons {
		display: flex;
		align-items: center;
	}

	div.category {
		display: flex;
		justify-content: space-between;
		padding-left: 1rem;
	}

	div.description {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0 1rem 1rem 1rem;
	}

	div.spinner {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 10rem;
	}
</style>
