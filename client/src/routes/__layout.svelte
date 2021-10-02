<script>
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores';

	$: if (!$userStore) {
		setTimeout(() => {
			goto('/login');
		}, 1000);
	}
</script>

{#if !$userStore}
	<div class="container">
		<div class="redirect">
			<span>Redireccionando...</span>
		</div>
	</div>
{:else}
	<NavigationBar />
	<div class="content">
		<slot />
	</div>
{/if}

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

	div.container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		width: 100%;
	}

	div.redirect {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: var(--area-color);
		width: 30rem;
		padding: 2.5rem;
		gap: 1.25rem;
	}
</style>
