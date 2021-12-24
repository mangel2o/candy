<script>
	import Modal from '$lib/components/Modal.svelte';
	import Pencil from '$lib/icons/pencil.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import UserContent from '$lib/modals/admin/UserContent.svelte';
	import { getContext } from 'svelte';
	import { userStore } from '$lib/stores';
	import { page } from '$app/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { requester } from '$lib/fetcher';

	const refetchUser = getContext('refetchUser');
	const [request, loading, err] = requester();
	let isOpen = false;
	export let user;
	let editableUser = { ...user };

	let disableSubmit;
	$: {
		disableSubmit = Object.keys(user).every(
			(key) => editableUser.hasOwnProperty(key) && editableUser[key] === user[key]
		);
	}

	function handleSubmit() {
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(editableUser).forEach((key) => formData.append(key, editableUser[key]));
		request(
			{
				url: `http://localhost:4000/admin/${$page.params.user}`,
				method: 'put',
				data: formData
			},
			{
				finalize: (fetchedUser) => {
					refetchUser(false);
					editableUser = { ...fetchedUser.data };
					isOpen = false;
				}
			}
		);
	}

	function handleCancel() {
		editableUser = { ...user, newCategories: [] };
		$err = null;
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<button class="edit" slot="trigger" let:open on:click={open}>
		<Icon src={Pencil} />
	</button>

	<!--Header-->
	<span slot="header"> Editar usuario </span>

	<!--Content-->
	<form on:submit|preventDefault={handleSubmit} slot="content">
		<UserContent bind:user={editableUser} />
		{#if $err}
			<ErrorToast bind:error={$err} />
		{/if}
		<div>
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button disabled={disableSubmit} class="submit" type="submit">
				{#if $loading}
					<Loading />
				{:else}
					Editar
				{/if}
			</button>
		</div>
	</form>
</Modal>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	div {
		display: flex;
		gap: 1rem;
	}

	button {
		padding: 1rem;
	}

	button.edit {
		padding: 0.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}
	button.edit:hover {
		background-color: var(--area-color);
	}

	button.edit:focus {
		border: 2px solid var(--green-color);
	}

	button.submit {
		width: 100%;
		background-color: var(--blue-color);
		border: 2px solid var(--blue-color);
		cursor: pointer;
	}
	button.submit:hover {
		background: var(--blue-color);
	}

	button.submit:active {
		background-color: var(--blue-color);
	}

	button.cancel {
		width: 100%;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		cursor: pointer;
	}
	button.cancel:hover {
		background: var(--area-color);
	}

	button.cancel:active {
		background-color: var(--input-color);
	}
</style>
