<script lang="ts">
	import Alert from '$lib/Icons/alert.svelte';
	import FileCheck from '$lib/Icons/file-check.svelte';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
</script>

<template>
	<nav>
		<ButtonLink name={'Recientes'} icon={Alert} path={'/recent'} />
		<ButtonLink name={'Resueltos'} icon={FileCheck} path={'/revised'} />
		<span class="bottom-border" />
	</nav>
</template>

<style lang="scss">
	nav {
		display: flex;
	}
	span {
		border-bottom: 2px solid var(--border-color);
		width: 100%;
	}
</style>
