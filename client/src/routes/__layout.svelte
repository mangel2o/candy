<script lang="ts">
	import NavigationBar from '$lib/components/NavigationBar.svelte';
</script>

<template>
	<NavigationBar />
	<div class="content">
		<slot />
	</div>
</template>

<style lang="scss">
	div {
		&.content {
			margin: 0 auto;
			padding: 2.5rem 0;
			max-width: 77rem;
			min-height: calc(100vh - 4rem);
			display: flex;
			flex-direction: column;
			gap: 20px;
		}
	}
</style>
