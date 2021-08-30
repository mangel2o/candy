<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/stores';
	export let path: string;
	export let name: string;
	export let icon;
</script>

<template>
	<a href={path} class:active={$page.path === path}>
		<span><Icon src={icon} /></span>
		<span> {name}</span>
	</a>
</template>

<style lang="scss">
	a {
		cursor: pointer;
		display: flex;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border-bottom: 2px solid var(--border-color);
		background-color: transparent;

		&:hover {
			border-bottom: 2px solid var(--focus-color);

			& > * {
				color: var(--placeholder-color);
				fill: var(--placeholder-color);
			}
		}

		&.active {
			border-bottom: 2px solid var(--orange-color);
			&:hover > * {
				color: var(--white-color);
				fill: var(--white-color);
			}
		}
	}
</style>
