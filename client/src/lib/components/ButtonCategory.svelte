<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	export let category;
	export let path;
</script>

<template>
	<div>
		<a href={path} class:active={$page.path === path}>
			{category.name}
		</a>
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
