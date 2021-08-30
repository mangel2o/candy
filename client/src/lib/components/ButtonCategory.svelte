<script lang="ts">
	import { page } from '$app/stores';
	import DeleteCategory from '$lib/modals/Category/DeleteCategory.svelte';
	import EditCategory from '$lib/modals/Category/EditCategory.svelte';
	export let category;
	export let path;
</script>

<template>
	<div>
		<a href={path} class:active={$page.path === path}>
			{category.name}
		</a>
		<EditCategory {category} />
		<DeleteCategory {category} />
	</div>
</template>

<style lang="scss">
	div {
		display: flex;
		width: 100%;
	}

	a {
		width: 100%;
		padding: 1rem;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		border-right: none;

		&.active {
			border-left: 2px solid var(--orange-color);
		}

		&:hover {
			background-color: var(--area-color);
			border-left: 2px solid var(--focus-color);

			&.active {
				border-left: 2px solid var(--orange-color);
			}
		}
	}
</style>
