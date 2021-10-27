<script>
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/stores';
	export let path;
	export let name;
	export let icon;
</script>

<a href={path} class:active={$page.path === path}>
	<Icon src={icon} />
	<span> {name}</span>
</a>

<style>
	a {
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem;
		border-bottom: 2px solid var(--border-color);
		background-color: transparent;
	}

	a:hover {
		border-bottom: 2px solid var(--focus-color);
	}

	a:hover > * {
		color: var(--placeholder-color);
		fill: var(--placeholder-color);
	}

	a.active {
		border-bottom: 2px solid var(--orange-color);
	}

	a.active:hover > * {
		color: var(--white-color);
		fill: var(--white-color);
	}
</style>
