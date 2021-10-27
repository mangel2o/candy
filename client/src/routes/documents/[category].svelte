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
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import { convertDataToFile } from '$lib/utils';
	import Spinner from '$lib/components/Spinner.svelte';
	import * as animateScroll from 'svelte-scrollto';
	import { fade, slide } from 'svelte/transition';
	import { fetcher } from '$lib/fetcher';
	import Stairs from '$lib/loaders/Stairs.svelte';
	import Reload from '$lib/icons/reload.svelte';

	const categories = getContext('categories');
	const updateCategories = getContext('updateCategories');
	const [[category, templates], loading, error, refetch, update, progress, controller] = fetcher(
		[
			`http://localhost:4000/documents/${$page.params.category}`,
			`http://localhost:4000/documents/${$page.params.category}/templates`
		],
		{
			edit: ([category, templates]) => {
				// Converts data to files
				templates.data.forEach((template) => {
					template.example = convertDataToFile(template.example, template._id);
				});
				return [category, templates];
			}
		}
	);

	function handleCreateTemplate(event) {
		update($templates, [...$templates, event.detail]);
		animateScroll.scrollToBottom({ delay: 200 });
	}

	function handleEditTemplate(event) {
		update(
			$templates,
			$templates.map((category) => {
				if (category._id === event.detail._id) return event.detail;
				return category;
			})
		);
	}

	function handleDeleteTemplate(event) {
		update(
			$templates,
			$templates.filter((template) => template._id !== event.detail._id)
		);
	}

	function handleEditCategory(event) {
		updateCategories(
			$categories,
			$categories.map((category) => {
				if (category._id === event.detail._id) return event.detail;
				return category;
			})
		);

		update($category, event.detail);
	}

	function handleDeleteCategory(event) {
		updateCategories(
			$categories,
			$categories.filter((category) => category._id !== event.detail._id)
		);
	}

	onDestroy(() => {
		controller.abort();
	});
</script>

<div class="container">
	{#if $loading}
		<div in:fade={{ duration: 200 }} out:slide|local={{ duration: 200 }} class="loader">
			<Stairs />
			<h1>Cargando</h1>
			{$progress}
		</div>
	{:else if $error}
		<span>Something went wrong: {$error}</span>
	{:else}
		<div in:fade={{ duration: 200 }} out:slide|local={{ duration: 200 }} class="content">
			<div class="category">
				<div class="title">
					<div class="icon"><Icon src={FileDocumentMultiple} size={'28'} /></div>
					<div>
						{$category.name}
					</div>
				</div>
				<div class="category-buttons">
					<EditCategory category={$category} on:request={handleEditCategory} />
					<DeleteCategory on:request={handleDeleteCategory} />
					<button on:click={refetch}>
						<Icon src={Reload} />
					</button>
				</div>
			</div>
			<div class="description">
				<div class="tag">Descripción</div>
				<div>{$category.description}</div>
			</div>
		</div>

		<CreateTemplate on:request={handleCreateTemplate} />
		<div class="template-buttons" in:fade={{ duration: 200 }} out:slide|local={{ duration: 200 }}>
			{#each $templates as template (template._id)}
				<div in:fade={{ duration: 200 }} out:slide|local={{ duration: 200 }} class="button">
					<ViewTemplate {template} />
					<EditTemplate {template} on:request={handleEditTemplate} />
					<DeleteTemplate {template} on:request={handleDeleteTemplate} />
				</div>
			{/each}
		</div>
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

	button {
		padding: 1rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		background-color: var(--input-color);
	}
	button:hover {
		background-color: var(--area-color);
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

	div.category-buttons {
		display: flex;
		align-items: center;
	}

	div.template-buttons {
		display: flex;
		flex-flow: column;
		gap: 1rem;
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

	div.loader {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
</style>
