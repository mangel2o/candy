<script lang="ts">
	import { page } from '$app/stores';

	import ButtonCategory from '$lib/components/ButtonCategory.svelte';
	import CreateCategory from '$lib/modals/category/CreateCategory.svelte';
	import { onMount, setContext } from 'svelte';

	let isPending = true;
	let error;
	let categories = [];

	function fetchData() {
		isPending = true;
		fetch('http://localhost:4000/documents')
			.then((res) => res.json())
			.then((data) => {
				categories = data;
				isPending = false;
			})
			.catch((err) => {
				error = err;
				isPending = false;
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
				<span>Something went wrong: {error}</span>
			{:else}
				{#each categories as category}
					<ButtonCategory {category} path={`/documents/${category.uri}`} />
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
