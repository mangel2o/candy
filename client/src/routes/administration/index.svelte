<script>
	import { onDestroy, setContext } from 'svelte';
	import { fetcher } from '$lib/fetcher';
	import Icon from '$lib/components/Icon.svelte';
	import Reload from '$lib/icons/reload.svelte';
	import Stairs from '$lib/loaders/Stairs.svelte';
	import { fade } from 'svelte/transition';
	import { usersStore, updateUsersStore } from '$lib/stores';
	import * as animateScroll from 'svelte-scrollto';
	import UsersTable from '$lib/components/UsersTable.svelte';
	import CreateUser from '$lib/modals/admin/CreateUser.svelte';
	import AdminEditFilter from '$lib/modals/AdminEditFilter.svelte';
	import AdminSearchBar from '$lib/components/AdminSearchBar.svelte';

	const [[users], loading, error, refetch, update, progress, controller] = fetcher(
		[`http://localhost:4000/users`],
		{
			init: () => {
				const data = {
					original: [],
					filterable: [],
					searchable: [],
					sliceable: []
				};
				return [data];
			},
			edit: ([users]) => {
				const usersData = users.data;
				users.data = {
					original: usersData,
					filterable: usersData,
					searchable: usersData,
					sliceable: usersData
				};
				return [users];
			},
			alwaysFetch: true
		}
	);

	function handleCreate(event) {
		update($users, event.detail);
		animateScroll.scrollToBottom({ delay: 200 });
	}
	$usersStore = users;
	$updateUsersStore = update;
	setContext('refetchUsers', refetch);
	setContext('users', users);
	onDestroy(() => {
		controller.abort();
	});
</script>

<div class="container">
	<div class="options">
		<CreateUser on:request={handleCreate} />
		<AdminEditFilter bind:users={$users} />
		<AdminSearchBar bind:users={$users} />
		<button on:click={refetch}>
			<Icon src={Reload} />
		</button>
	</div>

	{#if $loading}
		<div in:fade={{ duration: 400 }} out:fade|local={{ duration: 200 }} class="loader">
			<Stairs />
			<h1>Cargando</h1>
			{$progress}%
		</div>
	{:else if $error}
		<span>Something went wrong {$error}</span>
	{:else}
		<UsersTable bind:users={$users} />
	{/if}
</div>

<style>
	div.container {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	div.options {
		display: flex;
		gap: 1rem;
		width: 100%;
	}

	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 14px;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}
	button:hover {
		border: 2px solid var(--blue-color);
	}

	button:active {
		border: 2px solid var(--green-color);
	}

	div.loader {
		position: absolute;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 6rem;
	}
</style>
