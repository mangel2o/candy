<script>
	import { page } from '$app/stores';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import FileDocumentMultiple from '$lib/icons/file-document-multiple.svelte';
	import CommentTextMultiple from '$lib/icons/comment-text-multiple.svelte';
	import Archive from '$lib/icons/archive.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import StudentInfo from '$lib/components/StudentInfo.svelte';
	import { onDestroy, setContext } from 'svelte';
	import { userStore } from '$lib/stores';
	import { fade, slide } from 'svelte/transition';
	import { fetcher } from '$lib/fetcher';
	import StudentOptions from '$lib/components/StudentOptions.svelte';
	import StudentAvatar from '$lib/components/StudentAvatar.svelte';
	import StudentCategories from '$lib/components/StudentCategories.svelte';
	import { writable } from 'svelte/store';
	import Reload from '$lib/icons/reload.svelte';
	import Stairs from '$lib/loaders/Stairs.svelte';
	import { goto } from '$app/navigation';
	import UserInfo from '$lib/components/UserInfo.svelte';
	import UserAvatar from '$lib/components/UserAvatar.svelte';
	import AdminLink from '$lib/components/AdminLink.svelte';
	import AccountLink from '$lib/components/AccountLink.svelte';

	const [[user], loading, error, refetch, update, progress, controller] = fetcher(
		[`http://localhost:4000/account/${$page.params.account}`],
		{ alwaysFetch: true }
	);
	onDestroy(() => {
		controller.abort();
	});
</script>

<svelte:head>
	<title>Cuenta • Tecmilenio</title>
</svelte:head>

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
		</div>

		<!--NAVICATION AND CONTENT-->
		<div class="content-container">
			<div class="links">
				<AccountLink path={`/account/${$page.params.account}`}>Algo</AccountLink>
				<AccountLink path={`/account/${$page.params.account}/security`}>Seguridad</AccountLink>
			</div>
			<div class="content">
				<slot />
			</div>
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

	div.content-container {
		display: flex;
		gap: 1rem;
	}

	div.links {
		display: flex;
		flex-direction: column;
		width: 25%;
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
</style>
