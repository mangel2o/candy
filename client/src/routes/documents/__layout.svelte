<script>
	import { page } from '$app/stores';
	import ButtonCategory from '$lib/components/ButtonCategory.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { fetcher } from '$lib/fetcher';
	import Reload from '$lib/icons/reload.svelte';
	import Stairs from '$lib/loaders/Stairs.svelte';
	import CreateCategory from '$lib/modals/category/CreateCategory.svelte';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import * as animateScroll from 'svelte-scrollto';
	import { goto } from '$app/navigation';

	const [[categories], loading, error, refetch, update, progress, controller] = fetcher([
		`http://localhost:4000/documents`
	]);

	function handleCreate(event) {
		update($categories, [...$categories, event.detail]);
		animateScroll.scrollToBottom({ delay: 200 });
	}

	setContext('categories', categories);
	setContext('updateCategories', update);

	onDestroy(() => {
		controller.abort();
	});
</script>

<svelte:head>
	<title>Documentos • Tecmilenio</title>
</svelte:head>

<div class="container">
	<div class="categories">
		<div class="options">
			<CreateCategory on:request={handleCreate} />
			<button on:click={refetch}>
				<Icon src={Reload} />
			</button>
		</div>

		{#if $loading}
			<div in:fade={{ duration: 200 }} out:slide|local={{ duration: 200 }} class="loader">
				<Stairs />
				<h1>Cargando</h1>
				{$progress}
			</div>
		{:else if $error}
			<span>Something went wrong: {$error}</span>
		{:else}
			{#each $categories as category}
				<ButtonCategory {category} path={`/documents/${category._id}`} />
			{/each}
		{/if}
	</div>
	<div class="documents">
		{#key $page.params.category}
			<slot />
		{/key}
	</div>
</div>

<style>
	div.container {
		display: flex;
		gap: 20px;
	}

	div.categories {
		display: flex;
		flex-direction: column;
		width: 25%;
	}

	div.options {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	div.documents {
		display: flex;
		flex-direction: column;
		width: 75%;
		gap: 20px;
	}

	div.loader {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100%;
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
