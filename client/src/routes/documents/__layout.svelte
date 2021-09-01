<script lang="ts">
	import ButtonCategory from '$lib/components/ButtonCategory.svelte';
	import CreateCategory from '$lib/modals/category/CreateCategory.svelte';
	import { onMount, setContext } from 'svelte';

	let isPending = true;
	let error = null;
	let categories = [
		{
			name: 'General',
			description: 'Something about general'
		},
		{
			name: 'Extranjero',
			description: 'Something about extranjero'
		},
		{
			name: 'Equivalencia',
			description: 'Something about equivalencia'
		}
	];

	function fetchData() {
		/*
		// TODO: fetch request at /documents
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
		console.log('A fetch has been done at /documents/__layout.svelte');
	}

	setContext('refetch', fetchData);

	onMount(() => {
		fetchData();
	});
</script>

<template>
	<div class="container">
		<div class="categories">
			{#if isPending}
				<span>Loading...</span>
			{:else if error}
				<span>Something went wrong</span>
			{:else}
				{#each categories as category}
					<ButtonCategory {category} path={`/documents/${category.name.toLowerCase()}`} />
				{/each}
			{/if}
			<CreateCategory />
		</div>
		<div class="documents">
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
	div {
		&.container {
			display: flex;
			gap: 20px;
		}

		&.categories {
			display: flex;
			flex-direction: column;
			width: 25%;
		}

		&.documents {
			display: flex;
			flex-direction: column;
			width: 75%;
			gap: 20px;
		}
	}
</style>
