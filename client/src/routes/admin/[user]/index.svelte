<script>
	import { page } from '$app/stores';
	import { onDestroy, setContext } from 'svelte';
	import { userStore } from '$lib/stores';
	import { fade, slide } from 'svelte/transition';
	import { fetcher } from '$lib/fetcher';
	import Stairs from '$lib/loaders/Stairs.svelte';
	import AdminOptions from '$lib/components/AdminOptions.svelte';
	import ActionsList from '$lib/components/ActionsList.svelte';
	import UserInfo from '$lib/components/UserInfo.svelte';
	import UserAvatar from '$lib/components/UserAvatar.svelte';

	const [[user, actions], loading, error, refetch, update, progress, controller] = fetcher(
		[
			`http://localhost:4000/admin/${$page.params.user}`,
			`http://localhost:4000/admin/${$page.params.user}/actions`
		],
		{ alwaysFetch: true }
	);

	// * For children components
	setContext('refetchUser', refetch);
	setContext('user', user);

	onDestroy(() => {
		controller.abort();
	});
</script>

<div class="container">
	{#if $loading}
		<div in:fade={{ duration: 200 }} out:slide={{ duration: 200 }} class="loader">
			<Stairs />
			<h1>Cargando</h1>
			{$progress}%
		</div>
	{:else if $error}
		<span>Something went wrong: {$error}</span>
	{:else}
		<div in:fade={{ duration: 200 }} class="user-container">
			<!--AVATAR-->
			<UserAvatar />

			<!--INFO-->
			<UserInfo user={$user} />

			<!--OPTIONS-->
			{#if $userStore.role === 'Administrador'}
				<AdminOptions />
			{/if}
		</div>
		<!--CONTENT-->
		<div class="content">
			<ActionsList actions={$actions} />
		</div>
	{/if}
</div>

<style>
	div.container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	div.user-container {
		display: flex;
		gap: 1rem;
	}

	div.loader {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 2rem;
		margin-bottom: 8rem;
	}

	div.content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}
</style>
