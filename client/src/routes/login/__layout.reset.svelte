<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores';

	$: if ($userStore) {
		setTimeout(() => {
			goto('/');
		}, 1000);
	}
</script>

<template>
	{#if $userStore}
		<div class="container">
			<div class="redirect">
				<span>Redireccionando...</span>
			</div>
		</div>
	{:else}
		<slot />
	{/if}
	<slot />
</template>

<style>
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
