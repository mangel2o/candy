<script>
	import { page } from '$app/stores';
	export let category;
	export let path;
</script>

<a href={path} class:active={$page.path === path}>
	{category.name}
</a>

<style>
	a {
		width: 100%;
		padding: 1rem;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}

	a.active {
		border-left: 2px solid var(--orange-color);
	}

	a:hover {
		background-color: var(--area-color);
		border-left: 2px solid var(--focus-color);
	}

	a:hover.active {
		border-left: 2px solid var(--orange-color);
	}
</style>
