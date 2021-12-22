<script>
	import NavigationBar from '$lib/components/NavigationBar.svelte';
</script>

<svelte:head>
	<title>Usuario • Tecmilenio</title>
</svelte:head>

<NavigationBar />
<div class="content">
	<slot />
</div>

<style>
	div.content {
		margin: 0 auto;
		padding: 2.5rem 0;
		max-width: 77rem;
		min-height: calc(100vh - 4rem);
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
</style>
