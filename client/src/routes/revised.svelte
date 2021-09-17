<script lang="ts">
	import TabBar from '$lib/components/TabBar.svelte';

	let documents = [];
</script>

<svelte:head>
	<title>Recientes • Tecmilenio</title>
</svelte:head>

<template>
	<TabBar />
	<h1>Revised</h1>
	{#each documents as document}
		{document}
	{/each}
</template>

<style lang="scss">
</style>
