<script lang="ts">
	import { page } from '$app/stores';

	import ButtonCategory from '$lib/components/ButtonCategory.svelte';
	import CreateCategory from '$lib/modals/category/CreateCategory.svelte';
	import { onMount, setContext } from 'svelte';

	let isPending = true;
	let error = null;
	let categories = [];

	function fetchData() {
		fetch('http://localhost:4000/documents')
			.then((res) => res.json())
			.then((data) => {
				isPending = false;
				categories = data;
				categories.forEach(
					(category) =>
						(category.name =
							category.name[0].toUpperCase() + category.name.substring(1).replace(/-/g, ' '))
				);
			})
			.catch((err) => {
				isPending = false;
				error = err;
			});
	}

	setContext('refetchCategories', fetchData);

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
					<ButtonCategory
						{category}
						path={`/documents/${category.name.toLowerCase().replace(/\s/g, '-')}`}
					/>
				{/each}
			{/if}
			<CreateCategory />
		</div>
		<div class="documents">
			{#key $page.params.category}
				<slot />
			{/key}
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
